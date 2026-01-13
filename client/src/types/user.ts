export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profileImage?: string;
    permissions: {
        create: boolean;
        update: boolean;
        delete: boolean;
    };
}
