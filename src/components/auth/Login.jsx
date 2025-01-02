import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase';
import Register from './Register';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redireccionar al usuario a la página principal o hacer alguna acción adicional
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div 
            className="
                min-h-screen
                w-full
                bg-gradient-to-r from-[#0A1F44] to-[#4B0082]
                flex
                items-center
                justify-center
                p-4
            "
        >
            { showRegister ?
                <Register setShowRegister={setShowRegister} /> :
                (
                    <div
                        className="
                        bg-white/10
                        backdrop-blur-sm
                        rounded-lg
                        shadow-lg
                        p-6
                        w-full
                        max-w-md
                        text-white
                        "
                    >
                        <h2 className="text-2xl text-[#E6E6FA] font-bold mb-6 text-center">Login</h2>

                        {/* Email */}
                        <div className="mb-4">
                            <input className="
                                w-full
                                px-4
                                py-2
                                rounded
                                bg-white/20
                                text-white
                                outline-none
                                focus:ring-2
                                focus:ring-blue-400
                                placeholder-gray-200
                                "
                                type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <input className="
                                w-full
                                px-4
                                py-2
                                rounded
                                bg-white/20
                                text-white
                                outline-none
                                focus:ring-2
                                focus:ring-blue-400
                                placeholder-gray-200
                                "
                                type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {/* Botón de Iniciar Sesión */}
                        <button onClick={handleLogin}
                            className="
                            w-full
                            py-2
                            mb-4
                            bg-blue-600
                            hover:bg-blue-700
                            transition-colors
                            text-white
                            font-semibold
                            rounded-full
                            "
                        >
                            Iniciar Sesión
                        </button>

                        {/* Error */}
                        {error && (
                            <p className="mb-4 text-red-300 text-center text-sm">{error}</p>
                        )}

                        {/* Registro */}
                        <p className="text-sm text-[#E6E6FA] text-center">
                            ¿No tienes cuenta?{' '}
                            <span
                                onClick={() => setShowRegister(true)}
                                className="
                                text-[#00FFFF]
                                cursor-pointer
                                hover:text-[#E6E6FA]
                                transition-colors
                                "
                            >
                                Regístrate
                            </span>
                        </p>
                    </div>
                )
            }
        </div>
     );
}

export default Login;