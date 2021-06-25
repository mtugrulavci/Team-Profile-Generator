const Employee = require('../lib/Employee.js');

test('creates an employee object', () => {
    
    const employee = new Employee('Tugrul',34, 'mta@gmail.com');
  
    expect(employee.name).toEqual(expect.any(String));
    expect(employee.email).toContain('@'); 
    expect(employee.id).toEqual(expect.any(Number));
  });
  