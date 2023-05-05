function DrawPyramide(som1,som2,som3,som4,color1,color2,color3,color4)
{
	AddTriangle(som1,som2,som4,color2);
	AddTriangle(som1,som4,som3,color3);
	AddTriangle(som4,som2,som3,color4);
	AddTriangle(som1,som2,som3,color1);
}

function DrawSquare(co1, co2, co3, co4, color) {
	AddTriangle(co1, co2, co3, color)
	AddTriangle(co1, co3, co4, color)
	

	/*
	ctx.fillStyle = color;
	ctx.lineWidth = 5;
	
	point1 = Project(co1[0], co1[1], co1[2])
	point2 = Project(co2[0], co2[1], co2[2])
	point3 = Project(co3[0], co3[1], co3[2])
	point4 = Project(co4[0], co4[1], co4[2])

	if(point1[2] && point2[2] && point3[2] && point4[2]) {
		ctx.beginPath();
		ctx.moveTo(point1[0], point1[1]);
		ctx.lineTo(point2[0], point2[1]);
		ctx.lineTo(point3[0], point3[1]);
		ctx.lineTo(point4[0], point4[1]);
		ctx.fill();
		ctx.closePath();
	}*/
}