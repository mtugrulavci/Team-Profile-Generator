
const { log } = require('console');
const fs = require('fs');
const inquirer = require('inquirer');

const Engineer = require('./lib/Engineer.js'); // importing Engineer, Intern and Manager classes
const Intern = require('./lib/Intern.js');
const Manager = require('./lib/Manager.js');

const generatePage = require('./src/generatePage');
const employeeArr = []; // creating an array to house employees

// questions to be asked to the user
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
        validate: idInput => {
          if (idInput) {
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
        validate: emailInput => {
          if (emailInput.includes("@") ){
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
        when:(officeNumberInput) => officeNumberInput.role ==='Manager', // this question pops up if the employee role is Manager
        validate: officeNumberInput => {
          if (officeNumberInput) {
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
        when:(githubInput) => githubInput.role ==='Engineer', // this question pops up if the employee role is Engineer
        validate: githubInput => {
          if (githubInput) {
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
        when:(schoolInput) => schoolInput.role ==='Intern', // this question pops up if the employee role is Intern
        validate: schoolInput => {
          if (schoolInput) {
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

//function that brings questions
const promptEmployee = ()=>{
    console.log(`
  =================
  Add a New Employee
  =================
  `);

      return inquirer.prompt(questions)
      // answers will be stored in employeeData variable 
      .then(employeeData => {
          let {role, name, id, email, github, school, officeNumber} = employeeData; // employee data object will be converted individual variables like role , id etc
          let employee; // a new variable initiated which will be created based on the role in the follwing section
        if (role === 'Manager'){ 
           employee = new Manager(name, id, email, officeNumber);// manager object created
        }
        if (role === 'Engineer'){ 
            employee = new Engineer(name, id, email, github) // engineer object created
        }
        if (role === 'Intern'){ 
             employee = new Intern(name, id, email, school) // intern object is created
        }
        employeeArr.push(employee); // created object based on their role is being stored in the EmployeeArr

        //if the last question want to add employee then it brings the question again by trigering the promptEmployee function
        if (employeeData.confirmAddEmployee) {
          return promptEmployee(employeeArr);
        } else {
          return employeeArr; // if user does not want to add employee then it returns the array
        }
      })
    };
    
    // it writes the html page
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



//prompts question then generates an htm page based on the stored employee data in the array, then creates a html file
promptEmployee().then(employeeArr =>{
    return generatePage(employeeArr);
}).then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
    console.log(err);
  });
