# employee-tracker

  ## Description [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  Command-line application to manage a company's employee database using Node.js and MySQL

    

  ## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Testing](#tests)
6. [Questions](#questions)

## Installation
First install the required node packages including inquirer, mysql2, and console.table
Then run the schema, and seeds .sql files in mysql to create and load the initial database
Then run "node index.js" in the command line to run the app.

## Usage
Use the app to manage an employee database, including data such as role, salary, title, manager, department.

## License
This project was created under the MIT license

## Testing
Test the app by running it in the command line and choosing to add employee, and add relevant fields. Once the app has been used to add new data or change existing details, use mysql to describe the tables and see the new data populated in the database.

## Questions
View my GitHub profile [here](https://github.com/dspnc)  

To reach out directly, please email me at dspence.hill@gmail.com

Here is a link to a screencast of the app in action: [video](https://drive.google.com/file/d/1-PXJlXJ1-kKuMBGugf_EfYZxFJdVJnDC/view)

NOTE: it is important to run the seeds.sql file after sourcing the schema and seeds in order to add the foreign key constraint for manager!


