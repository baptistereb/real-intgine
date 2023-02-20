var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");


/*ctx.beginPath();
ctx.moveTo(0, 0, 0);
ctx.lineTo(20, 40, 50);
ctx.fillStyle = "#FF0000";
ctx.stroke();
ctx.closePath();
*/

ctx.strokeStyle = "Red";
ctx.lineWidth = 5;
ctx.beginPath();

SetCamera(1, 5, 10)
SetEcran(5, 5, 5)
SetBase(10, 10, 10)
ctx.moveTo(Project(10, 2, 10)[0], Project(10, 2, 10)[1]);
	
SetCamera(8, 7, 2)
SetEcran(2, 5, 3)
SetBase(100, 100, 10)
ctx.lineTo(Project(2, 5, 1)[0], Project(2, 5, 1)[1]);

ctx.stroke();
ctx.closePath();