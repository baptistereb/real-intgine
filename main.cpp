#include <GL/freeglut.h>
void affiche()
{
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(1.0, 0.0, 0.0);
    glBegin(GL_POLYGON);
    glVertex3f(0.0, 0.0, 0.0);
    glVertex3f(0.0, 1.0, 0.0);
    glVertex3f(1.0, 1.0, 0.0);
    glVertex3f(0.0, 0.0, 0.0);
    glEnd();
    glFlush();
}
int main(int argc, char** argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE);
    glutInitWindowSize(300, 200);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("REAL INTGINE !!!");
    
    glutDisplayFunc(affiche);

    glutMainLoop();
    return 0;
}