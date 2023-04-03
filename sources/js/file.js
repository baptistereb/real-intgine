function strToMatrix(str) {
    matrix = str.split("\n").map(line => line.split(" "))
    returnm = []
    for(let i=0; i<matrix.length; i++) {
        if(matrix[i][0] == 'f') {
            matrix[i][3] = matrix[i][3].slice(0, -1)
            returnm.push(matrix[i])
        }
    }
    return returnm
}

document.getElementById('inputFile').addEventListener('change', function() {
var file = new FileReader();
file.onload = () => {
  //console.log(file.result)
  console.log(strToMatrix(file.result))
}
file.readAsText(this.files[0])
});