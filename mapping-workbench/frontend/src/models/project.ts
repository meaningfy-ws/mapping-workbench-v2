class Project {
    title: string;
    identifier: string;
    description?: string;
    start_date: Date;
    end_date: Date;

    constructor(title: string, identifier: string, start_date: Date, end_date: Date, description?: string) {
      this.title = title;
      this.identifier = identifier;
      this.start_date = start_date;
      this.end_date = end_date;
      this.description = description;
    }

  }

  export default Project