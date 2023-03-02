function drawPyramide(som1,som2,som3,som4,color1,color2,color3,color4)
{
	if (computeVisibleFaces(som1,som2,som3,camera,camera.angle, display)==1){
		DrawTriangle(som1,som2,som3,color1)
	}

	if (computeVisibleFaces(som1,som2,som4,camera,camera.angle, display)==1){
		DrawTriangle(som1,som2,som4,color2)
	}

	if (computeVisibleFaces(som1,som4,som3,camera,camera.angle, display)==1){
		DrawTriangle(som1,som4,som3,color3)
	}

	if (computeVisibleFaces(som4,som2,som3,camera,camera.angle, display)==1){
		DrawTriangle(som4,som2,som3,color4)
	}
}