const Intern = require('../lib/Intern.js');

test('creates an intern object', () => {
    
    const intern = new Intern('Tugrul',34, 'mta@gmail.com', 'UofT');
  
    expect(intern.school).toEqual(expect.any(String));

  });