const inquirer = require('inquirer');
const fs = require('fs');
require('dotenv').config();
const rimraf = require('rimraf');
const chalk = require('chalk');
const os = require('os');
const Listr = require('listr');
const reportbug = require('./report.model.js');
const mongoose = require('mongoose');
const db = `mongodb+srv://ayushshah:${process.env.DB_PASSWORD}@cluster0.qo9lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
const error = chalk.white.bgRed.bold;
const warning = chalk.keyword('orange');
const boilerPlate = (stylesheet, nameOfComponent) => {
    return `import '.${stylesheet}';\n
export default const ${nameOfComponent} = () => {
    return (
        <div>
            
        </div>
    )
}`
}

const createComponent = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "components",
            message: "Enter components to be created (space-seperated):"
        },
        {
            type: "rawlist",
            name: "optionsForjs",
            message: "Select extension for your component file:",
            choices: ['.js','.jsx','.ts']
        },
        {
            type: "rawlist",
            name: "optionsForcss",
            message: "Select extension for your stylesheet:",
            choices: ['.scss','.css','.less']
        }
    ]).then(answers => {
        const def = __dirname + '/components';
        fs.mkdirSync(def, {recursive:true} ,(err) => {
            if(err) {
                console.log(error("ERR!")+" Could not create components! Please try again!");
                return;
            }
        });
        let arrOfComponents = answers.components.split(" ").filter(component => component.length);
        let existingComponents = fs.readdirSync(def), existsAlready = false;
        let task;
        arrOfComponents.forEach(component => {
            let nameOfComponent = component.charAt(0).toUpperCase() + component.slice(1);
            if(existingComponents.includes(nameOfComponent)) {
                existsAlready = true;
            }
        });
        if(existsAlready) {
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirmOverwritting",
                    message: `${warning("WARN!")} Files will be overwritten! Are you sure`,
                    default: false
                }
            ]).then(result => {
                if(result.confirmOverwritting) {
                        task = new Listr([
                        {
                            title: "Creating your components",
                            task: () => {
                                arrOfComponents.forEach(component => {
                                    let nameOfComponent = component.charAt(0).toUpperCase() + component.slice(1);
                                    const path = def+'/'+nameOfComponent;
                                    if(existingComponents.includes(nameOfComponent)) {
                                        rimraf.sync(path);
                                    }
                                    fs.mkdir(path, {recursive:true}, (err) => {
                                        if(err) {
                                            console.log(err);
                                        } else {
                                            const ComponentFileName = '/'+nameOfComponent+answers.optionsForjs;
                                            const StylesheetFileName = '/'+nameOfComponent+answers.optionsForcss;
                                            const ComponentFileNamePath = path+ComponentFileName;
                                            const StylesheetFileNamePath = path+StylesheetFileName;
                                            fs.writeFileSync(ComponentFileNamePath,boilerPlate(StylesheetFileName,nameOfComponent));
                                            fs.writeFileSync(StylesheetFileNamePath,``);
                                        }
                                    });
                                });
                            }
                        }
                    ]);
                } else {
                    return;
                }
            });
        } else {
                task = new Listr([
                {
                    title: "Creating your components",
                    task: () => {
                        arrOfComponents.forEach(component => {
                            let nameOfComponent = component.charAt(0).toUpperCase() + component.slice(1);
                            const path = def+'/'+nameOfComponent;
                            if(existingComponents.includes(nameOfComponent)) {
                                rimraf.sync(path);
                            }
                            fs.mkdir(path, {recursive:true}, (err) => {
                                if(err) {
                                    console.log(err);
                                } else {
                                    const ComponentFileName = '/'+nameOfComponent+answers.optionsForjs;
                                    const StylesheetFileName = '/'+nameOfComponent+answers.optionsForcss;
                                    const ComponentFileNamePath = path+ComponentFileName;
                                    const StylesheetFileNamePath = path+StylesheetFileName;
                                    fs.writeFileSync(ComponentFileNamePath,boilerPlate(StylesheetFileName,nameOfComponent));
                                    fs.writeFileSync(StylesheetFileNamePath,``);
                                }
                            });
                        });
                    }
                }
            ]);
        }
        task.run().then(() => {
            console.log(`✔️ Components created successfully!`);
        }).catch(err => {
            console.log(`${error("ERR!")} Something went wrong while creating components! Please try again!`);
        })
    }).catch((error) => {
        if (error.isTtyError) {
            console.log(`${error("ERR!")} Oops! Something went wrong with the environment!`);
        } else {
            console.log(`${error("ERR!")} Something went wrong! Please try again!`);
        }
    });
}

const removeComponent = () => {
    const def = __dirname + '/components';
    if(!fs.existsSync(def)) {
        console.log(`${error("ERR!")} No components to remove in current directory!`);
        return;
    }
    inquirer.prompt([
        {
            type: "input",
            name: "components",
            message: "Enter components to be removed (space-seperated):"
        }
    ]).then(answers => {
        let arrOfComponents = answers.components.split(" ").filter(component => component.length);
        if(arrOfComponents.length) {
            // ask are you sure.
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirmDeletion",
                    message: `${warning("WARN!")} Are you sure:`,
                    default: false
                }
            ]).then(result => {
                if(result.confirmDeletion) {
                    arrOfComponents.forEach(component => {
                        const folderPath = def+'/'+component;
                        if(fs.existsSync(folderPath)) {
                            rimraf.sync(folderPath);
                        }
                    });
                }
                return;
            })
        }
        console.log(`✔️ Components removed successfully!`);
    }).catch((error) => {
        if (error.isTtyError) {
            console.log(`${error("ERR!")} Oops❗ Something went wrong with the environment! ⚠️`);
        } else {
            console.log(`${error("ERR!")} Something went wrong❗ Please try again❗`);
        }
    });
}


const removeAllComponents = () => {
    const def = __dirname + '/components';
    if(!fs.existsSync(def)) {
        console.log(`${error("ERR!")} No Components to remove!`);
        return;
    }
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirmDeletion",
            message: `${warning("WARN!")} Are you sure:`,
            default: false
        }
    ]).then(result => {
        if(result.confirmDeletion) {
            rimraf.sync(def);
            console.log(`✔️ All Components Removed!`);
        } 
        return;
    })
}

const reportBug = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "bug",
            message: "Enter bug report:"
        }
    ]).then(answers => {
        if(answers.bug.length) {
            const dbase = mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
            let newBug = {
                message: answers.bug,
                Date: Date.now()
            }
            reportbug.create(newBug).then(res => {
                console.log(`✔️ Successfully reported bug!`);
                mongoose.connection.close();
            }).catch(err => {
                console.log(`${error('ERR!')} Error occured. Could not report. Please try again!`);
                mongoose.connection.close();
            });
        }
    })
}

module.exports = {
    createComponent,
    removeComponent,
    removeAllComponents,
    reportBug
}


