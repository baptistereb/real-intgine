function strToMatrix(str) {
    n=1
    matrix = str.split("\n").map(line => line.split(" "))
    v = []
    f = []
    for(let i=0; i<matrix.length; i++) {
        if(matrix[i][0] == 'f' || matrix[i][0] == 'v') {
            matrix[i][3] = matrix[i][3]//.slice(0, -1) // à décommenter sous windows
            if(matrix[i][0] == 'v') {
                v.push(matrix[i])
            } else {
                f.push(matrix[i])
            }
        }
    }
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