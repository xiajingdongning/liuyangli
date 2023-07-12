void setup() {
  size(1080, 880);
}

void draw() {
  background(255);
  for (int i = 0; i < width; i++) {
    int v = (width - i + frameCount) ^ (i + frameCount);

    // Map the value of v to the color range
    float hue = map(v, 0, width, 0, 255);
    float saturation = map(i, 0, width, 0, 255);
    float brightness = map(frameCount, 0, 255, 0, 255);

    stroke(hue, saturation, brightness);
    line(i, 0, i, 0.9 * v);
  }
}
