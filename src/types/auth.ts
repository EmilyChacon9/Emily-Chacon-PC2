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

export async function updateCourseById(id: string, course: Partial<Course>): Promise<void> {
    await api.put(`/courses/${id}`, course);
}

export async function patchCourseById(id: string, course: Partial<Course>): Promise<void> {
    await api.patch(`/courses/${id}`, course);
}

export async function postCourse({ name, code, credits, nota, badge }: { name: string; code: string; credits: number; nota?: number; badge?: string }): Promise<string> {
    const {data} = await api.post('/courses/new', { name, code, credits, nota, badge });
    return data;
}