# Intermediate Project #1

Se implementó una solución IoT para la monitorización de temperatura y generación de alertas tempranas
en recitos cerrados utilizando la plataforma Raspberry Pi 3, el sensor digital de temperatura DS18B20, un
actuador LED y una interface web local.

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


## Diagramas
Realizamos los siguientes diagramas para la realización del proyecto:

Diagrama de comunicación entre componentes del sistema IoT:
![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc1.jpg)

Diagrama de circuitos:
![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc23.jpg)

Diagrama de bloques de Node-Red:
![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc3.png)

## Criterios de diseño
Como criterios de diseño, optamos por una infraestructura local, y le dimos independencia al backend (manejo de información) para controlar y guardar la información de registro de forma independiente. Para la comunicación, usamos servicios REST mediante los cuales la aplicación web se conecta a la aplicación de Node-Red y mediante funciones de Javascript, se logra controlar el funcionamiento y entregar información valiosa para la vista. Buscamos un diseño limpio, fácil de entender, claro y modular, y utilizamos variables globales con el fin de utilizarlas entre flows distintos.

## Programación JS
Para lograr el funcionamiento de la aplicación web, escribimos más de 200 lineas de código JS que se puede encontrar en el directorio [del repositorio](https://github.com/juandavidpalomino/IoTProject1/tree/master/public_html), bajo el nombre de index.js. Se comentó y organizó para mejor visualización.

## Resultados
Al final del proyecto logramos alcanza las metas mínimas y aún avanzamos mucho más en tema de Interfaz Amigable, Fijar los límites de temperatura, y más. A través de una plataforma de monitoreo conectada por APIs a una Raspberry Pi, pudimos ofrecer una solución al problema planteado y logramos de paso adquirir conocimiento y experiencia en aplicaciones IoT con Node-Red, Raspberry Pi y Javascript.
![alt text](https://raw.githubusercontent.com/juandavidpalomino/IoTProject1/master/public_html/docs/doc22.png)

## Créditos
Realizado por Andrés Ortegón y Juan Palomino
