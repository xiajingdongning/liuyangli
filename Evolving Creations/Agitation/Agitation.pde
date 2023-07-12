float angle = 0;
float scaleValue = 0;

void setup() {
  size(1920, 1080, P2D);
  background(0);
  noFill();
  stroke(255);
}

void draw() {
  background(0);
  
  // Shape 1: Facing upwards
  push();
  translate(width / 4, height / 4);
  rotate(angle);
  scale(scaleValue);
  drawShape();
  pop();

  // Shape 2: Upside down
  push();
  translate(width / 2, height * 3 / 4);
  rotate(-angle);
  scale(scaleValue);
  drawShape();
  pop();

  // Shape 3: Twisted
  push();
  translate(width * 3 / 4, height / 2.4);
  rotate(angle);
  scale(scaleValue);
  drawTwistedShape();
  pop();

  // Animation controls
  angle += 0.01;
  scaleValue = sin(angle) * 3.6 + 2.0;
}

void drawShape() {
  rect(-50, -50, 100, 100);
  ellipse(0, 0, 100, 100);
}

void drawTwistedShape() {
  beginShape();
  for (float angle = 0; angle <= TWO_PI; angle += 0.1) {
    float x = cos(angle) * 50;
    float y = sin(angle) * 50;
    vertex(x, y);
  }
  endShape(CLOSE);
}
