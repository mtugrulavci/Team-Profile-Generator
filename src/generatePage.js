
const managerHTML = manager => {
    return`
    <div class="dist card bg-primary mb-3" style="width: 18rem;" >
    <div class="card-header">
      Manager <i class="fab fa-black-tie"></i>
      </span>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Name:${manager.name}</li>
      <li class="list-group-item">Employee ID:${manager.id}</li>
      <li class="list-group-item">Office Number:${manager.officeNumber}</li>
      <li class="list-group-item">Email:<a href="mailto:${manager.email}">${manager.email}</a></li>
    </ul>
  </div>
    
    `  

}
const engineerHTML = engineer => {
    return`
    <div class="dist card bg-success mb-3" style="width: 18rem;" >
    <div class="card-header">
      Engineer <i class="fas fa-chalkboard-teacher"></i>
      </span>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Name:${engineer.name}</li>
      <li class="list-group-item">Employee ID:${engineer.id}</li>
      <li class="list-group-item">GitHub:<a href="https://github.com/${engineer.github}">${engineer.github}</a></li>
      <li class="list-group-item">Email:<a href="mailto:${engineer.email}">${engineer.email}</a></li>
    </ul>
  </div>
    `  
}
const internHTML = intern => {
    return`
    <div class="dist card bg-info mb-3" style="width: 18rem;" >
    <div class="card-header">
      Intern <i class="fas fa-baby"></i>
      </span>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Name:${intern.name}</li>
      <li class="list-group-item">Employee ID:${intern.id}</li>
      <li class="list-group-item">School Name:${intern.school}</li>
      <li class="list-group-item">Email:<a href="mailto:${intern.email}">${intern.email}</a></li>
    </ul>
  </div>
    `  
}
const generatePage = employeeArr => {
    empList = [];
    for (let i = 0; employeeArr.length>i; i++){ // gets the employeeArray and loops it to get the role
        const role = employeeArr[i].getRole();// constructor function does not have role variable so it is getting role value from getRole function


        if (role === 'Manager'){ // if the role is Manager then push the Manager HTML chunk for manager
            empList.push(managerHTML(employeeArr[i]));
        }
        if (role === 'Engineer'){ // if the role is Manager then push the Manager HTML chunk for Engineer
            empList.push(engineerHTML(employeeArr[i]));
        }
        if (role === 'Intern'){ // if the role is Manager then push the Manager HTML chunk for Intern
            empList.push(internHTML(employeeArr[i]));
        }
    }
    const  mergedTeam = empList.join(''); //joins the array together and put into HMTLPage function
    return HTMLPage(mergedTeam); // this is the complete page to be written on index.html


}

const HTMLPage = mergedTeam =>{
    return`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" />

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
      crossorigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine">
    <link rel="stylesheet" href="./style.css" />
    <title>Employee Team Profile</title>
  </head>

  <body>
  <header>
  <nav class="navbar" >
    <span class="navbar-brand mb-0 h1 w-100 text-center" ><h1>Employee Team Profile</h1></span>
</nav>
</header>
      <main>
    ${mergedTeam}
      </main>
      
  </body>
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  </html> 
    `
}


// export to index
module.exports = generatePage;

