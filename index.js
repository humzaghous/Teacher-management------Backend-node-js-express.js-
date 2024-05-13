const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Create Express app
const app = express();
app.use(express.json());

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'hamza',
    username: 'postgres',
    password: 'hamzA'
  });


// Define Sequelize models
const Teacher = sequelize.define('Teacher', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Section = sequelize.define('Section', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Subject = sequelize.define('Subject', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Question = sequelize.define('Question', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Quiz = sequelize.define('Quiz', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const StudentAnswer = sequelize.define('StudentAnswer', {
    student_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

// Define associations
Teacher.hasMany(Section);
Section.belongsTo(Teacher);

Section.hasMany(Subject);
Subject.belongsTo(Section);

Quiz.belongsTo(Section);
Section.hasMany(Quiz);

Question.belongsTo(Quiz);
Quiz.hasMany(Question);

StudentAnswer.belongsTo(Question);
Question.hasMany(StudentAnswer);

// Sync models with database
sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

// Controllers

// Teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        await teacher.update(req.body);
        res.json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        await teacher.destroy();
        res.json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Teachers
app.get('/teachers', getTeachers);
app.post('/teachers', createTeacher);
app.put('/teachers/:id', updateTeacher);
app.delete('/teachers/:id', deleteTeacher);

// Subjects
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        await subject.update(req.body);
        res.json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        await subject.destroy();
        res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Subjects
app.get('/subjects', getSubjects);
app.post('/subjects', createSubject);
app.put('/subjects/:id', updateSubject);
app.delete('/subjects/:id', deleteSubject);


// Sections
const getSections = async (req, res) => {
    try {
        const sections = await Section.findAll();
        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSection = async (req, res) => {
    try {
        const section = await Section.create(req.body);
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateSection = async (req, res) => {
    try {
        const section = await Section.findByPk(req.params.id);
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        await section.update(req.body);
        res.json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSection = async (req, res) => {
    try {
        const section = await Section.findByPk(req.params.id);
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        await section.destroy();
        res.json({ message: 'Section deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Sections
app.get('/sections', getSections);
app.post('/sections', createSection);
app.put('/sections/:id', updateSection);
app.delete('/sections/:id', deleteSection);



//Questions

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        await question.update(req.body);
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        await question.destroy();
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Questions
app.get('/questions', getQuestions);
app.post('/questions', createQuestion);
app.put('/questions/:id', updateQuestion);
app.delete('/questions/:id', deleteQuestion);

//Quizzes

const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.findAll();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        await quiz.update(req.body);
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        await quiz.destroy();
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Quizzes
app.get('/quizzes', getQuizzes);
app.post('/quizzes', createQuiz);
app.put('/quizzes/:id', updateQuiz);
app.delete('/quizzes/:id', deleteQuiz);


//Student Answers

const getStudentAnswers = async (req, res) => {

    try {
        const studentAnswers = await StudentAnswer.findAll();
        res.json(studentAnswers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createStudentAnswer = async (req, res) => {
    try {
        const studentAnswer = await StudentAnswer.create(req.body);
        res.status(201).json(studentAnswer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateStudentAnswer = async (req, res) => {
    try {
        const studentAnswer = await StudentAnswer.findByPk(req.params.id);
        if (!studentAnswer) {
            return res.status(404).json({ message: 'Student Answer not found' });
        }
        await studentAnswer.update(req.body);
        res.json(studentAnswer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteStudentAnswer = async (req, res) => {
    try {
        const studentAnswer = await StudentAnswer.findByPk(req.params.id);
        if (!studentAnswer) {
            return res.status(404).json({ message: 'Student Answer not found' });
        }
        await studentAnswer.destroy();
        res.json({ message: 'Student Answer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Student Answers
app.get('/studentanswers', getStudentAnswers);
app.post('/studentanswers', createStudentAnswer);
app.put('/studentanswers/:id', updateStudentAnswer);
app.delete('/studentanswers/:id', deleteStudentAnswer);

// Express.js Routes


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
