var mongoose = require('mongoose');

var Work = mongoose.Schema({

    username: { type: String, required: true },
    title: {type:String,required:true},
    URL:String

})

var Project = mongoose.model("project", Work);

module.exports = Project;
