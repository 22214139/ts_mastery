
import type { User, Project, Box } from './types'; 

const MyNewUser: User = {
    id: 1,
    name: "Taraneh",
    isAdmin: true,
    projects: [
        { title: "Learn TS", deadline: "2026", status: "in-progress" }
    ]
};

const realProjectBox: Box<Project> = {
    content: {
        title: "Mastering TS",
        deadline: "2026-05-01",
        status: "backlog"
    }
};


function updateProjectStatus(project: Project, newStatus: "backlog" | "in-progress" | "done"): Project {
    return {
        ...project,      
        status: newStatus 
    };
}

console.log("User Name:", MyNewUser.name);
console.log("Updated Project:", updateProjectStatus(realProjectBox.content, "done"));
// انتخاب المان اصلی صفحه برای نمایش داده‌ها
const appDiv = document.querySelector<HTMLDivElement>('#app');

if (appDiv) {
    appDiv.innerHTML = `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
            <h1 style="color: #646cff;">Project Dashboard</h1>
            
            <section style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h2>User Profile</h2>
                <p><strong>Name:</strong> ${MyNewUser.name}</p>
                <p><strong>Admin Status:</strong> ${MyNewUser.isAdmin ? '✅ Active' : '❌ Inactive'}</p>
            </section>

            <section style="background: #eef2ff; padding: 15px; border-radius: 8px;">
                <h2>Current Box Content</h2>
                <p><strong>Project Title:</strong> ${realProjectBox.content.title}</p>
                <p><strong>Deadline:</strong> ${realProjectBox.content.deadline}</p>
                <p><strong>Status:</strong> 
                    <span style="background: #646cff; color: white; padding: 2px 8px; border-radius: 4px;">
                        ${realProjectBox.content.status}
                    </span>
                </p>
            </section>
        </div>
    `;
}