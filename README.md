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