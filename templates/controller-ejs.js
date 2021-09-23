

const renderControllerTemplate = (modelName) =>{

    let modelNameLower = modelName.toLowerCase();
    let modelNameLowerPlurar = modelNameLower+'s';

    let controllertemplate = `
    // ${modelName} Controller

    // we import the model so we can interact with the database
    const mongoose = require('mongoose');
    
    // importing the ${modelName} model
    const ${modelName} = require('../models/${modelName}.js');
    
    
    
    // shows all ${modelNameLower}
    const index = (req, res) => {
    
        ${modelName}.find().then((result) => {
    
            //console.log(result);
            res.render('./${modelNameLowerPlurar}/index', {
    
                all${modelNameLowerPlurar}: result
            });
        }).catch(err => console.log(err));
    
    
    }
    
    
    // sends to a form to create a ${modelNameLower}
    const create = (req, res) => {
    
        res.render('./${modelNameLowerPlurar}/create');
    
    }
    
    // receive the req from the form to create a ${modelNameLower} in the db
    const store = (req, res) => {
    
        // console.log(req.body.name);
        let new${modelName} = new ${modelName}(req.body);
    
        new${modelName}.save().then(res.redirect('/${modelNameLowerPlurar}')).catch(err => console.log(err.message));
    
    
    
    
    
    }
    
    // show one ${modelNameLower}
    const show = (req, res) => {
    
        let theid = req.params.id;
    
        ${modelName}.findById(theid)
            .then(result => {
    
                res.render(`+"`./products/show`"+`, {
                    the${modelNameLower}: result
                });
    
            })
            .catch(err => console.log(err));
    
    }
    
    // show the edit form with old values 
    const edit = (req, res) => {
    
        let theid = req.params.id;
    
        ${modelName}.findById(theid)
            .then(result => {
    
                res.render(`+"`./products/edit`"+`, {
                    the${modelNameLower}: result
                });
    
            })
            .catch(err => console.log(err));
    
    }
    
    // take back the values from the edit form and update them in the db
    const update = (req, res) => {
    
        let theid = req.params.id;
    
        //console.log(req.body);
    
        ${modelName}.findByIdAndUpdate(theid, req.body).then(result => {
    
    
            res.redirect('/${modelNameLowerPlurar}');
        }).catch(err => console.log(err));
    
    
    
    }
    
    
    // delete the ${modelNameLower} form the database 
    const destroy = (req, res) => {
    
        let theid = req.params.id;
    
        ${modelName}.findByIdAndDelete(theid).then(result => {
    
            res.redirect('/${modelNameLowerPlurar}');
        }).catch(err => console.log(err));
    
    
    }
    
    
    module.exports = {
    
        index,
        create,
        store,
        show,
        edit,
        update,
        destroy,
    
    }

    `

    return controllertemplate;

}


module.exports = renderControllerTemplate;


