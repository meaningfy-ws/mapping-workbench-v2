
export enum Roles {
    
    /** example role */
    ADMIN = "ADMIN",
    USER = "USER",
};


/**
 * Some person
 */
export interface Person {
    name: string,
    givenName: string,
    familyName: string,
    email: string,
    projects?: Project[],
    hasRole: string,
}



export interface Project {
    title: string,
    identifier: string,
    description?: string,
    code: number,
}



