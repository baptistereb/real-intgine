//produit scalaire 
function dotProduct(u, v) {
  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
}


//Norme
function vectorLength(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}


// produit scalaire
function crossProduct(u, v) {
  const x = u[1] * v[2] - u[2] * v[1];
  const y = u[2] * v[0] - u[0] * v[2];
  const z = u[0] * v[1] - u[1] * v[0];
  return [x, y, z];
}


// retourne le vecteur normal au triangle
function computeTriangleNormal(triangle) {
  const u = [
    triangle[3] - triangle[0],
    triangle[4] - triangle[1],
    triangle[5] - triangle[2],
  ];

  const v = [
    triangle[6] - triangle[0],
    triangle[7] - triangle[1],
    triangle[8] - triangle[2],
  ];

  const normal = crossProduct(u, v);

  return normal;
}
