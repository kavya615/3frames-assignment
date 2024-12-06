const studentForm = document.getElementById('studentForm');
const studentsTable = document.getElementById('studentsTable');

studentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const student = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    course: document.getElementById('course').value,
    dob: document.getElementById('dob').value,
  };

  await fetch('http://localhost:3000/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });

  studentForm.reset();
  loadStudents();
});

async function loadStudents() {
  const response = await fetch('http://localhost:3000/students');
  const students = await response.json();

  studentsTable.innerHTML = '';

  if (students.length === 0) {
    studentsTable.innerHTML = '<tr><td colspan="5">No students found</td></tr>';
    return;
  }

  students.forEach((student, index) => {
    const row = studentsTable.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${student.course}</td>
      <td>${student.dob}</td>
      <td><button onclick="deleteStudent(${index})">Delete</button></td>
    `;
  });
}

async function deleteStudent(index) {
  await fetch(`http://localhost:3000/students/${index}`, { method: 'DELETE' });
  loadStudents();
}

document.addEventListener('DOMContentLoaded', loadStudents);
