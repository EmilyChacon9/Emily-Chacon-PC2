import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login, register } from "../types/auth";




type Mode = 'login' | 'register';

export default function Login() {
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [mode, setMode] = useState<Mode>('login');
    const { setToken } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const token = mode === 'login' ? await login({ email, password }) : await register({ name: username, email, password, fullName });
            await setToken(token);
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Un error ha ocurrido');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1> Bienvenido!</h1>
            <p>Por favor, inicia sesión o regístrate para continuar.</p>
            <p> {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}</p>
            <>
                <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                    {mode === 'login' ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {mode === 'register' ? (
                        <>
                            <div>
                                <label> <span>Username</span>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Nombre" required />
                                </label>
                            </div>
                            <div>
                                <label> <span>Email</span>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo electrónico" required />
                                </label>
                            </div>
                            <div>
                                <label> <span>Password</span>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" required />
                                </label>
                            </div>
                            <div>
                                <label> <span>Nombre completo</span>
                                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Nombre completo" required />
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label> <span>Username o Email</span>
                                    <input value={username || email} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Nombre" required />
                                </label>
                            </div>
                            <div>
                                <label> <span>Password</span>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" required />
                                </label>
                            </div>
                        </>
                    )
                    }
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Enviando...' : mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
                    </button>
                    </form>
                </>
            </div>
            )
        }