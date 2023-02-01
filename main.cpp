#include <GL/freeglut.h>
#include "sources/shape.cpp"

int main(int argc, char** argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE);
    glutInitWindowSize(300, 200);
    glutInitWindowPosition(300, 300);
    glutCreateWindow("REAL INTGINE !!!");
    
    glutDisplayFunc(affiche);

    glutMainLoop();
    return 0;
}