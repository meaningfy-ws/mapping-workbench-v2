import Project from './models/project'

export const getByTypeApi = async (type: string) => {
    const data = {
        type,
    };

    const response = await fetch("/api/get", {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response.json();
}


export const addProjectApi = async (data: Project) => {
     const response = await fetch("/api/add-project", {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response.json();
}


