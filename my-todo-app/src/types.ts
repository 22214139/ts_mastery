
export interface Project {
    title: string;
    deadline: string;
    status: "backlog" | "in-progress" | "done";
}

export interface User {
    readonly id: number;
    name: string;
    isAdmin: boolean;
    email?: string;
    projects: Project[]; 
}

export interface Box<T> {
    content: T;
}