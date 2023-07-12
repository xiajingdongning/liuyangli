int n = 720;
float[] x = new float[n];
float[] y = new float[n];
float[] dx = new float[n];
float[] dy = new float[n];
int w = 1920;
int h = 1080;

void setup() {
   size(1920, 1080, P2D);
  float speed = 6;
  for (int i = 0; i < n; i++) {
    x[i] = w / 2;
    y[i] = h / 2;
    float angle = i * 2 * PI / n;
    dx[i] = speed * cos(angle);
    dy[i] = speed * sin(angle);
  }
}

void draw() {
  background(0, 60); // Set the background color to black with some transparency
  for (int i = 0; i < n; i++) {
    strokeWeight(3); // Set the stroke weight to create a thicker stroke
    stroke(random(255), random(255), random(255)); // Assign a random color to the stroke
    fill(random(255), random(255), random(255)); // Assign a random color to the fill
    ellipse(x[i], y[i], 6, 6);
    x[i] += dx[i];
    y[i] += dy[i];
    if (x[i] > w || x[i] < 0)
      dx[i] *= -1;
    if (y[i] > h || y[i] < 0)
      dy[i] *= -1;
  }
}
