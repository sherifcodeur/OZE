// to create crud files based on a model 



// import dependencies

const fs = require('fs')
const path = require('path')

const renderModelTemplate = require('../templates/model')
const renderControllerTemplate = require('../templates/controller')


// all names of directories we want to create for application
const directories = ["controllers", "models", "middlewares", "views","services","routes"]


// create a directory at the root level of the app
const createDirectory = (nameOfDirectory) => {

    return new Promise((resolve, reject) => {

        // we check if we can access the directory(if it exists)
        fs.access(nameOfDirectory, (error) => {

            // it doesn't exist we create it
            if (error) {
                fs.mkdir(nameOfDirectory, (err) => {

                    if (err) {

                        reject(Error("error1"))

                    } else {

                        resolve("the controllers directory has been created")
                    }

                })

            } else {

                resolve("the controller already exist")
            }
        })

    })


}

// create a file in a directory or directly in the root if not specified the directory
const createFile = (nameOfFile, nameOfDirectory = null) => {



    return new Promise((resolve, reject) => {



        // we ask for a directory
        if (nameOfDirectory) {

            // on cree dabord le directory
            createDirectory(nameOfDirectory).then(res => {


                let path = `${nameOfDirectory}/${nameOfFile}`
                fs.appendFile(path, '', (err) => {
                    if (err) {

                        reject(err)

                    } else {

                        resolve("added file")
                    }

                })


            }).catch(err => console.log(err))


        // we don't need a directory
        } else {

            let path = `${nameOfFile}`

            fs.appendFile(path, '', (err) => {

                if (err) {

                    reject(err)

                } else {

                    resolve("added file")
                }

            })


        }

    })
}


const createModel = (modelToCreate)=>{

    createFile(`${modelToCreate}.js`,"models")
    .then(

        res=>{

            const pathfile = path.join(__dirname,`../models/${modelToCreate}.js`)
            fs.writeFile(pathfile, renderModelTemplate(modelToCreate),(err)=>{

                if(err){

                    console.log(err)
                }else{

                    console.log("succes writing template")
                }

            })
        
        
        }
    )
    .catch(err=>console.log(err))


}

const createView = (viewToCreate)=>{

    createFile(`${viewToCreate}.js`,"views")
    .then(res=>{

        const pathfile = path.join(__dirname,`../views/${viewToCreate}.js`)

        fs.writeFile(pathfile, renderViewTemplate(viewToCreate),(err)=>{

            if(err){

                console.log(err)
            }else{

                console.log("succes writing template")
            }

        })

    })
    .catch(err=>console.log(err))
}


const createController = (controllerToCreate)=>{

    createFile(`${controllerToCreate}.js`,"controllers")
    .then( res=>{

        const pathfile = path.join(__dirname,`../controllers/${controllerToCreate}.js`)
        fs.writeFile(pathfile, renderControllerTemplate(controllerToCreate),(err)=>{


            if(err){

                console.log(err)
            }else{

                console.log("succes writing template")
            }



        })
       
    }

        


    )
    .catch(err=>console.log(err))
}






module.exports = {
   createModel,
   createController,
}