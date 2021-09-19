// to create crud files based on a model 



// import dependencies

const fs = require('fs')
const {
    createInflate
} = require('zlib')

// all names of directories we want to create for application
const directories = ["controllers", "models", "middlewares", ""]



const createDirectory = (nameOfDirectory) => {

    return new Promise((resolve, reject) => {

        fs.access(nameOfDirectory, (error) => {


            if (error) {
                fs.mkdir(nameOfDirectory, (err) => {

                    if (err) {

                        reject(Error("error1"))

                    } else {

                        resolve("the controllers directory has been created")
                    }

                })

            } else {

                reject(Error(error))
            }
        })

    })


}


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




// // check if a directory exists with a given name and create it if it doesn't
//   makeDirectory =  (nameOfDirectory) => {   

//     // check if we can access the directory
//     fs.access(nameOfDirectory,(error)=>{


//         if(error){

//             console.log("directory doesn't exist")

//             fs.mkdir(nameOfDirectory,(err)=>{

//                 if(err){

//                     console.log("error1",err)
//                 }else{

//                     console.log("the controllers directory has been created")
//                 }
//             });
//         }else{
//             console.log("the directory exists")
//         }

//     })








// }


// // create a file if it doesn't exists
// createFile = async (nameOfFile,directoryPath = null)=>{

//     let separator = ''

//     if(directoryPath){
//       await  makeDirectory(directoryPath)
//       separator ='/'
//     }else{
//         directoryPath = '';
//     }

//     fs.appendFile(`${directoryPath}${separator}${nameOfFile}`,'',(err)=>{

//         if(err){

//             console.log("on passe ici ou koi",err)

//         }else{

//             console.log("appended existing file or ")

//         }
//     })


// }


module.exports = {
    createDirectory,
    createFile
}