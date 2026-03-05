import type { User, Project, Box } from './types';
import './style.css';

// ۱. تعریف داده‌های اولیه
const MyNewUser: User = {
    id: 1,
    name: "Taraneh",
    isAdmin: true,
    projects: []
};

const realProjectBox: Box<Project> = {
    content: { title: "Mastering TS", deadline: "2026", status: "backlog" }
};

// ۲. تابع کمکی برای آپدیت وضعیت (منطق خالص)
//function updateProjectStatus(project: Project, newStatus: "backlog" | "in-progress" | "done"): Project {
   // return { ...project, status: newStatus };}

// ۳. مدیریت بخش نمایش (UI)
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

    // ۴. گوش به زنگ بودن برای کلیک دکمه
    const loadBtn = document.querySelector('#load-btn');
    loadBtn?.addEventListener('click', fetchRemoteProject);
}

// ۵. غول مرحله آخر: تابع گرفتن دیتا از اینترنت
async function fetchRemoteProject() {
    try {
        const titleElement = document.querySelector('#project-title');
        const statusTag = document.querySelector('#status-tag') as HTMLElement;

        if (titleElement) titleElement.textContent = "Loading...";

        // تولید ID تصادفی برای تنوع در پروژه‌ها
        const randomId = Math.floor(Math.random() * 200) + 1;
        
        // درخواست به سرور با استفاده از Backticks
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
        
        if (!response.ok) throw new Error("Network error!");
        
        const data = await response.json();

        // آپدیت کردن DOM با اطلاعات جدید
        if (titleElement && statusTag) {
            titleElement.textContent = data.title;
            
            // تبدیل دیتای بولین سرور به وضعیت‌های پروژه ما
            const newStatus = data.completed ? "done" : "in-progress";
            statusTag.textContent = newStatus;
            
            // تغییر رنگ هوشمند
            statusTag.style.backgroundColor = newStatus === "done" ? "#4CAF50" : "#FFA500";
        }

    } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
        const titleElement = document.querySelector('#project-title');
        if (titleElement) titleElement.textContent = "Failed to load project. Try again!";
    }
}