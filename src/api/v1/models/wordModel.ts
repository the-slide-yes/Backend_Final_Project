import { Visibility } from "./visibility";


export interface Word {
    id: string;
    historicalId?: string;
    name: string;
    description?: string;
    userId: string;
    tagIds?: string[];
    createdAt: Date;
    updatedAt: Date;
    visibility: Visibility;
}