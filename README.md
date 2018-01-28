# Colour Based Object Sorting
#### MAKERSPACE PROJECT

**OBJECTIVE :** To design a object sorting system based on the colour of the objects.

**SOLUTION :** 
- Using Color Sensor :
    1. TCS2300 / TCS 3200 color sensor, interfaced with Atmega128 
    Micro-controller, is used to detect the colour of the object and send the           generated output to the micro-controller.
    2. The micro-controller then drives the sorting mechanism based on input from the colour    sensor and the code running in it.
- Using Image Processing :
    1. A webcam is used to get the pic of the object that needs to be sorted.
    2. Image proccessing is done on that pic and the colour is detected . The output of the code is transfered to the micro-controller via HC-05 bluetooth module used as a communication link between the computer and the micro-controller.
    3. According to the recieved input the micro-controller drives the sorting mechanism.
