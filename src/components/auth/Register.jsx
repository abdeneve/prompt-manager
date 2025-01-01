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
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Registrar</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrarse</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
             <p> ¿Ya tienes cuenta?  <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setShowRegister(false)}> Inicia sesión </span></p>
        </div>
    );
}

export default Register;