#!/usr/bin/env node

const {
    createComponent,
    removeComponent,
    removeAllComponents,
    reportBug
} = require('./index.js');
const syncPromise = require('synchronized-promise')
const chalk = require('chalk');
const error = chalk.white.bgRed.bold;

switch (process.argv[2]) {
    case 'create':
        createComponent();
        break;
    case 'remove':
        if(process.argv.length>3) {
            if(process.argv[3]=="-a" || process.argv[3]=="all") {
                removeAllComponents();
            } else {
                console.log(error("ERR!") + " Invalid option🛑");
            }
        } else {
            removeComponent();
        }
        break;
    case 'report':
        reportBug();
        break;
    default:
        console.log(error("ERR!") + " Invalid command🛑");
        break;
}

