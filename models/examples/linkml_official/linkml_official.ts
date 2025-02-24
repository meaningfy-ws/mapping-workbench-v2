export type PersonId = string;



export interface Person {
    id: string,
    /** name of the person */
    full_name: string,
    /** other names for the person */
    aliases?: string[],
    phone?: string,
    age?: number,
}



export interface Container {
    persons?: Person[],
}



