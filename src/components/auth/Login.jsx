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
       <div>
           { showRegister ?
             <Register setShowRegister={setShowRegister} /> :
             (
                <>
                <h2>Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Iniciar Sesión</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p> ¿No tienes cuenta? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setShowRegister(true)}>Registrate</span></p>
                </>
             )

            }

       </div>
     );
}

export default Login;