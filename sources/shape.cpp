void affiche()
{
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(1.0, 0.0, 0.0);
    glBegin(GL_POLYGON);
    glVertex2f(-1.0, -1.0);
    glVertex2f(1.0, -1.0);
    glVertex2f(0.0, 1.0);
    glVertex2f(-1.0, -1.0);
    glEnd();
    glFlush();
}