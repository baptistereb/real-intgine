//multiplication de 2 matrices
function multMatrix(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

//produit scalaire 
function dotProduct(u, v) {
  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
}


//Norme
function vectorLength(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}


// produit vectoriel
function crossProduct(u, v) {
  const x = u[1] * v[2] - u[2] * v[1];
  const y = u[2] * v[0] - u[0] * v[2];
  const z = u[0] * v[1] - u[1] * v[0];
  return [x, y, z];
}


// retourne le vecteur normal au triangle
function TriangleToNormal(som1,som2,som3) {
  const u = [
    som2[0] - som1[0],
    som2[1] - som1[1],
    som2[2] - som1[2],
  ];

  const v = [
    som3[6] - som1[0],
    som3[7] - som1[1],
    som3[8] - som1[2],
  ];

  const normal = crossProduct(u, v);

  return normal;
}

//normalise un vecteur
function Normalise(u){
  return [u[0]/vectorLength(u), u[1]/vectorLength(u), u[2]/vectorLength(u)]
}