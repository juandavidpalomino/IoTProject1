# Intermediate Project #1

Se implementó una solución IoT para la monitorización de temperatura y generación de alertas tempranas en recitos cerrados utilizando la plataforma Raspberry Pi 3, el sensor digital de temperatura DS18B20, un actuador LED y una interface web local.

## Características
![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc1.png)
Este proyecto permite las siguientes capacidades:
* Monitorear la temperatura actual del sensor
* Llevar registro histórico de las temperaturas
* Alertar al sobrepasar una temperatura límite
* Encender y suspender el monitoreo
* Reiniciar el registro de datos
* Modificar el límite de temperatura para la alarma
* Descartar la alerta por temperatura
* Ver una gráfica de la temperatura en las últimas 20 mediciones

Para su programación, se utilizó Node-Red, se creó un proceso recurrente al iniciar el sistema y se configuró el servidor para almacenar los archivos de la página web, y la administración en la dirección /admin. 

```bash
node-red-start
```
Para lograr alojar y servir los archivos de la página web, se ubicaron en una carpeta llamada nodestatic en la raiz, y se incluyó esta línea en el archivo settings.js :

```bash
    // When httpAdminRoot is used to move the UI to a different root path, the
    // following property can be used to identify a directory of static content
    // that should be served at http://localhost:1880/.
    httpStatic: 'nodestatic/',
```

Esta carpeta y todo su contenido se hacen disponibles en la raíz del servidor de NodeRed. 

El template se descargó gratuitamente desde [el sitio web de Creative Tim](https://www.creative-tim.com/product/material-dashboard) , desde donde se optimizó y modifico hasta la forma que se ve en el presente repositorio.

## Diagramas
Realizamos los siguientes diagramas para la realización del proyecto:

### Diagrama de comunicación entre componentes del sistema IoT:

La sección web se comunica constantemente con la REST API de Node Red a través de solicitudes GET de HTTP para consultar datos como los últimos registros, la temperatura actual, la situación de la alarma actual, el límite actual y más. También es capaz de enviar parámetros como apagar la alarma o cambiar el límite de advertencia desde la interfaz web a través igualmente de solicitudes web.

![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc1.jpg)

### Diagrama de circuitos:

Aquí mostramos la distribución física de las conexiones entre la Raspberry Pi y el protoboard de prototipo.

![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc23.jpg)

### Diagrama de bloques de Node-Red:

Se utilizó un flujo sencillo que se repite cada periodo determinado de tiempo, tal como se ve en el siguiente diagrama de flujo.

![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc3.png)

### Diagrama de flujo:

Aquí mostramos el flujo que se utiliza para controlar el funcionamiento correcto del sistema, la detección de temperatura peligrosa y el control de la alarma:

![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc5.png)

## Entendiendo el funcionamiento del sensor de temperatura 
<img width="200" ALIGN=”right” alt="portfolio_view" src="https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc4.png">

El DS18B20 es un sensor digital de temperatura que utiliza el protocolo 1-Wire para comunicarse, este protocolo necesita solo un pin de datos para comunicarse y permite conectar más de un sensor en el mismo bus.
El sensor DS18B20 es fabricado por Maxim Integrated, el encapsulado de fabrica es tipo TO-92 similar al empleado en transistores pequeños.
Con este sensor podemos medir temperatura desde los -55°C hasta los 125°C y con una resolución programable desde 9 bits hasta 12 bits.
Cada sensor tiene una dirección única de 64bits establecida de fábrica, esta dirección sirve para identificar al dispositivo con el que se está comunicando, puesto que en un bus 1-wire pueden existir más de un dispositivo.


## Criterios de diseño
Como criterios de diseño, optamos por una infraestructura local, y le dimos independencia al backend (manejo de información) para controlar y guardar la información de registro de forma independiente. Para la comunicación, usamos servicios REST mediante los cuales la aplicación web se conecta a la aplicación de Node-Red y mediante funciones de Javascript, se logra controlar el funcionamiento y entregar información valiosa para la vista. Buscamos un diseño limpio, fácil de entender, claro y modular, y utilizamos variables globales con el fin de utilizarlas entre flows distintos.

## Programación JS
Para lograr el funcionamiento de la aplicación web, escribimos más de 200 lineas de código JS que se puede encontrar en el directorio [del repositorio](https://github.com/juandavidpalomino/IoTProject1/tree/master/public_html), bajo el nombre de index.js. Las lineas de código y funciones se organizaron y comentaron para mejor visualización y comprensión del código. La comunicación se realiza técnicamente a través de llamadas AJAX y la modificación del DOM a través de JavaScript y jQuery, tal como se puede ver en el código.

## Resultados
Al final del proyecto logramos alcanza las metas mínimas y aún avanzamos mucho más en tema de Interfaz Amigable, Fijar los límites de temperatura, y más. A través de una plataforma de monitoreo conectada por APIs a una Raspberry Pi, pudimos ofrecer una solución al problema planteado y logramos de paso adquirir conocimiento y experiencia en aplicaciones IoT con Node-Red, Raspberry Pi y Javascript.

![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc22.png)
Resultado de mostar alarma en la interfaz gráfica, con botón para apagar la misma.

![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc6.png)
Cuadro de diálogo para cambiar el límite por defecto de la alarma.

## Créditos
Realizado por Andrés Ortegón y Juan Palomino
