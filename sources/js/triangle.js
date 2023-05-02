function DrawTriangle(co1, co2, co3, color) {
	ctx.fillStyle = color;
	ctx.lineWidth = 5;
	point1 = Project(co1[0], co1[1], co1[2])
	point2 = Project(co2[0], co2[1], co2[2])
	point3 = Project(co3[0], co3[1], co3[2])

	if(point1[2] && point2[2] && point3[2]) {
		ctx.beginPath();
		ctx.moveTo(point1[0], point1[1]);
		ctx.lineTo(point2[0], point2[1]);
		ctx.lineTo(point3[0], point3[1]);
		ctx.fill();
		ctx.closePath();
	}
}