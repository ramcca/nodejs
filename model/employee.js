const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
  name: { type: String, required: true,unique:true },
  projectId: { type: Number, required: true }
});

employeeSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Employee', employeeSchema);
