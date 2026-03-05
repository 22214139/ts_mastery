import type { Project } from './types';
import './style.css';


const allProjects: Project[] = [];

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
    app.innerHTML = `
    <div class="card">
      <h1>TS Project List 📋</h1>
      <button id="load-btn" style="background-color: #646cff; color: white; padding: 10px; cursor: pointer; border-radius: 8px; border: none;">
          Fetch New Project 🎲
      </button>
      
      <div id="projects-container"></div>
    </div>
    `;

    const loadBtn = document.querySelector('#load-btn');
    loadBtn?.addEventListener('click', fetchRemoteProject);
}

async function fetchRemoteProject() {
    try {
        const randomId = Math.floor(Math.random() * 200) + 1;
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
        const data = await response.json();

        const newProject: Project = {
            title: data.title,
            deadline: "2026",
            status: data.completed ? "done" : "in-progress"
        };

        allProjects.unshift(newProject);

        renderProjectsList();

    } catch (error) {
        console.error("Error:", error);
    }
}


function renderProjectsList() {
    const container = document.querySelector('#projects-container');
    if (!container) return;

 
    container.innerHTML = "";

   
    allProjects.forEach((proj, index) => {
        const projectCard = document.createElement('div');
        projectCard.style.borderBottom = "1px solid #eee";
        projectCard.style.padding = "10px 0";
        
        projectCard.innerHTML = `
            <p><strong>#${allProjects.length - index}</strong>: ${proj.title}</p>
            <small style="color: ${proj.status === 'done' ? 'green' : 'orange'}">
                Status: ${proj.status}
            </small>
        `;
        
        container.appendChild(projectCard);
    });
}
 