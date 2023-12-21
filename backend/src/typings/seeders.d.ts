
export interface OptionsInterface {
    schema?: string;
    tableName?: string;
}


export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    bio: string;
    isHost: boolean;
    hashedPassword: string;
    userId?: number
}


export interface UserImage {
    userId: number,
    url: string,
    isProfile: boolean
}
