document.addEventListener('DOMContentLoaded', function() {
    const forms = {
        'teacher-form': 'teachers-table',
        'student-form': 'students-table',
        'user-form': 'users-table',
        'exam-form': 'exams-table'
    };

    for (const [formId, tableId] of Object.entries(forms)) {
        const form = document.getElementById(formId);
        const table = document.getElementById(tableId);

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
        });
    }
});

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
    }
}
