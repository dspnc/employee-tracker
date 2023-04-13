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
    .then(async (response) => {
        if (response.action === "Quit"){
            return;
        } else {
        await handleBiz(response);
        chooseAction();
        }
    })
}

//switch case depending on chosen action from prompt
const handleBiz = (response) => {
    switch(response.action) {
        case "View All Employees":
            console.log('View all employees chosen');
            // chooseAction();
            break;
        case "Add Employee":
            console.log("Add Employee chosen");
            // chooseAction();
            break;
        case "Update Employee Role":
            console.log("updated employee role chosen");
            // chooseAction();
            break;
        case "View All Roles":
            console.log('view all roles');
            // chooseAction();
            break;
        case "Add Role":
            console.log("add role");
            // chooseAction();
            break;
        case "View All Departments":
            console.log("view alll depts");
            return viewDepartments();
            // chooseAction();
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
        console.table(results)
        //console.table("All Departments", newTable)
        
    })
}



// Function call to initialize app
chooseAction();