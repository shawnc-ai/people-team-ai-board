// Project data
const projects = [
    {
        id: 1,
        name: "AI Interview Transcription",
        status: "In Progress",
        domain: "Recruiting",
        dsl: "DSL3",
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
    // Add other projects here
];

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    updateDashboardMetrics(projects);
    initializeCharts(projects);
});

function renderProjects(projectsData) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const statusClass = project.status.toLowerCase().replace(' ', '-');
        
        card.innerHTML = `
            <div class="card-header">
                <span class="status-badge status-${statusClass}">${project.status}</span>
                <span class="dsl-badge">${project.dsl}</span>
            </div>
            <h3 class="project-title">${project.name}</h3>
            <div class="project-meta">
                <p><strong>Domain:</strong> ${project.domain}</p>
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
    // Update summary metrics
    document.getElementById('totalProjects').textContent = projectsData.length;
    
    const totalHours = projectsData.reduce((sum, p) => sum + p.hoursSaved, 0);
    document.getElementById('hoursSaved').textContent = totalHours.toLocaleString();
    
    const avgAutomation = Math.round(
        projectsData.reduce((sum, p) => sum + p.processAutomation, 0) / projectsData.length
    );
    document.getElementById('processesAutomated').textContent = `${avgAutomation}%`;
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
}

function filterProjects() {
    const status = document.getElementById('statusFilter').value;
    const domain = document.getElementById('domainFilter').value;
    const dsl = document.getElementById('dslFilter').value;

    const filteredProjects = projects.filter(project => {
        const statusMatch = !status || project.status === status;
        const domainMatch = !domain || project.domain === domain;
        const dslMatch = !dsl || project.dsl === dsl;
        return statusMatch && domainMatch && dslMatch;
    });

    renderProjects(filteredProjects);
    updateDashboardMetrics(filteredProjects);
    initializeCharts(filteredProjects);
}
