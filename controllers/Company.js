
    // Company Controller

    // we import the model so we can interact with the database
    const mongoose = require('mongoose');
    
    // importing the Company model
    const Company = require('../models/Company.js');
    
    
    
    // shows all company
    const index = (req, res) => {
    
        Company.find().then((result) => {
    
            //console.log(result);
            res.render('./companys/index', {
    
                allcompanys: result
            });
        }).catch(err => console.log(err));
    
    
    }
    
    
    // sends to a form to create a company
    const create = (req, res) => {
    
        res.render('./companys/create');
    
    }
    
    // receive the req from the form to create a company in the db
    const store = (req, res) => {
    
        // console.log(req.body.name);
        let newCompany = new Company(req.body);
    
        newCompany.save().then(res.redirect('/companys')).catch(err => console.log(err.message));
    
    
    
    
    
    }
    
    // show one company
    const show = (req, res) => {
    
        let theid = req.params.id;
    
        Company.findById(theid)
            .then(result => {
    
                res.render(`./products/show`, {
                    thecompany: result
                });
    
            })
            .catch(err => console.log(err));
    
    }
    
    // show the edit form with old values 
    const edit = (req, res) => {
    
        let theid = req.params.id;
    
        Company.findById(theid)
            .then(result => {
    
                res.render(`./products/edit`, {
                    thecompany: result
                });
    
            })
            .catch(err => console.log(err));
    
    }
    
    // take back the values from the edit form and update them in the db
    const update = (req, res) => {
    
        let theid = req.params.id;
    
        //console.log(req.body);
    
        Company.findByIdAndUpdate(theid, req.body).then(result => {
    
    
            res.redirect('/companys');
        }).catch(err => console.log(err));
    
    
    
    }
    
    
    // delete the company form the database 
    const destroy = (req, res) => {
    
        let theid = req.params.id;
    
        Company.findByIdAndDelete(theid).then(result => {
    
            res.redirect('/companys');
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

    