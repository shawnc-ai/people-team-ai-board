// [Previous JavaScript code remains the same until modal functions]

// Modal Functions
function openModal() {
    document.getElementById('addProjectModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addProjectModal').style.display = 'none';
    document.getElementById('addProjectForm').reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addProjectModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Handle form submission
document.getElementById('addProjectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newProject = {
        name: document.getElementById('projectName').value,
        status: document.getElementById('projectStatus').value,
        domain: document.getElementById('projectDomain').value,
        dsl: document.getElementById('projectDSL').value,
        owner: document.getElementById('projectOwner').value,
        team: document.getElementById('projectTeam').value,
        description: document.getElementById('projectDescription').value,
        hoursSaved: parseInt(document.getElementById('hoursSaved').value) || 0,
        ticketsEliminated: parseInt(document.getElementById('ticketsEliminated').value) || 0,
        processAutomation: parseInt(document.getElementById('processAutomation').value) || 0,
        techStack: document.getElementById('techStack').value,
        id: Date.now() // Generate unique ID
    };

    // Add to projects array
    projects.unshift(newProject);

    // Save to localStorage
    localStorage.setItem('aiProjects', JSON.stringify(projects));

    // Update display
    renderProjects(projects);
    updateDashboard(projects);

    // Close modal and reset form
    closeModal();

    // Show success message
    showSuccess('Project added successfully!');
});

// Load saved projects from localStorage
function loadSavedProjects() {
    const saved = localStorage.getItem('aiProjects');
    if (saved) {
        projects = JSON.parse(saved);
        renderProjects(projects);
        updateDashboard(projects);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedProjects();
});

// [Rest of the previous JavaScript code remains the same]
