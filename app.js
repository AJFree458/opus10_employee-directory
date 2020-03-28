const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const employees = []

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function employeeRole() {
    inquirer.prompt([
        { type: "input", name: "name", message: "What is the Employee's name?" },
        { type: "input", name: "id", message: "Please enter their Employee ID." },
        { type: "input", name: "email", meassage: "Please enter the Employee's E-Mail." },
        { type: "list", name: "role", message: "What is the Employee's role?", choices: ["Manager", "Engineer", "Intern"] }
    ]).then(res => {
        console.log(res);
        let data = res;
    switch (res.role){
        case "Manager":
            inquirer.prompt([
                {type: "input", name: "officeNumber", message: "What is their Office Number?"}
            ]).then(managerRes => {
                let managerEntry = new Manager(data.name, data.id, data.email, managerRes.officeNumber);
                console.log(managerEntry);
                employees.push(managerEntry);
                console.log(employees);
                newEntry();
            });
        break;
        case "Engineer":
            engineerQuery(res.role);
        break;
        case "Intern":
            internQuery(res.role);
        break;
    }
    })
}

// function managerQuery() {
//     inquirer.prompt([
//         { type: "input", name: "name", message: "What is the Employee's name?" },
//         { type: "input", name: "id", message: "Please enter their Employee ID." },
//         { type: "input", name: "email", meassage: "Please enter the Employee's E-Mail." },
//         {type: "input", name: "officeNumber", message: "What is their Office Number?"}
//     ]).then(managerRes => {
//         let managerEntry = new Manager(managerRes.name, managerRes.id, managerRes.email, managerRes.officeNumber);
//         console.log(managerEntry);
//         employees.push(managerEntry);
//         console.log(employees);
//         // newEntry();
//     })
// }

function engineerQuery() {
    inquirer.prompt([
        { type: "input", name: "name", message: "What is the Employee's name?" },
        { type: "input", name: "id", message: "Please enter their Employee ID." },
        { type: "input", name: "email", meassage: "Please enter the Employee's E-Mail." },
        {type: "input", name: "giHubUsername", message: "What is their GitHub Username?"}
    ]).then(engineerRes => {
        let engineerEntry = new Engineer(engineerRes.name, engineerRes.id, engineerRes.email, engineerRes.giHubUsername);
        console.log(engineerEntry);
        employees.push(engineerEntry);
        console.log(employees);
        // newEntry();
    })
}

function internQuery() {
    inquirer.prompt([
        { type: "input", name: "name", message: "What is the Employee's name?" },
        { type: "input", name: "id", message: "Please enter their Employee ID." },
        { type: "input", name: "email", meassage: "Please enter the Employee's E-Mail." },
        {type: "input", name: "school", message: "What School do they attend?"}
    ]).then(internRes => {
        let internEntry = new Intern(internRes.name, internRes.id, internRes.email, internRes.school);
        console.log(internEntry);
        employees.push(internEntry);
        console.log(employees);
        // newEntry();
    })
}

function newEntry() {
    inquirer.prompt([
        { type: "list", name: "new", message: "Do you wish to add a new Employee?", choices: ["Yes, I would.", "No, Thank you. I am done."] }
    ]).then(res => {
        if ("Yes, I would.") {
            employeeRole();
        }
        else if ("No, Thank you. I am done.") {
            console.log("Finished!");
            return "Finished!"
        }

    })
    
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
employeeRole();

// { type: "input", name: "name", message: "What is the Employee's name?" },
//         { type: "input", name: "id", message: "Please enter their Employee ID." },
//         { type: "input", name: "email", meassage: "Please enter the Employee's E-Mail." },

// if ("Manager") {
    //     inquirer.prompt([
    //         {type: "input", name: "officeNumber", message: "What is their Office Number?"}
    //     ])
    //     .then (managerRes => {
    //         let managerNew = new Manager(managerRes.name, managerRes.id, managerRes.email, managerRes.role, managerRes.officeNumber);
    //         console.log(managerNew);
    //         employeeDirec.push(managerNew);
    //         console.log(employees);
    //         newEntry();
    //     })
    // }
    // else if ("Engineer") {
    //     inquirer.prompt([
    //         {type: "input", name: "gitHubUsername", message: "What is their GitHub Username?"}
    //     ]);
    // }
    // else if ("Intern") {
    //     inquirer.prompt([
    //         {type: "input", name: "school", message: "What is their School's name?"}
    //     ]);
    // }