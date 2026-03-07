import type { Project } from './types';
import './style.css';


const allProjects: Project[] = [];

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
    app.innerHTML = `
    <div class="card">
      <h1>TS Project List 📋</h1>
      <div class="controls" style="margin-bottom: 20px; display: flex; gap: 10px;">
    <input type="text" id="search-input" placeholder="Search projects..." style="padding: 8px; flex: 1; border-radius: 5px; border: 1px solid #ccc;">
    
    <select id="filter-select" style="padding: 8px; border-radius: 5px;">
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="in-progress">In Progress</option>
    </select>
</div>
      <button id="load-btn" style="background-color: #646cff; color: white; padding: 10px; cursor: pointer; border-radius: 8px; border: none;">
          Fetch New Project 🎲
      </button>
      
      <div id="projects-container"></div>
    </div>
    `;

    const loadBtn = document.querySelector('#load-btn');
    loadBtn?.addEventListener('click', fetchRemoteProject);
    const searchInput = document.querySelector('#search-input');
const filterSelect = document.querySelector('#filter-select');


searchInput?.addEventListener('input', renderProjectsList);

filterSelect?.addEventListener('change', renderProjectsList);
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
    const searchTerm = (document.querySelector('#search-input') as HTMLInputElement)?.value.toLowerCase() || "";
    const filterValue = (document.querySelector('#filter-select') as HTMLSelectElement)?.value || "all";
    if (!container) return;

    container.innerHTML = "";
const filteredProjects = allProjects.filter(proj => {
        const matchesSearch = proj.title.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === "all" || proj.status === filterValue;
        
        return matchesSearch && matchesFilter; // هر دو شرط باید درست باشن
    });
    filteredProjects.forEach((proj, index) => {
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
   
    const projectIndex = allProjects.findIndex(p => p.title === proj.title);
    
    if (projectIndex !== -1) {
        allProjects.splice(projectIndex, 1);
        renderProjectsList(); }
});
    })}