import type { User, Project, Box } from './types';
import './style.css';


const MyNewUser: User = {
    id: 1,
    name: "Taraneh",
    isAdmin: true,
    projects: []
};

const realProjectBox: Box<Project> = {
    content: { title: "Mastering TS", deadline: "2026", status: "backlog" }
};


function updateProjectStatus(project: Project, newStatus: "backlog" | "in-progress" | "done"): Project {
    return { ...project, status: newStatus };
}

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
    app.innerHTML = `
    <div class="card">
      <h1>TS Dashboard</h1>
      <p>👤 Name: <strong>${MyNewUser.name}</strong></p>
      <div class="project-info">
        <h3>Current Project:</h3>
        <p>${realProjectBox.content.title}</p>
        <p>Status: <span id="status-tag">${realProjectBox.content.status}</span></p>
        <button id="update-btn">Update Status</button>
      </div>
    </div>
    `;

    const btn = document.querySelector('#update-btn');
   
    const statusTag = document.querySelector('#status-tag') as HTMLElement;

    btn?.addEventListener('click', () => {
        const updated = updateProjectStatus(realProjectBox.content, "done");
        if (statusTag) {
            statusTag.textContent = updated.status;
            statusTag.style.backgroundColor = "#4CAF50";
            statusTag.style.color = "white";
        }
    });
}