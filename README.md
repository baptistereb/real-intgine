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
```
### compiler :
```bash
g++ main.cpp -o exec -lglut -lGLU -lGL
```

### Eventuellement faire un build system si vous êtes sous sublime-text pour compiler et exécuter directement avec CTRL+B
```json
{
	"shell_cmd": "g++ /home/rubiks/Documents/dev/real-intgine/main.cpp -o /home/rubiks/Documents/dev/real-intgine/build/exec -lglut -lGLU -lGL; /home/rubiks/Documents/dev/real-intgine/build/exec"
}
```