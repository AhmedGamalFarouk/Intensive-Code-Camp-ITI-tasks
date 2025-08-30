abstract class Shape {
  void calculateArea();
}

mixin PerimeterMixin {
  void calculatePerimeter();
}

mixin VolumeMixin {
  void calculateVolume();
}

class Rectangle extends Shape with PerimeterMixin {
  double length;
  double width;

  Rectangle(this.length, this.width);

  @override
  void calculateArea() {
    double area = length * width;
    print('Area of Rectangle: $area');
  }

  @override
  void calculatePerimeter() {
    double perimeter = 2 * (length + width);
    print('Perimeter of Rectangle: $perimeter');
  }
}

class Circle extends Shape with PerimeterMixin {
  double radius;

  Circle(this.radius);
  @override
  void calculateArea() {
    double area = 3.14 * radius * radius;
    print('Area of Circle: $area');
  }

  @override
  void calculatePerimeter() {
    double perimeter = 2 * 3.14 * radius;
    print('Perimeter of Circle: $perimeter');
  }
}

class Triangle extends Shape with PerimeterMixin {
  double base;
  double height;
  double sideA;
  double sideB;

  Triangle(this.base, this.height, this.sideA, this.sideB);

  @override
  void calculateArea() => print('Area of Triangle : ${0.5 * base * height}');

  @override
  void calculatePerimeter() =>
      print('Perimeter of Triangle: ${base + sideA + sideB}');
}

class Cube extends Shape with VolumeMixin, PerimeterMixin {
  double side;

  Cube(this.side);

  @override
  void calculateArea() => print('Area of Cube: ${6 * side * side}');

  @override
  void calculateVolume() => print('Volume of Cube: ${side * side * side}');

  @override
  void calculatePerimeter() {
    double perimeter = 12 * side;
    print('Perimeter of Cube: $perimeter');
  }
}

class Sphere extends Shape with VolumeMixin, PerimeterMixin {
  double radius;

  Sphere(this.radius);

  @override
  void calculateArea() =>
      print('Area of Sphere: ${4 * 3.14 * radius * radius}');

  @override
  void calculateVolume() =>
      print('Volume of Sphere: ${(4 / 3) * 3.14 * radius * radius * radius}');

  @override
  void calculatePerimeter() {
    double perimeter = 4 * 3.14 * radius;
    print('Perimeter of Sphere: $perimeter');
  }
}

void main() {
  Rectangle rectangle = Rectangle(5, 3);
  rectangle.calculateArea();
  rectangle.calculatePerimeter();

  Circle circle = Circle(4);
  circle.calculateArea();
  circle.calculatePerimeter();

  Triangle triangle = Triangle(6, 8, 4, 5);
  triangle.calculateArea();
  triangle.calculatePerimeter();

  Cube cube = Cube(3);
  cube.calculateArea();
  cube.calculateVolume();
  cube.calculatePerimeter();

  Sphere sphere = Sphere(5);
  sphere.calculateArea();
  sphere.calculateVolume();
  sphere.calculatePerimeter();
}
