import api from '../api/auth';
import type { User, Course } from './types';


export async function login({ email, password }: { email: string; password: string }): Promise<string> {
    const {data} = await api.post('/auth/login', { email, password });
    return data;
}

export async function register({ name, email, password, fullName }: { name: string; email: string; password: string; fullName: string }): Promise<string> {
    const {data} = await api.post('/auth/register', { name, email, password, fullName });
    return data;
}

export async function getMe(): Promise<User> {
    const {data} = await api.get('/auth/me');
    return data;
}


export async function getCourses(): Promise<Course[]> {
    const {data} = await api.get('/courses');
    return data;
}

export async function getCourseById(id: string): Promise<Course> {
    const {data} = await api.get(`/courses/${id}`);
    return data;
}

export async function deleteCourseById(id: string): Promise<void> {
    await api.delete(`/courses/${id}`);
}