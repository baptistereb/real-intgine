function strToMatrix(str) {
    str = str.replace(/[^0-9.\s\r\nvf]/g, "");
    matrix = str.split("\n").map(line => line.split(" "))
    v = []
    f = []
    for(let i=5; i<matrix.length; i++) {        //les 6 première lignes c'est des métadonné on s'en fiche
        if(matrix[i][0] == 'f' || matrix[i][0] == 'v') {
            matrix[i][3] = matrix[i][3]//.slice(0, -1) //.slice(0, -1) à décommenter sous windows
            if(matrix[i][0] == 'v') {
                v.push(matrix[i])
            } else {
                f.push(matrix[i])
            }
        }
    }

    var v = v.map(function(row) {
      return row.map(function(value) {
        return parseFloat(value, 10);
      });
    });
    var f = f.map(function(row) {
      return row.map(function(value) {
        return parseInt(value, 10);
      });
    });
    v.forEach(function(face){ //symétrie car sinon la projection inverse certaines mesures
      face[1] = (-1)*face[1]
      face[3] = (-1)*face[3]
    });

    return [v, f]
}

document.getElementById('inputFile').addEventListener('change', function() {
var file = new FileReader();
file.onload = () => {
  //console.log(file.result)
    usermap = strToMatrix(file.result)
  console.log(usermap)
}
file.readAsText(this.files[0])
});