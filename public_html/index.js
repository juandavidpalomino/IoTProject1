var address = "http://192.168.0.12:1880/";
var tab = "";

// al estar lista la página
$(document).ready(function () {
    setTemp(32.33);
    setMax(42.33);
    setMin(22.33);


    tab = $("#table").DataTable({
        deferRender: true,
        scrollY: 350,
        scrollCollapse: true,
        searching: false,
        paging: false,
        order: [[0, "desc"]]
    });

    updateAjax();


});

// funcion para iniciar el monitoreo
function start() {
    $.ajax({
        url: address + 'start'
    });
}

// funcion para eliminar los registros 
function reset() {
    $.ajax({
        url: address + 'reset'
    });
}

//función para parar de monitorear
function stop() {
    $.ajax({
        url: address + 'stop'
    });
}


var minuteChart = "";
var maxtemp = 0;
var mintemp = 1000;

// realizar llamadas ajax y actualizar tabla y grafica deacuerdo con los nuevos datos
function updateAjax() {

    $.ajax({
        url: address + 'getAll',
        success: function (respuesta) {
            var obj = JSON.parse(respuesta);
            obj.splice(0, obj.length - 20);
            
            // Refresh Table
            tab.clear();
            for (var r in obj) {
                tab.row.add([
                    moment(obj[r]['when']).format('DD/MM/YYYY hh:mm:ss a'), obj[r]['temp']
                ]).draw(false);

                var thistemp = obj[r]['temp'];

                if (thistemp < maxtemp)
                    setMax(thistemp)

                if (thistemp > mintemp)
                    setMin(thistemp)

            }

            // Iniciar Grafica
            var labels = [];
            var series = [[]];
            for (var r in obj) {
                labels.push(moment(obj[r]['when']).format('mm:ss'));
                series[0].push(parseFloat(obj[r]['temp']));
            }
            dataMinute = {
                labels: labels,
                series: series
            };
            optionsMinute = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                axisY: {
                    type: Chartist.AutoScaleAxis,
                    scaleMinSpace: 20,
                },
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            }
            minuteChart = new Chartist.Line('#minute', dataMinute, optionsMinute);

            //Update Temperature
            var thistemp = obj[obj.length - 1].temp
            setTemp(thistemp);

            // Llamado recursivo
            setTimeout(updateAjax(), 500)
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });

    $.ajax({
        url: address + 'getAlarm',
        success: function (respuesta) {
            if (respuesta == 1) {
                triggerAlarm();
            } else if (alarmOn){
                dismissAlarm();
            }
        },

        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
    
    $.ajax({
        url: address + 'getLimit',
        success: function (respuesta) {
            $('.warning-number').html(respuesta);
        },

        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
}

// mostrar dialogo de modificar limite
function limitDialog() {
    $('#exampleModal').modal('show');
}

// fijar el limite nuevo
function setLimit() {
    
    var value = $('#limitinput').val();
    console.log(value);
    
    $.ajax({
        url: address + 'setLimit',
        data: 'value='+value,
        success: function (respuesta) {
            if (respuesta == 1) {
                $('#exampleModal').modal('hide');
                $('#limitinput').val('');
            }
        },

        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
}

// set de temperatura
function setTemp(t) {
    $("#temperature").html(t)
    console.log(t);
}

// set de temperatura maxima
function setMax(t) {
    $("#maximum").html(t)
    console.log(t);
}

// set de temperatura minima
function setMin(t) {
    $("#minimum").html(t)
    console.log(t);
}

var alarmOn = false;

// desencadenar una alerta de temperatura
function triggerAlarm() {
    console.log("triggered");
    if (!alarmOn) {
        Swal.fire({
            type: 'error',
            title: '¡Peligro! ¡Sobrecalentamiento!',
            showConfirmButton: false,
            timer: 1500
        });
        $("#led-card").removeClass('card-header-success').addClass('card-header-danger');
        $("#led-text").html('PELIGRO');
        $("#btn-alarm").removeClass('hidden');
        alarmOn = true;
    }


}

// descartar la alarma
function dismissAlarm() {
    
    alarmOn = false;
    console.log("dismissed");

    $.ajax({
        url: address + 'resetalarm'
    });

    Swal.fire(
            '¡Alarma desactivada!',
            'Se eliminó la advertencia!',
            'success'
            );
    $("#led-card").removeClass('card-header-danger').addClass('card-header-success');
    $("#led-text").html('OK');
    $("#btn-alarm").addClass('hidden');
    
    
}

