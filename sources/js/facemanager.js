function AddTriangle(co1, co2, co3, color) {
	triangle_list.push([co1, co2, co3, color, 0])	//on ajoute une face à la liste des faces à afficher
													//le 0 correspond a la distance qui sera ensuite modifié
}

function DrawAllTriangle() {
	triangle_list = faceOrder(triangle_list)
	triangle_list.forEach(function(element) {
		face = triangle_list.shift() 					//on prend la premiere face de la list et on la retire
		DrawTriangle(face[0],face[1],face[2],face[3])	//on draw la face retiré
	})
}