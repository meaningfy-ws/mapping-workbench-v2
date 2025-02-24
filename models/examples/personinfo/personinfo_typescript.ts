export type PersonId = string;

export enum GenderEnum {
    
    /** Male gender */
    male = "male",
    /** Female gender */
    female = "female",
    /** Non-binary gender */
    non_binary = "non_binary",
};

export enum EmploymentStatusEnum {
    
    /** Full-time employment */
    full_time = "full_time",
    /** Part-time employment */
    part_time = "part_time",
    /** Contract-based employment */
    contract = "contract",
    /** Unemployed */
    unemployed = "unemployed",
};



export interface Person {
    id: string,
    full_name: string,
    age?: number,
    gender?: string,
    birth_date?: date,
    website?: string,
    salary?: string,
}



export interface Address {
    street_address?: string,
    city?: string,
    postal_code?: string,
}



export interface Employment {
    employer?: string,
    start_date?: date,
    end_date?: date,
    status?: string,
}



