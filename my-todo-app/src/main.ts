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
        projectCard.className = "project-card";
        projectCard.style.borderBottom = "1px solid #eee";
        projectCard.style.padding = "10px";
        projectCard.style.display = "flex";
        projectCard.style.justifyContent = "space-between";
        projectCard.style.alignItems = "center";
        
        projectCard.innerHTML = `
            <div>
                <p><strong>#${allProjects.length - index}</strong>: ${proj.title}</p>
                <small style="color: ${proj.status === 'done' ? 'green' : 'orange'}">
                    Status: ${proj.status}
                </small>
            </div>
            <button class="delete-btn" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                Delete 🗑️
            </button>
        `;
        
       
        const deleteBtn = projectCard.querySelector('.delete-btn');
        
        
        deleteBtn?.addEventListener('click', () => {
           
            allProjects.splice(index, 1);
            
           
            renderProjectsList();
        });
        
        container.appendChild(projectCard);
    });
}

 