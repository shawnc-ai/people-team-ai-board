// Project data remains the same

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
            <h3 style="margin: 0.5rem 0; font-size: 1.1rem;">${project.name}</h3>
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
            </div>
        `;
        
        projectGrid.appendChild(card);
    });
}

// Rest of the JavaScript remains the same
