const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
 userName:{
     
 },
answer:{
   type:String,
   required:true,
    
 },
 createdAt:{
   type:Date,
   default: Date.now
 },
 question: {
  type: Schema.Types.ObjectId,
  ref: "ourQuestion"
 }
});

const Answer = mongoose.model('ouranswer',answerSchema);
module.exports = Answer;
