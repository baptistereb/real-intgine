# real-intgine
to int games à l'infini !

# dev on linux
### installer les packages :
```bash
sudo apt-get update
sudo apt-get install libglu1-mesa-dev
sudo apt-get install freeglut3-dev
sudo apt-get install mesa-common-dev
sudo apt-get install libglew-dev
sudo apt-get install build-essential gcc
```
### compiler :
```bash
g++ main.cpp -o build/exec -lglut -lGLU -lGL
```

### Eventuellement faire un build system si vous êtes sous sublime-text pour compiler et exécuter directement avec CTRL+B
```json
{
	"shell_cmd": "g++ ./real-intgine/main.cpp -o ./real-intgine/build/exec -lglut -lGLU -lGL; ./real-intgine/build/exec"
}
```

 # dev on windows
 ###