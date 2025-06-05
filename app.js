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
        techStack: "Azure AI, Custom ML",
        videoUrl: "https://www.youtube.com/embed/DEMO_VIDEO_ID_1",
        videoDescription: "Demo of interview transcription and analysis features"
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
        techStack: "GPT-4, Goose",
        videoUrl: "https://www.youtube.com/embed/DEMO_VIDEO_ID_2",
        videoDescription: "Live demo of the HR chatbot in action"
    },
    // ... [Previous projects remain the same, add videoUrl and videoDescription as needed]
];

// Initialize data and charts when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    renderVideos(projects);
    updateDashboardMetrics(projects);
    initializeCharts(projects);
});

// Render videos
function renderVideos(projectsData) {
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.innerHTML = '';

    projectsData.filter(project => project.videoUrl).forEach(project => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-container" onclick="openVideoModal('${project.videoUrl}')">
                <iframe
                    src="${project.videoUrl}"
                    title="${project.name}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            <div class="video-info">
                <h3>${project.name}</h3>
                <p>${project.videoDescription}</p>
            </div>
        `;
        videoGrid.appendChild(videoCard);
    });
}

// Video modal functions
function openVideoModal(videoUrl) {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('videoModalContent');
    
    modalContent.innerHTML = `
        <div class="video-container">
            <iframe
                src="${videoUrl}?autoplay=1"
                title="Project Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalContent = document.getElementById('videoModalContent');
    modalContent.innerHTML = '';
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeVideoModal();
    }
}

// [Rest of the previous JavaScript remains the same]
