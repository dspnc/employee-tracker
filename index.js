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
const handleBiz = async (response) => {
    switch(response.action) {
        case "View All Employees":
            return viewEmployees()
        case "Add Employee":
            return addEmployee()
        case "Update Employee Role":
            console.log("updated employee role chosen");
            return updateRole()
        case "View All Roles":
            return viewRoles();
        case "Add Role":
            return addRole();
        case "View All Departments":
            return viewDepartments();
        case "Add Department":
            return addDepartment();
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
    await promptName();
}

const promptName = function(){
    var firstName;
    var lastName;
    var role;
    var managerId;

    inquirer.prompt([{
            type: 'input',
            name:'firstname',
            message: 'What is the first name of the new employee?'},
        {
            type: 'input',
            name: 'lastname',
            message: 'What is the last name of the new employee?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What will be the role of the new employee?'
        },
        {
            type: 'input',
            name: 'manager',
            message: "What is the manager id for the new employee's manager?"
        }
        ]).then(
        (resp) => {
            firstName = resp.firstname;
            console.log("First name is " + firstName)
            lastName = resp.lastname;
            console.log("Last name is " + lastName)
            role = resp.role
            managerId = resp.manager
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${firstName}", "${lastName}", ${role}, ${managerId})`, function (err, results) {
                if (err){
                    console.log("Error inserting data into table: " + err)
                } else {
                console.log(`${firstName} ${lastName} has been added to the database`)
                chooseAction()
                }
            })
        })
        }
    
    //function for updating a chosen employee's role
    const updateRole = function(){

        const roles = db.query(`SELECT * FROM role`, (err, res) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.map((role) => ({
                    name: `${role.role_title}`,
                    value: role,
                }))
        })

        db.query('SELECT * FROM employee', (err, results) => {

            if (err) {
              console.log(err);
              return;
            }
        
            // Map the employee data to an array of choices for the prompt
            const choices = results.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee,
            }));

           
        
            // Prompt the user to select an employee from the list
            inquirer
              .prompt({
                type: 'list',
                name: 'employee',
                message: 'Select an employee to update:',
                choices,
              })
              .then((resp) => {
                const employee = resp.employee;
        
                // Prompt the user to update the employee data
                inquirer
                  .prompt([
                    {
                      type: 'input',
                      name: 'roleId',
                      message: `What is the role id for the new employee?`,
                    },
                  ])
                  .then((resp) => {
                    const chosenRole = resp.roleId
                    
                    // Update the employee data in the database
                    db.query(
                      `UPDATE employee SET role_id = ${chosenRole} WHERE employee_id = ${employee.employee_id}`,
                      (err, results) => {
                        if (err) {
                          console.log('Error updating employee in database:', err);
                          return;
                        }
        
                        console.log(`Role updated for ${employee.first_name} ${employee.last_name}`);
                        chooseAction();
                      }
                    );
                  });
              });
          });
    }

    const addDepartment = function(){
        inquirer.prompt([{
            type: 'input',
            name:'deptName',
            message: 'What is the name of the new department?'}
        ]).then(
        (resp) => {
            db.query(`INSERT INTO department (dept_name) VALUES ("${resp.deptName}")`, (err, results) => {
                if (err){
                    console.log(err)
                    return
                }
                console.log(`${resp.deptName} added to database`)
                chooseAction();
            })
        }
        )

    }

    const addRole = function(){
        db.query('SELECT * FROM department', (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            // Map the dept data to an array of choices for the prompt
            const departments = results.map((dept) => ({
              name: `${dept.dept_name}`,
              value: dept,
            }));

        inquirer.prompt([{
            type: 'input',
            name:'roleTitle',
            message: 'What is the name of the new role?'},
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What department does the new role belong to?',
            choices: departments
        }
        ]).then(
        (resp) => {
            db.query(`INSERT INTO role (role_title, salary, dept_id) VALUES("${resp.roleTitle}", ${resp.salary}, ${resp.departmentId.dept_id})`)
            console.log(`${resp.roleTitle} added to database`)
            chooseAction();

        })

    })}

 
    


// Function call to initialize app
chooseAction();