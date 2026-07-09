import React, { useEffect, useState } from 'react'
import { getCourses } from '../types/auth';
import { getErrorMessage } from '../api/auth';
import type { Course } from '../types/types';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        getCourses().then((data) => { mounted && setCourses(data); })
        .catch((err) => { mounted && setError(getErrorMessage(err)); })
        .finally(() => { mounted && setLoading(false); });
        return () => { mounted = false; };
    }, [])

    return (
        <>
            <div>Dashboard</div>
            {loading && <p>Cargando...</p>}
            {error && <p>Error: {error}</p>}
            {!error && !loading && (
                {courses.length === 0 ? (
                    <p>No hay cursos disponibles.</p>
                ) : (
                    <ul>
                        {courses.map((course) => (
                            <li key={course.id}>{course.name}</li>
                        ))}
                    </ul>
                )}
        )
    }
            </>)}

export default Dashboard
