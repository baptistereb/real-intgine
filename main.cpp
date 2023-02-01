#include <GL/freeglut.h>
#include "sources/header.hpp"
#include "sources/sleep.hpp"
#include "sources/shape.hpp"

int main(int argc, char** argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE);
    glutInitWindowSize(300, 200);
    glutInitWindowPosition(300, 300);
    glutCreateWindow("REAL INTGINE !!!");
    
    blue = 1.0;
    glutDisplayFunc(affiche);

    glutMainLoop();
    return 0;
}