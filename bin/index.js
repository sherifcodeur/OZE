#! /usr/bin/env node

const { alias, boolean, help } = require('yargs');
const yargs = require('yargs');

const filegenerate = require('../commands/crud');


const usage = "\n -n <name> the name"

const options = yargs
                .usage(usage)
                .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: false })
                .option("l",{alias:"languages",describe:"list all supported languages",type:"boolean",demandOption:false})
                .option("c",{alias:"controllers",describe:"create a controller directory",type:"boolean",demandOption:false})
                .option("a",{alias:"file",describe:"create a file in a directory",type:"boolean",demandOption:false})
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

if(options.controllers){

   filegenerate.createDirectory("controllers")
        .then(console.log("the file has been created"))
        .catch(err=>console.log(err));
}


if(options.file){

    filegenerate.createFile("pico.js","plois").then(console.log("bien cree")).catch(err=>console.log(err))
}