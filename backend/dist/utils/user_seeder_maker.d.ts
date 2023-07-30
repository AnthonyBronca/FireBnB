interface User {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    hashedpassword: string;
    bio: string | null;
    profileimage: string;
    createdAt: Date;
    updatedAt?: Date;
}
declare const users: User[];
export { users };
