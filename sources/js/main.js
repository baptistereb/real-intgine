var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(1, 5, 10)
SetCameraAngle(5, 5, 5)
SetDisplay(10, 10, 10)

DrawTriangle([10, 2, 10], [2, 5, 1], [50, 0, 0], "red")