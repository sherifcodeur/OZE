




const renderRouteTemplate = (modelName) =>{

    let modelNameLower = modelName.toLowerCase();

    let routetemplate = `// all routes for ${modelName} Model
    const express = require('express');
    const router = express.Router();
    const ${modelNameLower}Controller = require('../controllers/${modelName}');
    
    
    
    
    router.get('/', ${modelNameLower}Controller.${modelNameLower}_get)
    
    router.post('/', ${modelNameLower}Controller.${modelNameLower}_post)
    
    router.get('/show/:id',${modelNameLower}Controller.${modelNameLower}_show)
    
    router.put('/update/:id',${modelNameLower}Controller.${modelNameLower}_put)
    
    router.delete('/delete/:id',${modelNameLower}Controller.${modelNameLower}_delete)
    
    router.get('/search',${modelNameLower}Controller.${modelNameLower}_search)
    
    module.exports = router ;
    `

    return routetemplate;

}


module.exports = renderRouteTemplate;


