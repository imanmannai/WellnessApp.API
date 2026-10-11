import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/api'

function Register() {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-ZÅÄÖ]/.test(password)
    const hasLowercase = /[a-zåäö]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[^A-Za-zÅÄÖåäö0-9\s]/.test(password)

    const passwordIsValid =
        hasMinLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecialChar

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMessage('')

        if (!passwordIsValid) {
            setErrorMessage('Lösenordet uppfyller inte alla krav.')
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Lösenorden matchar inte.')
            return
        }

        try {
            await register(firstName, lastName, email, password)
            navigate('/login')
        } catch (error) {
            console.error('Registration failed:', error)

            setErrorMessage(
                'Registreringen misslyckades. Kontrollera uppgifterna eller försök med en annan e-postadress.'
            )
        }
    }
    
    const requirement = (valid: boolean, text: string) => (
        <li className={valid ? 'text-success' : 'text-muted'}>
            {valid ? '✓' : '○'} {text}
        </li>
    )

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: '480px' }}>
            <h1>Skapa konto</h1>
            <p>Skapa ett konto för att följa ditt välmående.</p>

            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Förnamn</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="given-name"
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
                        autoComplete="family-name"
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
                        autoComplete="email"
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
                        autoComplete="new-password"
                        aria-describedby="password-requirements"
                        required
                    />

                    <div
                        id="password-requirements"
                        className="form-text mt-2"
                    >
                        Lösenordet måste innehålla:
                        <ul className="list-unstyled mt-2">
                            {requirement(hasMinLength, 'Minst 8 tecken')}
                            {requirement(hasUppercase, 'Minst en stor bokstav')}
                            {requirement(hasLowercase, 'Minst en liten bokstav')}
                            {requirement(hasNumber, 'Minst en siffra')}
                            {requirement(
                                hasSpecialChar,
                                'Minst ett specialtecken, t.ex. ! eller #'
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Bekräfta lösenord</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                    />

                    {confirmPassword.length > 0 && (
                        <div
                            className={`form-text ${
                                password === confirmPassword
                                    ? 'text-success'
                                    : 'text-danger'
                            }`}
                        >
                            {password === confirmPassword
                                ? 'Lösenorden matchar.'
                                : 'Lösenorden matchar inte.'}
                        </div>
                    )}
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
