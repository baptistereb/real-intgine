function AddTriangle(co1, co2, co3, color) {
	triangle_list.push([co1, co2, co3, color, 0])	//on ajoute une face à la liste des faces à afficher
}													//le 0 correspond a la distance qui sera ensuite modifié

function DrawAllTriangle() {
	triangle_list = faceOrder(triangle_list)
	while((face = triangle_list.shift()) !== undefined) {
		DrawTriangle(face[0],face[1],face[2],face[3])	//on draw la face retiré
	}
}