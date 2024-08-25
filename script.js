document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainContent = document.getElementById('main-content');

    const pageContent = {
        dashboard: `
            <h2>Dashboard</h2>
            <div class="dashboard-cards">
                <div class="card">
                    <i class="fas fa-chalkboard-teacher"></i>
                    <h3>Teachers</h3>
                    <p id="teacher-count">0</p>
                </div>
                <div class="card">
                    <i class="fas fa-user-graduate"></i>
                    <h3>Students</h3>
                    <p id="student-count">0</p>
                </div>
                <div class="card">
                    <i class="fas fa-users"></i>
                    <h3>Users</h3>
                    <p id="user-count">0</p>
                </div>
                <div class="card">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Exams</h3>
                    <p id="exam-count">0</p>
                </div>
            </div>
        `,
        teachers: `
            <h2>Teacher Management</h2>
            <div class="content-wrapper">
                <form id="teacher-form">
                    <h3>Teacher Registration</h3>
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="tel" name="phone" placeholder="Phone Number">
                    <input type="text" name="subject" placeholder="Subject">
                    <button type="submit">Register Teacher</button>
                </form>
                <div class="datagrid">
                    <h3>Teachers List</h3>
                    <table id="teachers-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Subject</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        students: `
            <h2>Student Management</h2>
            <div class="content-wrapper">
                <form id="student-form">
                    <h3>Student Registration</h3>
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="tel" name="phone" placeholder="Phone Number">
                    <input type="text" name="grade" placeholder="Grade/Class">
                    <button type="submit">Register Student</button>
                </form>
                <div class="datagrid">
                    <h3>Students List</h3>
                    <table id="students-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Grade/Class</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        users: `
            <h2>User Management</h2>
            <div class="content-wrapper">
                <form id="user-form">
                    <h3>User Registration</h3>
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <select name="role" required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                    <button type="submit">Register User</button>
                </form>
                <div class="datagrid">
                    <h3>Users List</h3>
                    <table id="users-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        examinations: `
            <h2>Examinations</h2>
            <div class="content-wrapper">
                <form id="exam-form">
                    <h3>Schedule Examination</h3>
                    <input type="text" name="name" placeholder="Exam Name" required>
                    <input type="date" name="date" required>
                    <input type="time" name="time" required>
                    <input type="text" name="subject" placeholder="Subject">
                    <input type="text" name="grade" placeholder="Grade/Class">
                    <button type="submit">Schedule Exam</button>
                </form>
                <div class="datagrid">
                    <h3>Examination Schedule</h3>
                    <table id="exams-table">
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Subject</th>
                                <th>Grade/Class</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    };

    function loadPage(pageName) {
        mainContent.innerHTML = pageContent[pageName];
        setupEventListeners();
        updateDashboardCounts();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            loadPage(targetPage);
        });
    });

    function setupEventListeners() {
        const forms = {
            'teacher-form': 'teachers-table',
            'student-form': 'students-table',
            'user-form': 'users-table',
            'exam-form': 'exams-table'
        };

        for (const [formId, tableId] of Object.entries(forms)) {
            const form = document.getElementById(formId);
            const table = document.getElementById(tableId);

            if (form && table) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const newRow = table.insertRow(-1);

                    for (const value of formData.values()) {
                        const cell = newRow.insertCell();
                        cell.textContent = value;
                    }

                    const actionsCell = newRow.insertCell();
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.onclick = function() { editRow(this); };
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = function() { deleteRow(this); };
                    actionsCell.appendChild(editButton);
                    actionsCell.appendChild(deleteButton);

                    form.reset();
                    updateDashboardCounts();
                });
            }
        }
    }

    function editRow(button) {
        const row = button.parentNode.parentNode;
        const cells = row.cells;
        for (let i = 0; i < cells.length - 1; i++) {
            const cell = cells[i];
            const currentValue = cell.textContent;
            cell.innerHTML = `<input type="text" value="${currentValue}">`;
        }
        button.textContent = 'Save';
        button.onclick = function() { saveRow(this); };
    }

    function saveRow(button) {
        const row = button.parentNode.parentNode;
        const cells = row.cells;
        for (let i = 0; i < cells.length - 1; i++) {
            const cell = cells[i];
            const input = cell.firstChild;
            cell.textContent = input.value;
        }
        button.textContent = 'Edit';
        button.onclick = function() { editRow(this); };
    }

    function deleteRow(button) {
        if (confirm('Are you sure you want to delete this row?')) {
            const row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
            updateDashboardCounts();
        }
    }

    function updateDashboardCounts() {
        const teacherCount = document.getElementById('teacher-count');
        const studentCount = document.getElementById('student-count');
        const userCount = document.getElementById('user-count');
        const examCount = document.getElementById('exam-count');

        if (teacherCount) teacherCount.textContent = (document.getElementById('teachers-table')?.rows.length || 1) - 1;
        if (studentCount) studentCount.textContent = (document.getElementById('students-table')?.rows.length || 1) - 1;
        if (userCount) userCount.textContent = (document.getElementById('users-table')?.rows.length || 1) - 1;
        if (examCount) examCount.textContent = (document.getElementById('exams-table')?.rows.length || 1) - 1;
    }

    // Load the dashboard by default
    loadPage('dashboard');
});
