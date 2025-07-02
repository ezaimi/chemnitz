
export interface User {
    _id: string;
    name?: string;
    email: string;
    role?: 'user' | 'admin';
    googleId?: string;
    googleToken?: string;
    favorites?: string[];
}
