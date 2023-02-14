var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


ctx.beginPath();
ctx.moveTo(0, 0, 0);
ctx.lineTo(20, 40, 50);
ctx.fillStyle = "#FF0000";
ctx.stroke();
ctx.closePath();


//alert(3)
//s ? c = camera
function TransformedPoint(sx, sy, sz, cx, cy, cz) {
	dx = cy*(sz*(ay-cy)+cz*(ax-cx))-sy*(az-cz)
	dy = sx*(cy*(az-cz)+sy*(sz*y+cz*(ax-cx)))+cx*(cz*(ay-cy)-sz*(ax-cx))
	dz = cx*(cy*(az-cz)+sy*(sz*y+cz*(ax-cx)))-sx*(cz*(ay-cy)-sz*(ax-cx))

	return [dx, dy, dz]
}

function Project(dx, dy, dz, ex, ey, ez) {
	return [ez*dx/dz+ex, ez*dy/dz+ey]
}


ctx.beginPath();

tp = TransformedPoint(20, 20, 20, 0, 0, 20)
ctx.moveTo(Project(tp[0], tp[1], tp[2], 1, 1, 0));

tp = TransformedPoint(40, 40, 40, 0, 0, 0)
ctx.moveTo(Project(tp[0], tp[1], tp[2] 1, 1, 0));
//ctx.strokeStyle = "Red";
ctx.stroke();