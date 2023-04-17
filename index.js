const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'cms_db'
    },
    console.log(`Connected to the cms_db database.`)
  );


//list of possible actions for prompt
const questions =
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: ['View All Employees', 
                'Add Employee', 
                'Update Employee Role', 
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit']
    }


//function to initiate prompt and then handleBiz with the response
function chooseAction() {
    inquirer
    .prompt(questions)
    .then((response) => {
        if (response.action === "Quit"){
            return;
        } else {
        handleBiz(response);
        }
    })
}

//switch case depending on chosen action from prompt
const handleBiz = (response) => {
    switch(response.action) {
        case "View All Employees":
            return viewEmployees()
        case "Add Employee":
            return addEmployee()
        case "Update Employee Role":
            console.log("updated employee role chosen");
            // chooseAction();
            break;
        case "View All Roles":
            return viewRoles();
        case "Add Role":
            console.log("add role");
            // chooseAction();
            break;
        case "View All Departments":
            return viewDepartments();
        case "Add Department":
            console.log("add dept")
            // chooseAction();
            break;
        case "Quit":
            console.log("Quitting");
            return;
    }

}


const viewDepartments = function(){
    db.query('SELECT * FROM department', function (err, results) {
        console.table("Departments", results)
        chooseAction()
    })
}

const viewEmployees = function(){
    db.query('SELECT * FROM employee', function (err, results) {
        console.table("Employees", results)
        chooseAction()
    })
}

const viewRoles = function(){
    db.query("SELECT * FROM role", function (err, results) {
        console.table("Roles", results)
        chooseAction();
    })
}


const addEmployee = async function(){

    var firstName = await promptFirstName();
    var lastName = await promptLastName();
    return writeFullName(firstName, lastName);
}

const promptFirstName = function(){

    inquirer.prompt({
        type: 'input',
        name:'firstname',
        message: 'What is the first name of the new employee?'
        }).then(
        (resp) => {
            var firstName = resp.firstname;
            console.log("First name is " + firstName)
            return firstName;
        })

}

const promptLastName = function(){
    inquirer.prompt({
        type: "input",
        name: "lastname",
        message: "What is the last name of the new employee?"})
        .then((resp2) => {
            var lastName = resp2.lastname;
            console.log("Last name is " + lastName)
            return lastName;
        })
}

const writeFullName = function(first, last){
    console.log("first name is " + first + ". Last name is " + last + ", so full name is " + first+ " "+ last)
}
 
    


// Function call to initialize app
chooseAction();