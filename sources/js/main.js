var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

SetCamera(-27, -18, -72)
SetCameraAngle(1.16, 0, 2.61)
fov = 1200

setInterval(mainloop); //setInterval(mainloop, 1000/60);

i=0
function mainloop() {
    NewDisplay()
    ReloadInformation()
    
    if(typeof usermap != "undefined") {
        for(let i = 0; i < usermap[1].length; i++) {
            offsetX = 0
            offsetY = 0
            offsetZ = 0
            AddTriangle([offsetX+usermap[0][usermap[1][i][1]-1][1], offsetY+usermap[0][usermap[1][i][1]-1][2], offsetZ+usermap[0][usermap[1][i][1]-1][3]],
                        [offsetX+usermap[0][usermap[1][i][2]-1][1], offsetY+usermap[0][usermap[1][i][2]-1][2], offsetZ+usermap[0][usermap[1][i][2]-1][3]],
                        [offsetX+usermap[0][usermap[1][i][3]-1][1], offsetY+usermap[0][usermap[1][i][3]-1][2], offsetZ+usermap[0][usermap[1][i][3]-1][3]], colorinput)
        }
    }
    if(chargedmap.length > 0) {
        for(let i = 0; i < chargedmap[1].length; i++) {
            offsetX = 0
            offsetY = 0
            offsetZ = 0
            AddTriangle([offsetX+chargedmap[0][chargedmap[1][i][1]-1][1], offsetY+chargedmap[0][chargedmap[1][i][1]-1][2], offsetZ+chargedmap[0][chargedmap[1][i][1]-1][3]],
                        [offsetX+chargedmap[0][chargedmap[1][i][2]-1][1], offsetY+chargedmap[0][chargedmap[1][i][2]-1][2], offsetZ+chargedmap[0][chargedmap[1][i][2]-1][3]],
                        [offsetX+chargedmap[0][chargedmap[1][i][3]-1][1], offsetY+chargedmap[0][chargedmap[1][i][3]-1][2], offsetZ+chargedmap[0][chargedmap[1][i][3]-1][3]], colormap)
        }
    }

    document.getElementById("nb_face").textContent = triangle_list.length;


    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    DrawAllTriangle() // on Draw toutes les faces qu'on a ajouté à la liste

    if (camera_angle.x > 3.14) {
        camera_angle.x = 3.14
    }
    if (camera_angle.x<0) {
        camera_angle.x=0
    }

    i++
    if(i==nb_iter) {
        timer = Math.round(nb_iter*1000/(new Date().getTime() - date))
        date = new Date().getTime()
        i=0
    }
}