const Manager = require('../lib/Manager.js');

test('creates an manager object', () => {
    
    const manager = new Manager('Tugrul',34, 'mta@gmail.com', 2323);
  
    expect(manager.officeNumber).toEqual(expect.any(Number));

  });