

const renderModelTemplate = (modelName) =>{

    let modelNameLower = modelName.toLowerCase();

    let modeltemplate = `
    // ${modelName} Model


    //importing external dependencies
    const mongoose = require('mongoose');



    // creating ${modelName} Schema
    const Schema = mongoose.Schema;
    const ${modelNameLower}Schema = new Schema({

        name : {
            type:String,
            required:[true,'required field'],       
        },
    
    },     
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        { timestamps: true }
    );


    // creating model ${modelName} based on the ${modelNameLower} schema
    const ${modelName} = mongoose.model('${modelNameLower}',${modelNameLower}Schema);



    //exporting the model ${modelName}
    module.exports =  ${modelName} ;`

    return modeltemplate;

}


module.exports = renderModelTemplate;


