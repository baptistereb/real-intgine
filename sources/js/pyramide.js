function DrawPyramide(som1,som2,som3,som4,color1,color2,color3,color4)
{
		DrawTriangle(som1,som2,som3,color1);
		DrawTriangle(som1,som2,som4,color2);
		DrawTriangle(som1,som4,som3,color3);
		DrawTriangle(som4,som2,som3,color4);

}