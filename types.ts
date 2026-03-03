
interface Project {
    title: string;
    deadline: string;
    status: "backlog" | "in-progress" | "done";
}

interface User {
    readonly id: number;
    name: string;
    isAdmin: boolean;
    email?: string;
    projects: Project[]; 
}


const MyNewUser: User = {
    id: 1,
    name: "Taraneh",
    isAdmin: true,
    projects: [
        {   title: "Learn TS", 
            deadline: "2024", 
           status: "in-progress" }
    ]
};
function getPendingProjects(projects: Project[]): Project[] {

    return projects.filter(project => 
    project.status === "backlog" || project.status === "in-progress"
);
}

const pending = getPendingProjects(MyNewUser.projects);
console.log("Pending Projects:", pending);
