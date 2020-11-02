const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");               
const { clear } = require("console");
const writeFileAsync = util.promisify(fs.writeFile);  

let team = [];

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
                choices: ["Manager", "Engineer", "Intern", new inquirer.Separator(), "Finish"]
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
                if (response.type === "Finish") {
                    writeTeam();
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
            }

        ])
        .then(function (response) {
            const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
            team.push(manager);
            selectType();
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
            const engineer = new Engineer(response.name, response.id, response.email, response.github);
            team.push(engineer);
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
            const intern = new Intern(response.name, response.id, response.email, response.school);
            team.push(intern);
            if (response.addAnother === "yes") {
                addIntern();
            } else {
                selectType();
            }
        })
}

// Runs initial function
selectType();

if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
}
//Renders HTML & writes to new team.html file
async function writeTeam(){                                        
    const renderTeam = render(team); 
    await writeFileAsync(outputPath, renderTeam);
}

