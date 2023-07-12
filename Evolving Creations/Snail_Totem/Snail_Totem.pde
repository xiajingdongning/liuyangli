void setup(){
  size(1920,1080,P2D);
  background(0);
  colorMode(HSB);
}

void draw() {
  float x = frameCount;
  float r = map(x, 0, width, 1.8, 2.4);
  float y = 0.1;

  translate(width/2, height/2);  // Center the drawing
  rotate(x * 0.005);              // Rotate the drawing

  for (int i = 0; i < 400; i++) {
    stroke(200 - i, 255, 255);
    y = r * y * (1 - y);

    float px = map(x, 0, width, 0, 200);             // Map x position within a smaller range
    float py = map(y, 0, 1, 0, height/4);             // Map y position within a smaller range
    point(px, py);
    x += 0.01;                                        // Increment x to move forward
  }
}
