// Initialize data
let projects = [];

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initializeCharts();
    updateMetrics();
});

// Load projects from localStorage or API
function loadProjects() {
    // In a real implementation, this would fetch from an API
    projects = JSON.parse(localStorage.getItem('projects')) || [];
    renderProjects();
}

// Render projects to grid
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    const filteredProjects = filterProjects();

    filteredProjects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });

    updateMetrics();
    updateCharts();
}

// Create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <span class="status-badge status-${project.status}">${formatStatus(project.status)}</span>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-metrics">
            <div>Hours Saved: ${project.hoursSaved}/month</div>
            <div>Tickets Eliminated: ${project.ticketsEliminated}/month</div>
            <div>Process Automation: ${project.processAutomation}%</div>
        </div>
        <div class="project-domain">
            Domain: ${formatDomain(project.domain)}
        </div>
        <button onclick="editProject('${project.id}')" class="edit-btn">
            <i class="fas fa-edit"></i> Edit
        </button>
    `;
    return card;
}

// Update summary metrics
function updateMetrics() {
    const metrics = calculateMetrics();
    
    document.getElementById('totalProjects').textContent = metrics.totalProjects;
    document.getElementById('hoursSaved').textContent = metrics.totalHoursSaved;
    document.getElementById('ticketsEliminated').textContent = metrics.totalTicketsEliminated;
    document.getElementById('processAutomation').textContent = `${metrics.avgProcessAutomation}%`;
}

// Calculate metrics
function calculateMetrics() {
    return {
        totalProjects: projects.length,
        totalHoursSaved: projects.reduce((sum, p) => sum + (p.hoursSaved || 0), 0),
        totalTicketsEliminated: projects.reduce((sum, p) => sum + (p.ticketsEliminated || 0), 0),
        avgProcessAutomation: Math.round(
            projects.reduce((sum, p) => sum + (p.processAutomation || 0), 0) / projects.length
        )
    };
}

// Initialize charts
function initializeCharts() {
    // Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'doughnut',
        data: getStatusChartData(),
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
    new Chart(domainCtx, {
        type: 'bar',
        data: getDomainChartData(),
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Filter projects
function filterProjects() {
    const statusFilter = document.getElementById('statusFilter').value;
    const domainFilter = document.getElementById('domainFilter').value;

    return projects.filter(project => {
        const statusMatch = !statusFilter || project.status === statusFilter;
        const domainMatch = !domainFilter || project.domain === domainFilter;
        return statusMatch && domainMatch;
    });
}

// Modal handling
function showAddProjectModal() {
    document.getElementById('projectModal').style.display = 'block';
}

function hideProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Form handling
document.getElementById('projectForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const project = {
        id: Date.now().toString(),
        name: formData.get('name'),
        domain: formData.get('domain'),
        status: formData.get('status'),
        description: formData.get('description'),
        hoursSaved: parseInt(formData.get('hoursSaved')) || 0,
        ticketsEliminated: parseInt(formData.get('ticketsEliminated')) || 0,
        processAutomation: parseInt(formData.get('processAutomation')) || 0
    };

    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    hideProjectModal();
    renderProjects();
});

// Utility functions
function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatDomain(domain) {
    return domain.split('-').map(word => 
        word.toUpperCase()
    ).join('/');
}
