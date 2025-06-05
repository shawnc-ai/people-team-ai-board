// Project data
const projects = [
    {
        id: 1,
        name: "AI Interview Transcription",
        status: "In Progress",
        domain: "Recruiting",
        dsl: "DSL3",
        description: "AI-powered transcription and analysis of interview recordings",
        dri: "Sarah Johnson",
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
        dri: "Michael Chen",
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
        description: "AI-driven insights for people analytics and reporting",
        dri: "Alex Rivera",
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
        description: "Automated interview coordination and scheduling",
        dri: "Emily Wong",
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
        description: "AI-assisted creation of learning and development content",
        dri: "David Kim",
        team: "L&D Tech",
        hoursSaved: 100,
        ticketsEliminated: 30,
        processAutomation: 50,
        impact: "Medium",
        techStack: "GPT-4, Custom Tools",
        key_metrics: "60% faster content creation"
    }
];

// Initialize data when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    updateDashboardMetrics(projects);
    initializeCharts(projects);
});

function renderProjects(projectsData) {
    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = '';

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
                <p><strong>Domain:</strong> <span class="domain-badge">${project.domain}</span></p>
                <p><strong>DRI:</strong> ${project.dri}</p>
                <p><strong>Team:</strong> ${project.team}</p>
                <p>${project.description}</p>
                <div class="metrics-grid">
                    <div class="metric-item">
                        <div class="metric-value">${project.hoursSaved}</div>
                        <div class="metric-label">Hours Saved/mo</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${project.ticketsEliminated}</div>
                        <div class="metric-label">Tickets Eliminated/mo</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${project.processAutomation}%</div>
                        <div class="metric-label">Process Automated</div>
                    </div>
                </div>
                <p><strong>Tech Stack:</strong> ${project.techStack}</p>
                <p><strong>Key Metrics:</strong> ${project.key_metrics}</p>
            </div>
        `;
        
        projectGrid.appendChild(card);
    });
}

// [Previous chart initialization and metrics update functions remain the same]
