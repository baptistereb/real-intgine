# real-intgine
Moteur graphique en javascript, orienté objet. Initialement un projet de 2e année à l'INSA Toulouse.

Aspect mathématique : cf Projet_scientifique.pdf & https://en.wikipedia.org/wiki/3D_projection

## Ajouter le script
```html
<canvas id="MyCanvas" width="1280" height="720"></canvas>
<script src="sources/real-intgine.js"></script>
<script type="text/javascript">
	let Moteur = new RealIntgine("MyCanvas")
</script>
```

## Modification de la scène
```js
Moteur.fov=1500 //pour modifier la fov
Moteur.bgcolor="blue" //pour changer la couleur d'arrière plan
Moteur.colormap="red" //pour changer la couleur de la map
Moteur.step=2 //pour changer la vitesse de deplacement
Moteur.mouseeventon=true //pour activer la souris
Moteur.SetCameraAngle(1, 0, 3) // changer l'angle de la camera manuellement
Moteur.SetCamera(1, 3, 4) // changer la position de la caméra
```

## Chargement de la map
Une première fonction qui permet a partir d'un bouton ou d'un élément HTML, s'il est cliqué de charger une map, et la position et l'angle de la caméra par défaut !
```js
Moteur.ChargerMap(html_id, camerax, cameray, cameraz, anglex, angley, anglez, fov, path_to_smf)
```
Exemple
```html
<input id="button1" type="submit" value="MAP 1 : forme aléatoire" class="bouton"/>
<script>Moteur.ChargerMap("button1", -31, 25, 34, 1.42, 0, 3.68, 1200, "map/map1.smf")</script>
```

Avec une autre fonction, la possibilité de mettre un champ d'upload de map :
```html
<input type="file" name="inputFile" id="inputFile">
<script>Moteur.ChargerMapWithInput("inputFile")</script>
```

On ne peut charger qu'une seule map, si vous voulez mettres d'autres éléments dans la scène, lisez la section suivante !

## Chargement d'un/plusieurs objets
Pour charger un élément dans la scène rien de plus simple :
```js
Moteur.AjouterObjet("map/map5.smf", 0, 0, 90, "#0000FF") //lien du .smf, x, y, z et couleur
```
On peut charger plusieurs objets !
```js
Moteur.AjouterObjet("map/map5.smf", 0, 0, 90, "#0000FF")
Moteur.AjouterObjet("map/map5.smf", 0, 0, 60, "#4B0082")
Moteur.AjouterObjet("map/map5.smf", 0, 0, 30, "#800080")
Moteur.AjouterObjet("map/map5.smf", 0, 0, 0, "#8A2BE2")
```

## variables disponibles
```js
Moteur.fps // donne les fps
Moteur.camera.x, Moteur.camera.y, Moteur.camera.z // donne la position de la camera
Moteur.camera_angle.x, Moteur.camera_angle.y, Moteur.camera_angle.z // donne les angles de la caméra
Moteur.triangle_list_length // donne le nombres de facettes affichés à l'écran
```

## Inputs
Changement des keycode js au clavier : https://www.toptal.com/developers/keycode
```js
Moteur.keycode=[17,32,90,81,83,68] //descendre, monter, avancer, gauche, reculer, droite
```
Activation de la souris :
```js
Moteur.mouseeventon=true
```
