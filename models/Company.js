
    // Company Model


    //importing external dependencies
    const mongoose = require('mongoose');



    // creating Company Schema
    const Schema = mongoose.Schema;
    const companySchema = new Schema({

        name : {
            type:String,
            required:[true,'required field'],       
        },
    
    },     
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        { timestamps: true }
    );


    // creating model Company based on the company schema
    const Company = mongoose.model('company',companySchema);



    //exporting the model Company
    module.exports = { Company };