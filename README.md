# Hive IoT Switch

[Hive Manchester website](http://www.hivelearning.net/)

## Motivation

Hive learning network delivers digital making activities for 13-18 year olds, outside or within formal education. One such activity enourages the young participants to consider the 'Internet of Things' through a simple intruder alarm system.

As part of the intruder alarm IoT activity, participants complete a set-up that uses a motion sensor (usually a passive infrared or ultrasonic) to detect motion and then using the standard [python requests](https://pypi.org/project/requests/) library and web services like [Pushbullet](https://www.pushbullet.com/) they are able to alert a phone or tablet and email address to the motion detected.

At some of the previous digital making sessions, a few advanced participants have requested some way to alert  a second raspbery pi to the detected motion. This is usually because setting up the sensors on their original raspberry pi uses up some of the GPIO pins and so they are unable to attach many of the provided raspberry pi attachments that require all the GPIO pins to fit on like the [blinkt lights](https://shop.pimoroni.com/products/blinkt) or [explorer hat](https://shop.pimoroni.com/products/explorer-hat).

To solve this issue, I considered a few possibilities and decided to go with the option that should be most convienent for the participants. Since, the project already requires them to use the python requests library to make http requests to Pushbullet's api, this iot-switch simply provides a new http endpoint that acts a toggle switch. The other raspberry pi can then poll the switch for a trigger.

## Usuage
The hive-iot-switch app allows users to create and manage a switch intended for use as described above. Once the switch is created, it's ready to use. The manage tab allows uses to manually toggle the switch.
