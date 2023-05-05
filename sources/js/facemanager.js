function AddTriangle(co1, co2, co3, color) {
	triangle_list.push([co1, co2, co3, color])			//on ajoute une face à la liste des faces à afficher
}

function DrawAllTriangle() {
	triangle_list.forEach(function(element) {
		face = triangle_list.shift() 					//on prend la premiere face de la list et on la retire
		DrawTriangle(face[0],face[1],face[2],face[3])	//on draw la face retiré
	})
}