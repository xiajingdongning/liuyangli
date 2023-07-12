float r = 400;
int n = 72 * 6;

void setup() {
   size(1920, 1080, P2D);
}

void draw() {
  background(0); // Set the background color to black
  translate(width / 2, height / 2); // Move the origin to the center of the canvas
  
  stroke(255, 0, 0); // Set the stroke color to red
  strokeWeight(3); // Set the stroke weight to create heavy strokes
  
  float s = 1 + 0.05 * frameCount;

  for (int i = 0; i < n; i++) {
    float theta = 2 * PI * i / n;
    float y = r * sin(theta);
    float x = r * cos(theta);
    float y2 = r * sin(s * theta);
    float x2 = r * cos(s * theta);

    line(x, y, x2, y2);
  }
}
