float x = 0;
float y = 0;
float a = -1.24; 
float b = -1.25;
float c = -1.81;
float d = -1.9;
float sc = 200;

float centerX; // X-coordinate of the center point
float centerY; // Y-coordinate of the center point
float radius;  // Radius of the circular motion
float angle = 0; // Initial angle for circular motion

int startTime; // Start time of cal() function

void setup() {   
  size(1920, 1080, P2D);
  background(0);
  colorMode(HSB);
  
  centerX = width / 2.5;
  centerY = height / 2;
  radius = width / 3;

  startTime = millis(); // Store the start time
}

void draw() {
  translate(centerX, centerY);
  stroke(255, 60);

  // Calculate the position on the circular path
  float posX = centerX + cos(angle) * radius;
  float posY = centerY + sin(angle) * radius;
  
  // Map the position to the x and y values for the shape
  x = map(posX, centerX - radius, centerX + radius, -1, 1);
  y = map(posY, centerY - radius, centerY + radius, -1, 1);
  
  // Run cal() function for 18 seconds
  if (millis() - startTime < 18000) {
    for (int i = 0; i < 5000; i++) {
      call();
    }
  } 
  else {
    for (int i = 0; i < 5000; i++) {
      cal();
    }
  }

  angle += 1; 
}

void cal() {
  float nx = sin(a * y) - cos(b * x);  // De Jong attractors
  float ny = sin(c * x) + cos(d * y);  // Modified to create a flatter shape

  float px = sc * x * x;
  float py = sc * y;

  if (px > -width/2 && px < width/2 && py > -height/2 && py < height/2) {
    // Assign a color based on position
    float hue = map(px, -width/2, width/2, 0, 255);
    float saturation = map(py, -height/2, height/2, 0, 255);
    stroke(hue, saturation, 255, 20);
    point(px, py);
  }

  x = nx;
  y = ny;
}

void call() {
  float nx = sin(a * y) - cos(b * x);  // De Jong attractors
  float ny = sin(c * x) + cos(d * y);  // Modified to create a flatter shape

  float px = sc * y;
  float py = sc * x;

  if (px > -width/2 && px < width/2 && py > -height/2 && py < height/2) {
    // Assign a color based on position
    float hue = map(px, -width/2, width/2, 0, 255);
    float saturation = map(py, -height/2, height/2, 0, 255);
    stroke(hue, saturation, 255, 20);
    point(px, py);
  }

  x = ny;
  y = nx;
}
