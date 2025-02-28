 export interface Project {
    title: string;
    identifier: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    "@type": string;
    "@id"?:string;
}
