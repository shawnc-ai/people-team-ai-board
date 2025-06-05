// Project data
const projects = [
    {
        id: 1,
        name: "AI Interview Transcription",
        status: "In Progress",
        domain: "Recruiting",
        dsl: "DSL3",
        description: "AI-powered transcription and analysis of interview recordings",
        owner: "Recruiting Tech",
        hoursSaved: 120,
        ticketsEliminated: 45,
        processAutomation: 80,
        impact: "High",
        techStack: "Azure AI, Custom ML"
    },
    {
        id: 2,
        name: "People Chat Bot",
        status: "In Progress",
        domain: "HR Operations",
        dsl: "DSL2",
        description: "AI chatbot for employee HR inquiries and self-service",
        owner: "People Tech",
        hoursSaved: 200,
        ticketsEliminated: 150,
        processAutomation: 60,
        impact: "High",
        techStack: "GPT-4, Goose"
    },
    {
        id: 3,
        name: "AI Analytics",
        status: "In Progress",
        domain: "Analytics",
        dsl: "DSL2",
        description: "AI-driven insights for people analytics and reporting",
        owner: "People Analytics",
        hoursSaved: 80,
        ticketsEliminated: 25,
        processAutomation: 40,
        impact: "Medium",
        techStack: "Python, TensorFlow"
    },
    {
        id: 4,
        name: "Interview Scheduling",
        status: "Completed",
        domain: "Recruiting",
        dsl: "DSL4",
        description: "Automated interview scheduling and coordination",
        owner: "Recruiting Ops",
        hoursSaved: 160,
        ticketsEliminated: 200,
        processAutomation: 90,
        impact: "High",
        techStack: "Custom AI, Calendar API"
    },
    {
        id: 5,
        name: "AI Learning Content Creation",
        status: "In Progress",
        domain: "Learning",
        dsl: "DSL1",
        description: "AI-assisted creation of learning and development content",
        owner: "L&D Tech",
        hoursSaved: 100,
        ticketsEliminated: 30,
        processAutomation: 50,
        impact: "Medium",
        techStack: "GPT-4, Custom Tools"
    }
];

// Initialize data and charts when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    updateDashboardMetrics(projects);
    initializeCharts(projects);
});

// Render project cards
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projectGrid');
    grid.innerHTML = '';

    projectsToRender.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const statusClass = project.status.toLowerCase().replace(' ', '-');
        
        card.innerHTML = `
            <div class="card-header">
                <span class="status-badge status-${statusClass}">${project.status}</span>
                <span class="dsl-badge">${project.dsl}</span>
            </div>
            <h3>${project.name}</h3>
            <div class="project-meta">
                <p><strong>Domain:</strong> ${project.domain}</p>
                <p><strong>Owner:</strong> ${project.owner}</p>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>Impact Metrics:</strong></p>
                <ul>
                    <li>Hours Saved: ${project.hoursSaved}/month</li>
                    <li>Tickets Eliminated: ${project.ticketsEliminated}/month</li>
                    <li>Process Automation: ${project.processAutomation}%</li>
                </ul>
                <p><strong>Tech Stack:</strong> ${project.techStack}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Update dashboard metrics
function updateDashboardMetrics(projectsData) {
    const metrics = calculateMetrics(projectsData);
    
    document.getElementById('projectCount').textContent = projectsData.length;
    document.getElementById('hoursSaved').textContent = metrics.totalHoursSaved;
    document.getElementById('ticketsEliminated').textContent = metrics.totalTicketsEliminated;
    document.getElementById('processAutomation').textContent = `${metrics.avgProcessAutomation}%`;
}

// Calculate metrics
function calculateMetrics(projectsData) {
    return {
        totalHoursSaved: projectsData.reduce((sum, p) => sum + p.hoursSaved, 0),
        totalTicketsEliminated: projectsData.reduce((sum, p) => sum + p.ticketsEliminated, 0),
        avgProcessAutomation: Math.round(
            projectsData.reduce((sum, p) => sum + p.processAutomation, 0) / projectsData.length
        )
    };
}

// Initialize charts
function initializeCharts(projectsData) {
    // Status Chart
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    const statusData = getStatusDistribution(projectsData);
    
    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusData),
            datasets: [{
                data: Object.values(statusData),
                backgroundColor: [
                    '#fce8b2',
                    '#dcfce7',
                    '#e5e7eb',
                    '#fee2e2'
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

    // DSL Chart
    const dslCtx = document.getElementById('dslChart').getContext('2d');
    const dslData = getDSLDistribution(projectsData);
    
    new Chart(dslCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(dslData),
            datasets: [{
                label: 'Projects',
                data: Object.values(dslData),
                backgroundColor: '#1a73e8'
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

    // Domain Chart
    const domainCtx = document.getElementById('domainChart').getContext('2d');
    const domainData = getDomainDistribution(projectsData);
    
    new Chart(domainCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(domainData),
            datasets: [{
                data: Object.values(domainData),
                backgroundColor: [
                    '#1a73e8',
                    '#34a853',
                    '#fbbc04',
                    '#ea4335',
                    '#46bdc6'
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

// Get status distribution
function getStatusDistribution(projectsData) {
    const distribution = {};
    projectsData.forEach(project => {
        distribution[project.status] = (distribution[project.status] || 0) + 1;
    });
    return distribution;
}

// Get DSL distribution
function getDSLDistribution(projectsData) {
    const distribution = {};
    projectsData.forEach(project => {
        distribution[project.dsl] = (distribution[project.dsl] || 0) + 1;
    });
    return distribution;
}

// Get domain distribution
function getDomainDistribution(projectsData) {
    const distribution = {};
    projectsData.forEach(project => {
        distribution[project.domain] = (distribution[project.domain] || 0) + 1;
    });
    return distribution;
}

// Filter projects
function filterProjects() {
    const statusFilter = document.getElementById('statusFilter').value;
    const domainFilter = document.getElementById('domainFilter').value;
    const dslFilter = document.getElementById('dslFilter').value;

    const filteredProjects = projects.filter(project => {
        const statusMatch = !statusFilter || project.status === statusFilter;
        const domainMatch = !domainFilter || project.domain === domainFilter;
        const dslMatch = !dslFilter || project.dsl === dslFilter;
        return statusMatch && domainMatch && dslMatch;
    });

    renderProjects(filteredProjects);
    updateDashboardMetrics(filteredProjects);
    initializeCharts(filteredProjects);
}
