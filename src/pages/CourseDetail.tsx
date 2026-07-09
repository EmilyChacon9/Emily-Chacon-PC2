import React, { useCallback, useEffect, useState } from 'react'
import { getErrorMessage } from '../api/auth';
import { deleteCourseById, getCourseById } from '../types/auth';

function CourseDetail() {
    const [error, setError] = useState<string | null>(null);
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const fetchCourseDetail = useCallback(async (id: string) => {
        try {
            const response = await getCourseById(id);
            setCourse(response);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!course) return;
        fetchCourseDetail(course.id);
    }, [course]);

    async function handleDelete() {
        try {
            await deleteCourseById(course.id);
            setCourse(null);
        } catch (error) {
            setError(getErrorMessage(error));
        }
    }

    return (
        <>
            <div>CourseDetail</div>

            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            {!error && !loading && course && (
                <div>
                    <h2>{course.name}</h2>
                    <p>{course.code}</p>
                    <p>{course.credits}</p>
                    <p>{course.nota}</p>
                    <p>{course.badge}</p>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            )}
        </>
    )
}

export default CourseDetail