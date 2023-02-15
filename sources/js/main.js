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


ctx.beginPath();
ctx.lineWidth = 5;

tp = TransformedPoint(10, 10, 10, 0, 0, 10, 0, 10, 10)
ctx.moveTo(Project(tp[0], tp[1], tp[2], 1, 1, 10)[0], Project(tp[0], tp[1], tp[2], 1, 1, 10)[1]);
	
tp = TransformedPoint(40, 40, 40, 0, 0, 0)
ctx.lineTo(Project(tp[0], tp[1], tp[2], 1, 1, 0)[0], Project(tp[0], tp[1], tp[2], 1, 1, 0)[1]);
ctx.strokeStyle = "Red";
ctx.stroke();