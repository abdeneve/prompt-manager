import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase';

function Register({setShowRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setShowRegister(false);
            // Redireccionar al usuario a la página principal o hacer alguna acción adicional
        } catch (error) {
            // Personalizar mensajes de error
            if (error.code === 'auth/email-already-in-use') {
                setError('Este correo electrónico ya está registrado. Por favor, utiliza otro correo o inicia sesión.');
            } else {
                setError(error.message);
            }
        }
    };

    return (
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
            <h2 className="text-xl sm:text-2xl text-[#E6E6FA] font-bold mb-4 sm:mb-6 text-center">Registrar</h2>

            {/* Email */}
            <div className="mb-4">
                <input 
                    className="
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
                <input 
                    className="
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

            <button onClick={handleRegister}
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
                Registrarse
            </button>

            {/* Error */}
            {error && (
                <p className="mb-4 text-red-300 text-center text-sm">{error}</p>
            )}

             <p className="text-sm text-[#E6E6FA] text-center"> 
                <span>¿Ya tienes cuenta? </span>
                <span onClick={() => setShowRegister(false)}
                    className="
                    text-[#00FFFF]
                    cursor-pointer
                    hover:text-[#E6E6FA]
                    transition-colors
                    "
                > 
                    Inicia sesión 
                </span>
            </p>
        </div>
    );
}

export default Register;