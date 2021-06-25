const Engineer = require('../lib/Engineer.js');

test('creates an engineer object', () => {
    
    const engineer = new Engineer('Tugrul',34, 'mta@gmail.com', 'mtugrulavci');
  
    expect(engineer.github).toEqual(expect.any(String));

  });