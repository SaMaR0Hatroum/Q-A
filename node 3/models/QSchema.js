const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Question = new Schema({
 title:{
     type:String,
     required:[true, 'please write a  title here!'],
     minlength:[2, 'The title should  be 2 characters !']

    
 },
Question:{
   type:String,
     required:[true, 'please write an Quotation here!'],
     minlength:[5, 'The  Quotation should be 5 characters !']
 },


 createdAt:{
   type:Date,
   default: Date.now
 },

 answers: [{
   type: Schema.Types.ObjectId,
   ref: "ouranswer"
 }]
 
});


const Ask = mongoose.model('ourQuestion',Question);
module.exports = Ask;
