
$(document).ready(function () {
    setTemp(32.33);
    setMax(42.33);
    setMin(22.33);
});

var table = $("#table").DataTable({
    ajax: "../data/2500.txt",
    deferRender: true,
    scrollY: 350,
    scrollCollapse: true,
    "searching": false,
    "paging": false,
    order: [[0, "desc"]],
    columnDefs: [{
            targets: 0,
            render: $.fn.dataTable.render.moment('DD/MM/YYYY hh:mm:ss a')
        }]
});

function setTemp(t) {
    $("#temperature").html(t)
    table.row.add([
        new Date(), t
    ]).draw(false);
    console.log(t);
}

function setMax(t) {
    $("#maximum").html(t)
    console.log(t);
}

function setMin(t) {
    $("#minimum").html(t)
    console.log(t);
}

function triggerAlarm() {
    console.log("triggered");
    Swal.fire({
        type: 'error',
        title: '¡Peligro! ¡Sobrecalentamiento!',
        showConfirmButton: false,
        timer: 1500
    });
    $("#led-card").removeClass('card-header-success').addClass('card-header-danger');
    $("#led-text").html('PELIGRO');
    $("#btn-alarm").removeClass('hidden');

}

function dismissAlarm() {
    console.log("dismissed");
    Swal.fire(
            '¡Alarma desactivada!',
            'Se eliminó la advertencia!',
            'success'
            );
    $("#led-card").removeClass('card-header-danger').addClass('card-header-success');
    $("#led-text").html('OK');
    $("#btn-alarm").addClass('hidden');
}

