import Project from './models/project'

export const getByTypeApi = async (type: string) => {
    const query = {
        select: {'?s': ['*']},
        where: {
            "@id":"?s",
            '@type': type,
        },
    };

    const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query, null, 2)
    });

    console.log('response',response)

    const data = await response.json();
    console.log(data)
    return (data)
    // Add more assertions based on expected data structure
}

export const addProjectApi = async () => {
    const project: Project = {
        title: 'proj1',
        identifier: '123123213',
        description: 'some description',
        start_date: new Date(),
        end_date: new Date(1),
        "@type": 'project'
    }

    console.log(project)

    const transaction =
        {insert: project}
    ;

    console.log(JSON.stringify(transaction, null, 2))

    const response = await fetch("http://localhost:8000/transact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction, null, 2)
    });


    const data = await response.json();
    return (data)
}


