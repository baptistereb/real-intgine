var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


/*ctx.beginPath();
ctx.moveTo(0, 0, 0);
ctx.lineTo(20, 40, 50);
ctx.fillStyle = "#FF0000";
ctx.stroke();
ctx.closePath();
*/

//alert(3)
//s point a transfo c = camera a = ecran
function TransformedPoint(sx, sy, sz, cx, cy, cz , ax, ay, az) {
	dx = cy*(sz*(ay-cy)+cz*(ax-cx))-sy*(az-cz)
	dy = sx*(cy*(az-cz)+sy*(sz*(ay-cy)+cz*(ax-cx)))+cx*(cz*(ay-cy)-sz*(ax-cx))
	dz = cx*(cy*(az-cz)+sy*(sz*(ay-cy)+cz*(ax-cx)))-sx*(cz*(ay-cy)-sz*(ax-cx))

	return [dx, dy, dz]
}

function Project(dx, dy, dz, ex, ey, ez) {
	return [ez*dx/dz+ex, ez*dy/dz+ey]
}

ctx.strokeStyle = "Red";
ctx.lineWidth = 5;
ctx.beginPath();

tp = TransformedPoint(10, 2, 10, 1, 5, 10, 5, 5, 5)
console.log(Project(tp[0], tp[1], tp[2], 10, 10, 10)[0], Project(tp[0], tp[1], tp[2], 10, 10, 10)[1]);
ctx.moveTo(Project(tp[0], tp[1], tp[2], 10, 10, 10)[0], Project(tp[0], tp[1], tp[2], 10, 10, 10)[1]);
	
tp = TransformedPoint(2, 5, 1, 8, 7, 2,2,5,3);
ctx.lineTo(Project(tp[0], tp[1], tp[2], 100, 100, 10)[0], Project(tp[0], tp[1], tp[2], 100, 100, 10)[1]);
console.log(Project(tp[0], tp[1], tp[2], 100, 100, 10)[0], Project(tp[0], tp[1], tp[2], 100, 100, 10)[1]);
ctx.stroke();
ctx.closePath();