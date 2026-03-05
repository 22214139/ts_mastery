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


const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
    app.innerHTML = `
    <div class="card">
      <h1>TS Dashboard</h1>
      <p>👤 User: <strong>${MyNewUser.name}</strong></p>
      
      <div class="project-info">
        <h3>Current Project:</h3>
        <p id="project-title">${realProjectBox.content.title}</p>
        <p>Status: <span id="status-tag" style="padding: 2px 8px; border-radius: 4px; color: white; background-color: #646cff;">
            ${realProjectBox.content.status}
        </span></p>
        
        <div style="margin-top: 20px;">
            <button id="load-btn" style="background-color: #646cff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">
                Load Random Project 🎲
            </button>
        </div>
      </div>
    </div>
    `;

    
    const loadBtn = document.querySelector('#load-btn');
    loadBtn?.addEventListener('click', fetchRemoteProject);
}


async function fetchRemoteProject() {
    try {
        const titleElement = document.querySelector('#project-title');
        const statusTag = document.querySelector('#status-tag') as HTMLElement;

        if (titleElement) titleElement.textContent = "Loading...";

        
        const randomId = Math.floor(Math.random() * 200) + 1;
        
       
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
        
        if (!response.ok) throw new Error("Network error!");
        
        const data = await response.json();

       
        if (titleElement && statusTag) {
            titleElement.textContent = data.title;
            
       
            const newStatus = data.completed ? "done" : "in-progress";
            statusTag.textContent = newStatus;
            
            
            statusTag.style.backgroundColor = newStatus === "done" ? "#4CAF50" : "#FFA500";
        }

    } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
        const titleElement = document.querySelector('#project-title');
        if (titleElement) titleElement.textContent = "Failed to load project. Try again!";
    }
}