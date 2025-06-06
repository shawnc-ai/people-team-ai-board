// Initialize event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved projects and initialize dashboard
    loadSavedProjects();
    
    // Modal event listeners
    const addButton = document.getElementById('addProjectBtn');
    const closeButton = document.getElementById('closeModalBtn');
    const cancelButton = document.getElementById('cancelBtn');
    const modal = document.getElementById('addProjectModal');

    // Add Project button click handler
    addButton.addEventListener('click', openModal);

    // Close button click handler
    closeButton.addEventListener('click', closeModal);

    // Cancel button click handler
    cancelButton.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form submission handler
    document.getElementById('addProjectForm').addEventListener('submit', handleFormSubmit);
});

// Project data
let projects = [
    {
        id: 1,
        name: "AI Interview Transcription",
        status: "In Progress",
        domain: "Recruiting",
        dsl: "DSL3",
        category: "Automation Operational Work",
        description: "AI-powered transcription and analysis of interview recordings",
        owner: "Sarah Johnson",
        team: "Recruiting Tech",
        hoursSaved: 120,
        ticketsEliminated: 45,
        processAutomation: 80,
        impact: "High",
        techStack: "Azure AI, Custom ML",
        key_metrics: "95% transcription accuracy, 60% faster interview processing"
    },
    {
        id: 2,
        name: "AI Assistant",
        status: "In Progress",
        domain: "ESS/MSS",
        dsl: "DSL2",
        category: "Enable or Improve Self Service",
        description: "AI-powered assistant for employee and manager self-service",
        owner: "Michael Chen",
        team: "People Tech",
        hoursSaved: 200,
        ticketsEliminated: 150,
        processAutomation: 60,
        impact: "High",
        techStack: "GPT-4, Goose",
        key_metrics: "75% reduction in basic HR inquiries"
    },
    {
        id: 3,
        name: "AI Analytics",
        status: "In Progress",
        domain: "Analytics",
        dsl: "DSL2",
        category: "Create Personalized Experiences",
        description: "AI-driven insights for people analytics and reporting",
        owner: "Alex Rivera",
        team: "People Analytics",
        hoursSaved: 80,
        ticketsEliminated: 25,
        processAutomation: 40,
        impact: "Medium",
        techStack: "Python, TensorFlow",
        key_metrics: "40% faster report generation"
    },
    {
        id: 4,
        name: "Interview Scheduling",
        status: "Completed",
        domain: "Recruiting",
        dsl: "DSL4",
        category: "Automation Operational Work",
        description: "Automated interview coordination and scheduling",
        owner: "Emily Wong",
        team: "Recruiting Ops",
        hoursSaved: 160,
        ticketsEliminated: 200,
        processAutomation: 90,
        impact: "High",
        techStack: "Custom AI, Calendar API",
        key_metrics: "85% reduction in scheduling time"
    },
    {
        id: 5,
        name: "Learning Content Creation",
        status: "In Progress",
        domain: "Knowledge Management",
        dsl: "DSL1",
        category: "Create Personalized Experiences",
        description: "AI-assisted creation of learning and development content",
        owner: "David Kim",
        team: "L&D Tech",
        hoursSaved: 100,
        ticketsEliminated: 30,
        processAutomation: 50,
        impact: "Medium",
        techStack: "GPT-4, Custom Tools",
        key_metrics: "60% faster content creation"
    }
];

// Modal Functions
function openModal() {
    const modal = document.getElementById('addProjectModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.getElementById('modalTitle').textContent = 'Add New AI Project';
    document.querySelector('.submit-btn').textContent = 'Add Project';
}

function closeModal() {
    const modal = document.getElementById('addProjectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('addProjectForm').reset();
    document.getElementById('addProjectForm').removeAttribute('data-edit-id');
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const isEdit = form.dataset.editId;
    
    const projectData = {
        id: isEdit ? parseInt(form.dataset.editId) : Date.now(),
        name: document.getElementById('projectName').value,
        status: document.getElementById('projectStatus').value,
        domain: document.getElementById('projectDomain').value,
        dsl: document.getElementById('projectDSL').value,
        category: document.getElementById('projectCategory').value,
        owner: document.getElementById('projectOwner').value,
        team: document.getElementById('projectTeam').value,
        description: document.getElementById('projectDescription').value,
        hoursSaved: parseInt(document.getElementById('hoursSaved').value) || 0,
        ticketsEliminated: parseInt(document.getElementById('ticketsEliminated').value) || 0,
        processAutomation: parseInt(document.getElementById('processAutomation').value) || 0,
        techStack: document.getElementById('techStack').value,
        key_metrics: document.getElementById('keyMetrics').value
    };

    if (isEdit) {
        // Update existing project
        const index = projects.findIndex(p => p.id === parseInt(form.dataset.editId));
        if (index !== -1) {
            projects[index] = projectData;
        }
    } else {
        // Add new project
        projects.unshift(projectData);
    }

    // Save to localStorage
    localStorage.setItem('aiProjects', JSON.stringify(projects));

    // Update display
    renderProjects(projects);
    updateDashboardMetrics(projects);
    initializeCharts(projects);

    // Close modal and reset form
    closeModal();

    // Show success message
    showSuccess(isEdit ? 'Project updated successfully!' : 'Project added successfully!');
}

// Edit project function
function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // Update modal title
    document.getElementById('modalTitle').textContent = 'Edit AI Project';
    document.querySelector('.submit-btn').textContent = 'Update Project';

    // Populate form with project data
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectStatus').value = project.status;
    document.getElementById('projectDomain').value = project.domain;
    document.getElementById('projectDSL').value = project.dsl;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectOwner').value = project.owner;
    document.getElementById('projectTeam').value = project.team;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('hoursSaved').value = project.hoursSaved;
    document.getElementById('ticketsEliminated').value = project.ticketsEliminated;
    document.getElementById('processAutomation').value = project.processAutomation;
    document.getElementById('techStack').value = project.techStack;
    document.getElementById('keyMetrics').value = project.key_metrics;

    // Add project ID to form for update
    document.getElementById('addProjectForm').dataset.editId = projectId;

    // Open modal
    openModal();
}

// Delete project function
function deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== projectId);
        localStorage.setItem('aiProjects', JSON.stringify(projects));
        renderProjects(projects);
        updateDashboardMetrics(projects);
        initializeCharts(projects);
        showSuccess('Project deleted successfully!');
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

function renderProjects(projectsData) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const statusClass = project.status.toLowerCase().replace(' ', '-');
        
        card.innerHTML = `
            <div class="card-header">
                <div class="badge-container">
                    <span class="status-badge status-${statusClass}">${project.status}</span>
                    <span class="dsl-badge">${project.dsl}</span>
                </div>
                <div class="card-actions">
                    <button onclick="editProject(${project.id})" class="edit-btn" title="Edit Project">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProject(${project.id})" class="delete-btn" title="Delete Project">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <h3 class="project-title" onclick="editProject(${project.id})">${project.name}</h3>
            <div class="project-meta">
                <p><strong>Domain:</strong> ${project.domain}</p>
                <p><strong>Category:</strong> ${project.category}</p>
                <p><strong>Owner:</strong> ${project.owner}</p>
                <p><strong>Team:</strong> ${project.team}</p>
                <p>${project.description}</p>
                
                <div class="metrics-grid">
                    <div class="metric-item">
                        <div class="value">${project.hoursSaved}</div>
                        <div class="label">Hours Saved/mo</div>
                    </div>
                    <div class="metric-item">
                        <div class="value">${project.ticketsEliminated}</div>
                        <div class="label">Tickets Eliminated/mo</div>
                    </div>
                    <div class="metric-item">
                        <div class="value">${project.processAutomation}%</div>
                        <div class="label">Process Automated</div>
                    </div>
                </div>
                
                <p><strong>Tech Stack:</strong> ${project.techStack}</p>
                <p><strong>Key Metrics:</strong> ${project.key_metrics}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function updateDashboardMetrics(projectsData) {
    document.getElementById('totalProjects').textContent = projectsData.length;
    
    const totalHours = projectsData.reduce((sum, p) => sum + p.hoursSaved, 0);
    document.getElementById('hoursSaved').textContent = totalHours.toLocaleString();
    
    const avgAutomation = Math.round(
        projectsData.reduce((sum, p) => sum + p.processAutomation, 0) / projectsData.length
    );
    document.getElementById('processesAutomated').textContent = `${avgAutomation}%`;

    // Category metrics
    const categoryData = {
        'Automation Operational Work': 0,
        'Enable or Improve Self Service': 0,
        'Create Personalized Experiences': 0
    };
    
    projectsData.forEach(p => {
        if (categoryData.hasOwnProperty(p.category)) {
            categoryData[p.category]++;
        }
    });

    document.getElementById('categoryMetrics').textContent = 
        Object.values(categoryData).reduce((sum, count) => sum + count, 0);
}

function initializeCharts(projectsData) {
    // Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    const statusData = {};
    projectsData.forEach(p => {
        statusData[p.status] = (statusData[p.status] || 0) + 1;
    });

    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusData),
            datasets: [{
                data: Object.values(statusData),
                backgroundColor: [
                    '#FEF3C7',
                    '#D1FAE5',
                    '#F3F4F6',
                    '#FEE2E2'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Domain Chart
    const domainCtx = document.getElementById('domainChart').getContext('2d');
    const domainData = {};
    projectsData.forEach(p => {
        domainData[p.domain] = (domainData[p.domain] || 0) + 1;
    });

    new Chart(domainCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(domainData),
            datasets: [{
                data: Object.values(domainData),
                backgroundColor: '#8B5CF6'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // DSL Chart
    const dslCtx = document.getElementById('dslChart').getContext('2d');
    const dslData = {};
    projectsData.forEach(p => {
        dslData[p.dsl] = (dslData[p.dsl] || 0) + 1;
    });

    new Chart(dslCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(dslData),
            datasets: [{
                data: Object.values(dslData),
                backgroundColor: [
                    '#E0E7FF',
                    '#C7D2FE',
                    '#A5B4FC',
                    '#818CF8'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryData = {
        'Automation Operational Work': 0,
        'Enable or Improve Self Service': 0,
        'Create Personalized Experiences': 0
    };
    
    projectsData.forEach(p => {
        if (categoryData.hasOwnProperty(p.category)) {
            categoryData[p.category]++;
        }
    });

    new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: [
                    '#60A5FA',
                    '#34D399',
                    '#F472B6'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function filterProjects() {
    const status = document.getElementById('statusFilter').value;
    const domain = document.getElementById('domainFilter').value;
    const dsl = document.getElementById('dslFilter').value;
    const category = document.getElementById('categoryFilter').value;

    const filteredProjects = projects.filter(project => {
        const statusMatch = !status || project.status === status;
        const domainMatch = !domain || project.domain === domain;
        const dslMatch = !dsl || project.dsl === dsl;
        const categoryMatch = !category || project.category === category;
        return statusMatch && domainMatch && dslMatch && categoryMatch;
    });

    renderProjects(filteredProjects);
    updateDashboardMetrics(filteredProjects);
    initializeCharts(filteredProjects);
}

// Load saved projects from localStorage
function loadSavedProjects() {
    const saved = localStorage.getItem('aiProjects');
    if (saved) {
        projects = JSON.parse(saved);
    }
    renderProjects(projects);
    updateDashboardMetrics(projects);
    initializeCharts(projects);
}
