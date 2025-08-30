class Teacher {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
    }

    getDetails() {
        return `Teacher: ${this.name}, Subject: ${this.subject}`;
    }
}

class TeacherDecorator {
    constructor(teacher) {
        this.teacher = teacher;
    }

    getDetails() {
        return this.teacher.getDetails();
    }
}

class SalaryDecorator extends TeacherDecorator {
    constructor(teacher, salary) {
        super(teacher);
        this.salary = salary;
    }

    getDetails() {
        return `${this.teacher.getDetails()}, Salary: $${this.salary}`;
    }
}

class NationalityDecorator extends TeacherDecorator {
    constructor(teacher, nationality) {
        super(teacher);
        this.nationality = nationality;
    }

    getDetails() {
        return `${this.teacher.getDetails()}, Nationality: ${this.nationality}`;
    }
}

class StreetDecorator extends TeacherDecorator {
    constructor(teacher, street) {
        super(teacher);
        this.street = street;
    }

    getDetails() {
        return `${this.teacher.getDetails()}, Street: ${this.street}`;
    }
}


const basicTeacher = new Teacher("Reda El-Farouk", "Arabic");
console.log(basicTeacher.getDetails());

const teacherWithSalary = new SalaryDecorator(basicTeacher, 60000);
console.log(teacherWithSalary.getDetails());

const teacherWithNationality = new NationalityDecorator(teacherWithSalary, "Egyptian");
console.log(teacherWithNationality.getDetails());

const fullFeaturedTeacher = new StreetDecorator(teacherWithNationality, "123 Main St");
console.log(fullFeaturedTeacher.getDetails());

