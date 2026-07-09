interface User{
    id: string;
    name: string;
    email: string;
    fullName?: string;
    password: string;
}

type Badges = 'APROBADO' | 'EN CURSO' | 'DESAPROBADO';

interface Course {
    id: string;
    name: string;
    code: string;
    credits: number;
    nota?: number;
    badge: Badges;
}


export type { User, Course };