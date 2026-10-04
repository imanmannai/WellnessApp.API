import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const data = await login(email, password)

            localStorage.setItem('token', data.token)

            console.log('Login successful')

            navigate('/dashboard')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1>Logga in</h1>

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">E-post</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Lösenord</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Logga in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login