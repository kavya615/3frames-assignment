const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const students = [];

// GET API to fetch all students
app.get('/students', (req, res) => {
    if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
    }
    res.json(students);
});

// POST API to add a student
app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).json({ message: "Student added successfully", student });
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < students.length) {
        students.splice(id, 1);
        return res.json({ message: "Student deleted successfully" });
    }
    res.status(404).json({ message: "Student not found" });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
