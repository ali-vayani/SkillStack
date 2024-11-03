const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./question.js');

const app = express();
const PORT = 3001;
const MONGO_URI = 'mongodb+srv://SkillStack:SkillStack@cluster0.eewtw.mongodb.net/skillstack';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connectedquestions to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


app.get('/data', async (req, res) => {
    console.log(req.query.id);
    try {
        const question = await Question.findOne({id: req.query.id});
        res.json(question)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: error.message });
    } finally {
        mongoose.disconnect();
    }
});

app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find({});
        

        console.log("All questions in the database:", questions);

        // Send the questions back in the response
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: error.message });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
