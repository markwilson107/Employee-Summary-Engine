const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function selectType() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What type of employee do you want to add?",
                name: "type",
                choices: ["Manager", "Engineer", "Intern"]
            }]).then(function (response) {
                if (response.type === "Manager") {
                    addManager();
                }
                if (response.type === "Engineer") {
                    addEngineer();
                }
                if (response.type === "Intern") {
                    addIntern();
                }
        })
}


function addManager() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Manager name:",
                name: "name"
            },
            {
                type: "input",
                message: "Manager ID:",
                name: "id"
            },
            {
                type: "input",
                message: "Manager email:",
                name: "email"
            },
            {
                type: "input",
                message: "Manager office number:",
                name: "officeNumber"
            },
            {
                type: "list",
                message: "Add another manager?",
                name: "addAnother",
                choices: ["yes", "no"]
            }
        ])
        .then(function (response) {
            if (response.addAnother === "yes") {
                addManager();
            } else {
                selectType();
            }
        })
}

function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Engineer name:",
                name: "name"
            },
            {
                type: "input",
                message: "Engineer ID:",
                name: "id"
            },
            {
                type: "input",
                message: "Engineer email:",
                name: "email"
            },
            {
                type: "input",
                message: "Github username:",
                name: "github"
            },
            {
                type: "list",
                message: "Add another engineer?",
                name: "addAnother",
                choices: ["yes", "no"]
            }
        ])
        .then(function (response) {
            if (response.addAnother === "yes") {
                addEngineer();
            } else {
                selectType();
            }
        })
}

function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Intern name:",
                name: "name"
            },
            {
                type: "input",
                message: "Intern ID:",
                name: "id"
            },
            {
                type: "input",
                message: "Intern email:",
                name: "email"
            },
            {
                type: "input",
                message: "Intern school:",
                name: "school"
            },
            {
                type: "list",
                message: "Add another intern?",
                name: "addAnother",
                choices: ["yes", "no"]
            }
        ])
        .then(function (response) {
            if (response.addAnother === "yes") {
                addIntern();
            } else {
                selectType();
            }
        })
}

selectType();

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
// for the provided `render` function to work! ```
