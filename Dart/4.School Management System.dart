interface class Person {
  void displayDetails() {}
  String? getRole() {
    return 'my role';
  }
}

class Student implements Person {
  String name;
  int ID;
  String grade;

  Student(this.name, this.ID, this.grade);

  @override
  void displayDetails() {
    print('Name: $name, Age: $ID, Grade: $grade');
  }

  @override
  String getRole() {
    return 'Student';
  }
}

class Teacher implements Person {
  String name;
  int ID;
  String subject;

  Teacher(this.name, this.ID, this.subject);

  @override
  void displayDetails() {
    print('Name: $name, Age: $ID, Subject: $subject');
  }

  @override
  String getRole() {
    return 'Teacher';
  }
}

class Staff implements Person {
  String name;
  int ID;
  String department;

  Staff(this.name, this.ID, this.department);

  @override
  void displayDetails() {
    print('Name: $name, Age: $ID, Department: $department');
  }

  @override
  String getRole() {
    return 'Staff';
  }
}

void main() {
  List<Person> people = [];
  people.add(Student('Alice', 101, '10th Grade'));
  people.add(Teacher('Mr. Smith', 202, 'Math'));
  people.add(Staff('Bob', 303, 'Administration'));
  people.add(Student('Charlie', 102, '9th Grade'));
  people.add(Teacher('Ms. Jones', 203, 'English'));

  print('--- School Directory ---');
  for (var person in people) {
    person.displayDetails();
  }
}
