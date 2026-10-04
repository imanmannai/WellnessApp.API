import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/api'

function Register() {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')

        try {
            await register(firstName, lastName, email, password)
            navigate('/login')
        } catch (error) {
            const err = error as { response?: { data?: unknown } }
            const data = err.response?.data

            if (typeof data === 'string') {
                setErrorMessage(data)
            } else if (Array.isArray(data)) {
                setErrorMessage(
                    data
                        .map((item) => item.description ?? String(item))
                        .join(' ')
                )
            } else {
                setErrorMessage(
                    'Registreringen misslyckades. Kontrollera uppgifterna och försök igen.'
                )
            }
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '480px' }}>
            <h1>Skapa konto</h1>

            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Förnamn</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Efternamn</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

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

                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                />
                <div className="form-text">
                    Minst 6 tecken med stor och liten bokstav, siffra och specialtecken,
                    till exempel Test123!
                </div>

                <button type="submit" className="btn btn-primary">
                    Skapa konto
                </button>
            </form>

            <p className="mt-3">
                Har du redan ett konto? <Link to="/login">Logga in</Link>
            </p>
        </div>
    )
}

export default Register