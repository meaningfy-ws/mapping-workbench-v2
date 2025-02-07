class Project {
    title: string;
    identifier: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    "@type": string;

    constructor(title: string, identifier: string, start_date: Date, end_date: Date, type: string, description?: string) {
        this.title = title;
        this.identifier = identifier;
        this.start_date = start_date;
        this.end_date = end_date;
        this.description = description;
        this["@type"] = type
    }
}

export default Project