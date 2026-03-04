import type { User, Project, Box } from './my-todo-app/src/types';

const MyNewUser: User = {
    id: 1,
    name: "Taraneh",
    isAdmin: true,
    projects: [
        { 
            title: "Learn TS", 
            deadline: "2026", 
            status: "in-progress" 
        }
    ]
};

const realProjectBox: Box<Project> = {
    content: {
        title: "Mastering TS",
        deadline: "2026-05-01",
        status: "backlog"
    }
};

function getPendingProjects(projects: Project[]): Project[] {
    return projects.filter(project => project.status !== "done");
}

console.log("User Name:", MyNewUser.name);
console.log("Box Content:", realProjectBox.content.title);


function updateProjectStatus(project: Project, newStatus: "backlog" | "in-progress" | "done"): Project {
    // ما می‌خواهیم یک کپی از پروژه بگیریم و فقط استاتوسش رو عوض کنیم
    return {
        ...project,        // یعنی تمام ویژگی‌های قبلی پروژه رو نگه دار
        status: newStatus  // اما وضعیت رو با وضعیت جدید جایگزین کن
    };
}

// تست تابع:
const myProject: Project = { title: "Learn TS", deadline: "2026", status: "backlog" };
const updated = updateProjectStatus(myProject, "in-progress");

console.log("Updated Project:", updated);