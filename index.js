
const { log } = require('console');
const fs = require('fs');
const inquirer = require('inquirer');

const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Manager = require('./lib/Manager.js');

const generatePage = require('./src/generatePage');
const employeeArr = [];


const questions = [
    {
        type: 'list',
        name: 'role',
        message: 'Please indicate employee role?',
        choices: ['Manager','Engineer', 'Intern']
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the employee?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'Please enter the employee id?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter employee id!');
            return false;
          }

        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Please enter the employee email?',
        validate: nameInput => {
          if (nameInput.includes("@") ){
            return true;
          } else {
            console.log('Please enter a valid employee email!');
            return false;
          }

        }
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: 'Please enter office number?',
        when:(input) => input.role ==='Manager',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log(' Please enter office number!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Please enter gitHub name?',
        when:(input) => input.role ==='Engineer',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter gitHub name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'school',
        message: 'Please enter your school name?',
        when:(input) => input.role ==='Intern',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your school name!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to enter another employee?',
        default: false
      }
];

const promptEmployee = ()=>{
    console.log(`
  =================
  Add a New Employee
  =================
  `);

      return inquirer.prompt(questions)
      .then(employeeData => {
          let {role, name, id, email, github, school, officeNumber} = employeeData;
          let employee;
        if (role === 'Manager'){ 
           employee = new Manager(name, id, email, officeNumber);
        }
        if (role === 'Engineer'){ 
            employee = new Engineer(name, id, email, github)
        }
        if (role === 'Intern'){ 
             employee = new Intern(name, id, email, school)
        }
        employeeArr.push(employee);

        if (employeeData.confirmAddEmployee) {
          return promptEmployee(employeeArr);
        } else {
          return employeeArr;
        }
      })
    };
    
const writeFile = fileContent => {
      fs.writeFile('./dist/index.html', fileContent, err => {
        if (err) {
          console.log(err);
          return;
        }
  
        else{

          console.log( 'File created!');
        }
      });
    };



//const questions = 
promptEmployee().then(employeeArr =>{
    return generatePage(employeeArr);
}).then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
    console.log(err);
  });
