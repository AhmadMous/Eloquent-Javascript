// Write a class Vec that represents a vector in two-dimensional space. It takes
// x and y parameters (numbers), which it should save to properties of the
// same name.
// Give the Vec prototype two methods, plus and minus , that take another
// vector as a parameter and return a new vector that has the sum or difference
// of the two vectors’ ( this and the parameter) x and y values.
// Add a getter property length to the prototype that computes the length
// of the vector—that is, the distance of the point (x, y) from the origin (0, 0).

// Vector class definition
class Vec
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  // Creates and returns new vector with sum
  plus(vec2)
  {
    return new Vec(this.x + vec2.x, this.y + vec2.y);
  }

  // Creates and returns new vector with difference
  minus(vec3)
  {
    return new Vec(this.x - vec3.x, this.y - vec3.y)
  }
  
  // Length for vector (x,y) is radical((x * x) + (y * y))
  get length()
  {
    return Math.pow(this.x * this.x + this.y * this.y, 0.5)
  }
}