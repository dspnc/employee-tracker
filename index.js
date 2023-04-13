const inquirer = require('inquirer')
const mysql = require('mysql2')
const consoleTable = require('console.table')

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

const handleBiz = (response) => {
    switch(response.action) {
        case "View All Employees":
            console.log('View all employees chosen');
            break;
        case "Add Employee":
            console.log("Add Employee chosen");
            break;
        case "Update Employee Role":
            console.log("updated employee role chosen");
            break;
        case "View All Roles":
            console.log('view all roles');
            break;
        case "Add Role":
            console.log("add role");
            break;
        case "View All Departments":
            console.log("view alll depts");
            break;
        case "Add Department":
            console.log("add dept")
            break;
        case "Quit":
            console.log("Quitting");
            break;
    }

}


function init() {

    inquirer
    .prompt(questions)
    .then((response) =>
        handleBiz(response)
    )
}

// Function call to initialize app
init();