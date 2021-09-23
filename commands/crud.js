// to create crud files based on a model 



// import dependencies

const fs = require('fs')
const path = require('path')

const renderModelTemplate = require('../templates/model')
const renderControllerTemplate = require('../templates/controller')
const renderRouteTemplate = require('../templates/route')
const renderServerTemplate = require('../templates/server')
const renderDatabaseTemplate = require('../templates/database')


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


// create a model - argument model name -if no models directory exists we create it
const createModel = (modelToCreate)=>{

    createFile(`${modelToCreate}.js`,"models")
    .then(

        res=>{

           
            fs.writeFile(`models/${modelToCreate}.js`, renderModelTemplate(modelToCreate),(err)=>{

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

// const createView = (viewToCreate)=>{

//     createFile(`${viewToCreate}.js`,"views")
//     .then(res=>{

//         const pathfile = path.join(__dirname,`../views/${viewToCreate}.js`)

//         fs.writeFile(pathfile, renderViewTemplate(viewToCreate),(err)=>{

//             if(err){

//                 console.log(err)
//             }else{

//                 console.log("succes writing template")
//             }

//         })

//     })
//     .catch(err=>console.log(err))
// }


// create a controller - crud - based on a model - if there is no controller directory we create it
const createController = (controllerToCreate)=>{

    createFile(`${controllerToCreate}.js`,"controllers")
    .then( res=>{

       
        fs.writeFile(`controllers/${controllerToCreate}.js`, renderControllerTemplate(controllerToCreate),(err)=>{


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

const createRoute = (modelName)=>{

    createFile(`${modelName}Routes.js`,"routes")
    .then( res=>{

        
        fs.writeFile(`routes/${modelName}Routes.js`, renderRouteTemplate(modelName),(err)=>{


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


/// create simple minimal server with express
const createServer = (nameOfFile)=>{


    createFile(`${nameOfFile}.js`)
    .then(

        res=>{

            // const pathfile = path.join(process.cwd(),`../${nameOfFile}.js`)

            // console.log("pathfile",pathfile)
            fs.writeFile(`${nameOfFile}.js`, renderServerTemplate(),(err)=>{

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

// creates env and gitignore
const createSpecialFiles = ()=>{

   
    // create env file
    createFile(`.env`)
    .then( 
        res=>{

            const data = `
BASE_URL = "http://localhost"
PORT = 5000
MONGODB_URL = ""`

            fs.writeFile(`.env`, data,(err)=>{

                if(err){

                    console.log(err)
                }else{

                    console.log("succes writing env file")
                }

            })
        }
        
    )
    .catch(err=>console.log("env file error",err))


    // create gitignore file
    createFile(`.gitignore`)
    .then( 
        res=>{

            const data = `/node_modules
            .env`

            fs.writeFile(`.gitignore`, data,(err)=>{

                if(err){

                    console.log(err)
                }else{

                    console.log("succes writing gitignore file")
                }

            })
        }
        
    )
    .catch(err=>console.log("gitignore file error",err))



}

const createDB = (nameOfFile)=>{

    createFile(`${nameOfFile}.js`,"database")
    .then(

        res=>{

            fs.writeFile(`database/${nameOfFile}.js`,renderDatabaseTemplate(),(err)=>{


            if(err){

                console.log(err)
            }else{

                console.log("succes writing database template")
            }



        })
        
        }

        
    )
    .catch()

}

module.exports = {
   createModel,
   createController,
   createRoute,
   createServer,
   createSpecialFiles,
   createDB
}