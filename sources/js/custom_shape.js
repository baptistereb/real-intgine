function AddPyramide(som1,som2,som3,som4,color1,color2,color3,color4)
{
	AddTriangle(som1,som2,som4,color2);
	AddTriangle(som1,som4,som3,color3);
	AddTriangle(som4,som2,som3,color4);
	AddTriangle(som1,som2,som3,color1);
}

function AddSquare(co1, co2, co3, co4, color) {
	AddTriangle(co1, co2, co3, color)
	AddTriangle(co1, co3, co4, color)
}