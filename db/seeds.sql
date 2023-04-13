INSERT INTO department(dept_name)
VALUES ("Sales"),
       ("Customer Support"),
       ("Engineering"),
       ("Account Management"),
       ("Human Resources");


INSERT INTO role(role_title, salary, dept_id)
VALUES ("Sales Executive", 120000, 1),
    ("Customer Support Analyst", 65000, 2),
    ("Implementation Specialist", 75000, 4),
    ("Senior Software Engineer", 150000, 3),
    ("Head of Legal", 175000, 5);
       

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Doug", "Davis", 1, 1),
    ("Sam", "Smith", 2, 2),
    ("Brett", "Parnell", 3, 4),
    ("Spencer", "Hill", 4, 3),
    ("Maria", "Flanagan", 5, 5); 