function strToMatrix(str) {
    matrix = str.split("\n").map(line => line.split(" "));
    for(let i=0; i<matrix.length; i++) {
        if(matrix[i][0] != "f") {
            matrix.splice(i,1)
        }
    }
    return matrix
}

document.getElementById('inputFile').addEventListener('change', function() {
var file = new FileReader();
file.onload = () => {
  //document.getElementById('output').textContent = file.result;
  console.log(file.result)
  console.log(strToMatrix(file.result))
}
file.readAsText(this.files[0])
});
