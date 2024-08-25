// Placeholder data
let teachers = [
    { name: "John Doe", email: "john@example.com", phone: "123-456-7890", subject: "Mathematics" },
    { name: "Jane Smith", email: "jane@example.com", phone: "098-765-4321", subject: "English" }
];

let students = [
    { name: "Alice Johnson", email: "alice@example.com", phone: "111-222-3333", grade: "10th" },
    { name: "Bob Williams", email: "bob@example.com", phone: "444-555-6666", grade: "11th" }
];

let users = [
    { username: "admin1", email: "admin1@example.com", role: "Admin" },
    { username: "teacher1", email: "teacher1@example.com", role: "Teacher" }
];

let exams = [
    { name: "Midterm Math", date: "2024-05-15", time: "09:00", subject: "Mathematics", grade: "10th" },
    { name: "Final English", date: "2024-06-20", time: "10:30", subject: "English", grade: "11th" }
];

let courses = [
    { name: "Advanced Mathematics", code: "MATH301", instructor: "John Doe", credits: 4 },
    { name: "English Literature", code: "ENG201", instructor: "Jane Smith", credits: 3 }
];

let attendance = [
    { date: "2024-05-01", class: "10th", present: 25, absent: 2 },
    { date: "2024-05-02", class: "11th", present: 22, absent: 3 }
];

// Function to populate table with data
function populateTable(tableId, data, keys) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    data.forEach((item, index) => {
        const row = tbody.insertRow();
        keys.forEach(key => {
            const cell = row.insertCell();
            cell.textContent = item[key];
        });
        const actionsCell = row.insertCell();
        actionsCell.innerHTML = `
            <button onclick="editItem('${tableId}', ${index})"><i class="fas fa-edit"></i></button>
            <button onclick="deleteItem('${tableId}', ${index})"><i class="fas fa-trash"></i></button>
        `;
    });
}

// Function to handle form submissions
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    switch (form.id) {
        case 'teacher-form':
            teachers.push(data);
            populateTable('teachers-table', teachers, ['name', 'email', 'phone', 'subject']);
            break;
        case 'student-form':
            students.push(data);
            populateTable('students-table', students, ['name', 'email', 'phone', 'grade']);
            break;
        case 'user-form':
            users.push(data);
            populateTable('users-table', users, ['username', 'email', 'role']);
            break;
        case 'exam-form':
            exams.push(data);
            populateTable('exams-table', exams, ['name', 'date', 'time', 'subject', 'grade']);
            break;
        case 'course-form':
            courses.push(data);
            populateTable('courses-table', courses, ['name', 'code', 'instructor', 'credits']);
            break;
        case 'attendance-form':
            // Simplified attendance submission
            const present = document.querySelectorAll('input[name="attendance"]:checked').length;
            const absent = document.querySelectorAll('input[name="attendance"]').length - present;
            attendance.push({ date: data.date, class: data.class, present, absent });
            populateTable('attendance-table', attendance, ['date', 'class', 'present', 'absent']);
            break;
    }

    form.reset();
    updateDashboard();
}

// Function to edit an item
function editItem(tableId, index) {
    // Implement edit functionality
    console.log(`Editing item ${index} in ${tableId}`);
}

// Function to delete an item
function deleteItem(tableId, index) {
    switch (tableId) {
        case 'teachers-table':
            teachers.splice(index, 1);
            populateTable('teachers-table', teachers, ['name', 'email', 'phone', 'subject']);
            break;
        case 'students-table':
            students.splice(index, 1);
            populateTable('students-table', students, ['name', 'email', 'phone', 'grade']);
            break;
        case 'users-table':
            users.splice(index, 1);
            populateTable('users-table', users, ['username', 'email', 'role']);
            break;
        case 'exams-table':
            exams.splice(index, 1);
            populateTable('exams-table', exams, ['name', 'date', 'time', 'subject', 'grade']);
            break;
        case 'courses-table':
            courses.splice(index, 1);
            populateTable('courses-table', courses, ['name', 'code', 'instructor', 'credits']);
            break;
        case 'attendance-table':
            attendance.splice(index, 1);
            populateTable('attendance-table', attendance, ['date', 'class', 'present', 'absent']);
            break;
    }
    updateDashboard();
}

// Function to update dashboard
function updateDashboard() {
    document.getElementById('total-students').textContent = students.length;
    document.getElementById('total-teachers').textContent = teachers.length;
    document.getElementById('upcoming-exams').textContent = exams.length;
    document.getElementById('active-courses').textContent = courses.length;
}

// Function to create charts
function createCharts() {
    // Student Performance Chart
    new Chart(document.getElementById('student-performance-chart'), {
        type: 'bar',
        data: {
            labels: ['Math', 'English', 'Science', 'History'],
            datasets: [{
                label: 'Average Score',
                data: [75, 82, 78, 85],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        }
    });

    // Attendance Overview Chart
    new Chart(document.getElementById('attendance-overview-chart'), {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [90, 10],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }]
        }
    });

    // Course Enrollment Chart
    new Chart(document.getElementById('course-enrollment-chart'), {
        type: 'doughnut',
        data: {
            labels: ['Mathematics', 'English', 'Science', 'History'],
            datasets: [{
                data: [30, 25, 20, 15],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)']
            }]
        }
    });

    // Exam Results Chart
    new Chart(document.getElementById('exam-results-chart'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Average Score',
                data: [65, 70, 75, 72, 78],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Populate tables
    populateTable('teachers-table', teachers, ['name', 'email', 'phone', 'subject']);
    populateTable('students-table', students, ['name', 'email', 'phone', 'grade']);
    populateTable('users-table', users, ['username', 'email', 'role']);
    populateTable('exams-table', exams, ['name', 'date', 'time', 'subject', 'grade']);
    populateTable('courses-table', courses, ['name', 'code', 'instructor', 'credits']);
    populateTable('attendance-table', attendance, ['date', 'class', 'present', 'absent']);

    // Add event listeners to forms
    document.getElementById('teacher-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('student-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('user-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('exam-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('course-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('attendance-form').addEventListener('submit', handleFormSubmit);

    // Update dashboard
    updateDashboard();

    // Create charts
    createCharts();
});
