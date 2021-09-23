
const pluralize = require('pluralize')

const renderControllerTemplate = (modelName) =>{

    let modelNameLower = modelName.toLowerCase();
    let modelNameLowerPlural = pluralize(modelNameLower);

    

    let controllertemplate =`
    
    const ${modelName} = require('../models/${modelName}')



// retrieve all ${modelNameLowerPlural} in the database
const ${modelNameLower}_get = async (req,res)=>{

    let response = {};


    // this code is to fetch all ${modelNameLowerPlural} withtout pagination
    // try {
    //     const all${modelName} = await ${modelName}.find();
    //     if(! all${modelName}){
    //        // there is nothing to show but success
    //         res.status(200).send(response);
    //     }else{
    //         // we show all ${modelNameLowerPlural}
    //         res.status(200).send(all${modelName});
    //     }        
    // } catch (error) {
    //     // there is an error we send status 500
    //     res.status(500).send(error);        
    // }


    


    // fetching all${modelNameLowerPlural} with cursor based pagination
    ${modelName}.paginate({
        limit: 1,
        previous: req.query.previous || null,
        next: req.query.next || null   
    
    })
    .then((result) => {

        console.log(result);


        const links = {};
        if (result.hasNext) {
            links.next = ` + "`${process.env.BASE_URL}:${process.env.PORT}/api/"+`${modelNameLower}`+"?next=${result.next}`;"+`
        }
        if (result.hasPrevious) {
            links.previous = ` +"`${process.env.BASE_URL}:${process.env.PORT}/api/"+`${modelNameLower}`+"?previous=${result.previous}`"+`;
        }
        //console.log("les links",links)
        res.links(links);
        res.status(200).send(result);

      }).catch(err=>{
          
        res.status(200).send(response);

      });

    // end of fetching with pagination  


}


// add a new ${modelNameLower} to the database
const ${modelNameLower}_post = async (req,res)=>{

    //console.log("le body",typeof req.body)

    let response = {};

    try {

        const new${modelName} = await new ${modelName}(req.body); 
        
        new${modelName}.save()
        .then(()=>{

            res.status(201).send(new${modelName});

        })
        .catch(e=>{
            
            //console.log("erreur 1",e)

            res.status(500).send(response);
        })

                       
        
    } catch (error) {

        //console.log("erreur 2",error);

        res.status(500).send(response)
        
    }  


}


// show details of a ${modelNameLower}
const ${modelNameLower}_show = async (req,res)=>{

    let result = {};

    try {

        let id = req.params.id;

        let one${modelName} = await ${modelName}.findById(id);

        if(!one${modelName}){

            throw new Error("no such ${modelNameLower}")
        }else{

            res.status(200).send(one${modelName});
        }

        

        
    } catch (error) {

        console.log("erreur 1",error);

        //result = {error:error.message}

        res.status(400).send(error)
        
    }

}


/// update a ${modelNameLower} details in the database
const ${modelNameLower}_put = async(req,res)=>{

    let result = {}

    try {

        let id = req.params.id;

        let updated${modelName} = await ${modelName}.findByIdAndUpdate(id,req.body,{new:true})

        if(!updated${modelName}){

            throw new Error("no such ${modelNameLower}")
        }else{

            res.status(200).send(updated${modelName})
        }
        
    } catch (error) {

        console.log(error)

        res.status(400).send(error)

        
    }



}

// delete a ${modelNameLower} from the database
const ${modelNameLower}_delete = async (req,res)=>{

    let result = {}

    try {

        let id = req.params.id; 

        let deleted${modelName} = await ${modelName}.findByIdAndDelete(id)

        if(!deleted${modelName}){

            throw new Error("nothing to delete")
        }else{

            res.status(200).send(deleted${modelName})
        }
        
    } catch (error) {

        console.log(error)

        res.status(400).send(error)

        
    }    


}

// search by name 
const ${modelNameLower}_search = async(req,res)=>{

    const query = req.query;

    // let response = {};

    try {

        const searchResult = await ${modelName}.find(  {"name":{$regex:req.query.name,$options:'$i'}} );

        if(!searchResult){

            throw new Error("no ${modelNameLowerPlural} in the database");
        }else{

            res.status(200).send(searchResult);
        }
        
    } catch (error) {

        res.status(500).send(error);

        
    }


}

module.exports = {

    ${modelNameLower}_get,
    ${modelNameLower}_post,
    ${modelNameLower}_show,
    ${modelNameLower}_put,
    ${modelNameLower}_delete,
    ${modelNameLower}_search


}`;

return controllertemplate

}


module.exports = renderControllerTemplate;