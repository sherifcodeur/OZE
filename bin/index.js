#! /usr/bin/env node

const { alias, boolean, help } = require('yargs');
const yargs = require('yargs');

const filegenerate = require('../commands/crud');


const usage = "\n -n <name> the name"

const options = yargs
                .usage(usage)
                .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: false })
                .option("l",{alias:"languages",describe:"list all supported languages",type:"boolean",demandOption:false}) 
                .option("c",{alias:"controller",describe:"create a controller file based on model",type:"string",demandOption:false})               
                .option("m",{alias:"model",describe:"create a file in a directory",type:"string",demandOption:false})
                .option("r",{alias:"route",describe:"create the routes for the model in routes directory",type:"string",demandOption:false})
                .option("s",{alias:"server",describe:"create a simple server with Node and express",type:"string",demandOption:false})
                .option("x",{alias:"special",describe:"create env and gitignore files",type:"boolean",demandOption:false})
                .option("d",{alias:"database",describe:"create database connexion file",type:"string",demandOption:false})
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


// option for creating a model : usage -m <nameofmodel>
if(options.model){

    filegenerate.createModel(options.model)
}


// option for creating a controller usage -c <nameofmodel>
if(options.controller){

    filegenerate.createController(options.controller)
}


// option for creating a route usage -r <nameofmodel>
if(options.route){

    filegenerate.createRoute(options.route)
}


// option for creating a route usage -r <nameofmodel>
if(options.server){

    filegenerate.createServer(options.server)
}


// option for creating special files -env and gitignore usage -spe <nameofmodel>
if(options.special){

   
    filegenerate.createSpecialFiles()
}


if(options.database){

    filegenerate.createDB(options.database)
}


