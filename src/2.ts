/*
  Ваше завдання полягатиме у створенні двох класів – Employee та Manager.

  Клас Employee повинен включати:
  властивість name, яка буде доступна всім.
  властивість department, яка буде доступна лише всередині класу Employee.
  salary, яке буде доступне лише всередині класу Employee та його підкласів.

  Клас Manager повинен бути підклас класу Employee
  Необхідно реалізувати в класі Manager конструктор, який викликатиме конструктор суперкласу та збільшуватиме salary на 10000.

*/

enum baseSalary {
  warehouse = 3_500,
  event = 5_000,
  sales = 6_000,
  creative = 7_000,
  research = 9_000,
}

type Department = 'warehouse' | 'sales' | 'event' | 'creative' | 'research';

class Employee {
  constructor(
    public name: string,
    private department: Department,
    protected salary: number = baseSalary[department]
  ) {}

  getEmployeeDetails() {
    const { name, department, salary } = this;
    console.log(`Name: ${name}, Department: ${department}, Salary: $${salary}`);
  }
}

class Manager extends Employee {
  private static SALARY_BONUS = 10_000;

  constructor(name: string, department: Department, salary?: number) {
    super(name, department, salary);
    this.salary += Manager.SALARY_BONUS;
  }
}

const eventEmployee = new Employee('Jack', 'event');
const salesManager = new Manager('Sophia', 'sales');
const researchManager = new Manager('Kurt', 'research');

eventEmployee.getEmployeeDetails();
salesManager.getEmployeeDetails();
researchManager.getEmployeeDetails();

export {};
