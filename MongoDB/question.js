const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
    answerChoice: { type: [String], required: true },
    answer: { type: [String] }, 
    note: { type: String } 
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
