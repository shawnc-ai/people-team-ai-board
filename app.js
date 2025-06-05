// Project data with new projects and issue links
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
        techStack: "Azure AI, Custom ML",
        issueNumber: 1 // Replace with actual issue number
    },
    {
        id: 2,
        name: "AI Companion",
        status: "In Progress",
        domain: "HR Operations",
        dsl: "DSL2",
        description: "AI assistant for employee support and HR processes",
        owner: "People Tech",
        hoursSaved: 200,
        ticketsEliminated: 150,
        processAutomation: 60,
        impact: "High",
        techStack: "GPT-4, Goose",
        issueNumber: 2 // Replace with actual issue number
    },
    {
        id: 3,
        name: "Interview Scheduling",
        status: "Completed",
        domain: "Recruiting",
        dsl: "DSL4",
        description: "Automated interview coordination and scheduling",
        owner: "Recruiting Ops",
        hoursSaved: 160,
        ticketsEliminated: 200,
        processAutomation: 90,
        impact: "High",
        techStack: "Custom AI, Calendar API",
        issueNumber: 3 // Replace with actual issue number
    },
    {
        id: 4,
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
        techStack: "Python, TensorFlow",
        issueNumber: 4 // Replace with actual issue number
    },
    {
        id: 5,
        name: "Learning Content Creation",
        status: "In Progress",
        domain: "Learning",
        dsl: "DSL1",
        description: "AI-assisted creation of learning and development content",
        owner: "L&D Tech",
        hoursSaved: 100,
        ticketsEliminated: 30,
        processAutomation: 50,
        impact: "Medium",
        techStack: "GPT-4, Custom Tools",
        issueNumber: 5 // Replace with actual issue number
    }
];

// Initialize data and charts when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    updateDashboardMetrics(projects);
    initializeCharts(projects);
});

// Updated render function with clickable project titles
function renderProjects(projectsData) {
    const projectGrid = document.getElementById('projectGrid');
    projectGrid.innerHTML = '';

    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const statusClass = project.status.toLowerCase().replace(' ', '-');
        
        // Create issue URL
        const issueUrl = `https://github.com/shawnc-ai/people-team-ai-board/issues/${project.issueNumber}`;
        
        card.innerHTML = `
            <div class="card-header">
                <span class="status-badge status-${statusClass}">${project.status}</span>
                <span class="dsl-badge">${project.dsl}</span>
            </div>
            <a href="${issueUrl}" class="project-title" target="_blank">
                ${project.name}
                <i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-left: 4px;"></i>
            </a>
            <div class="project-meta">
                <p><strong>Domain:</strong> ${project.domain}</p>
                <p><strong>Owner:</strong> ${project.owner}</p>
                <p style="font-size: 0.85rem;">${project.description}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem;">
                    <div>
                        <strong>Hours Saved:</strong><br>
                        ${project.hoursSaved}/month
                    </div>
                    <div>
                        <strong>Tickets:</strong><br>
                        ${project.ticketsEliminated}/month
                    </div>
                </div>
                <div style="margin-top: 0.5rem;">
                    <strong>Automation:</strong> ${project.processAutomation}%
                </div>
                <div style="margin-top: 0.5rem;">
                    <strong>Tech:</strong> ${project.techStack}
                </div>
            </div>
        `;
        
        projectGrid.appendChild(card);
    });
}

// Rest of the JavaScript remains the same
