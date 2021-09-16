#! /usr/bin/env node

const { alias, boolean, help } = require('yargs');
const yargs = require('yargs');


const usage = "\n -n <name> the name"

const options = yargs
                .usage(usage)
                .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: false })
                .option("l",{alias:"languages",describe:"list all supported languages",type:"boolean",demandOption:false})
                .help(true)
                .argv;



if(options.name){

    const greeting = `HELLO Mr or MRS ${options.name}`;

    console.log(greeting);
}


if(options.languages){

    const thelang = "we see all this languages";

    console.log(thelang);
}