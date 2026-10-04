import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import {
    getWellnessEntries,
    createWellnessEntry,
    deleteWellnessEntry,
    updateWellnessEntry
} from './services/api'

interface WellnessEntry {
    id: number
    date: string
    mood: number
    sleepHours: number
    stressLevel: number
    physicalActivityMinutes: number
    notes: string
}

function Dashboard() {
    const[entries, setEntries] = useState<WellnessEntry[]>([])

    const [date, setDate] = useState('')
    const [mood, setMood] = useState(0)
    const [sleepHours, setSleepHours] = useState(0)
    const [stressLevel, setStressLevel] = useState(0)
    const [physicalActivityMinutes, setPhysicalActivityMinutes] = useState(0)
    const [notes, setNotes] = useState('')

    const [editingId, setEditingId] = useState<number | null>(null)
    const today = new Date().toLocaleDateString('sv-SE')

    useEffect(() => {
        const loadEntries = async () => {
            try {
                const data = await getWellnessEntries()
                setEntries(data)
            } catch (error) {
                console.error('Failed to load wellness entries:', error)
            }
        }

        loadEntries()
    }, [])

    const handleCreateEntry = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const newEntry = await createWellnessEntry({
                date,
                mood,
                sleepHours,
                stressLevel,
                physicalActivityMinutes,
                notes
            })

            setEntries([...entries, newEntry])

            setDate('')
            setMood(0)
            setSleepHours(0)
            setStressLevel(0)
            setPhysicalActivityMinutes(0)
            setNotes('')

            console.log('Wellness entry created:', newEntry)
        } catch (error) {
            console.error('Failed to create wellness entry:', error)
        }
    }
    const handleDeleteEntry = async (id: number) => {
        try {
            await deleteWellnessEntry(id)

            setEntries(entries.filter((entry) => entry.id !== id))

            console.log('Wellness entry deleted')
        } catch (error) {
            console.error('Failed to delete wellness entry:', error)
        }
    }
    const handleEditEntry = (entry: WellnessEntry) => {
        setEditingId(entry.id)

        setDate(String(entry.date).split('T')[0])
        setMood(entry.mood)
        setSleepHours(entry.sleepHours)
        setStressLevel(entry.stressLevel)
        setPhysicalActivityMinutes(entry.physicalActivityMinutes)
        setNotes(entry.notes)
    }
    const handleUpdateEntry = async (e: React.FormEvent) => {
        e.preventDefault()

        if (editingId === null) {
            return
        }

        try {
            const updatedEntry = await updateWellnessEntry(editingId, {
                date,
                mood,
                sleepHours,
                stressLevel,
                physicalActivityMinutes,
                notes
            })

            setEntries(
                entries.map((entry) =>
                    entry.id === editingId
                        ? updatedEntry
                        : entry
                )
            )

            setEditingId(null)
            setDate('')
            setMood(0)
            setSleepHours(0)
            setStressLevel(0)
            setPhysicalActivityMinutes(0)
            setNotes('')

            console.log('Wellness entry updated:', updatedEntry)
        } catch (error) {
            console.error('Failed to update wellness entry:', error)
        }
    }

    return (
        <div className="container mt-5">

            <h1>Wellness Dashboard</h1>

            <p>Du är inloggad!</p>

            <button
                onClick={() => {
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                }}
                className="btn btn-danger mb-4"
            >
                Logga ut
            </button>

            <h2 className="mt-4">Lägg till wellness-entry</h2>

            <form
                onSubmit={
                    editingId === null
                        ? handleCreateEntry
                        : handleUpdateEntry
                }
            >

                <div className="mb-3">
                    <label className="form-label">
                        Datum
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min="2000-01-01"
                        max={today}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Humör
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={mood}
                        onChange={(e) => setMood(Number(e.target.value))}
                        min="0"
                        max="10"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Sömn (timmar)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(Number(e.target.value))}
                        min="0"
                        max="24"
                        step="0.5"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Stressnivå
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={stressLevel}
                        onChange={(e) => setStressLevel(Number(e.target.value))}
                        min="0"
                        max="10"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Fysisk aktivitet (minuter)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={physicalActivityMinutes}
                        onChange={(e) =>
                            setPhysicalActivityMinutes(
                                Number(e.target.value)
                            )
                        }
                        min="0"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Anteckningar
                    </label>

                    <textarea
                        className="form-control"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {editingId === null
                        ? 'Spara wellness-entry'
                        : 'Uppdatera ändringar'}
                </button>

            </form>

            <h2 className="mt-5">
                Dina wellness-entries
            </h2>

            {entries.map((entry) => (
                <div
                    className="card mb-3"
                    key={entry.id}
                >
                    <div className="card-body">

                        <h5 className="card-title">
                            {entry.date}
                        </h5>

                        <p>
                            😊 Humör: {entry.mood}
                        </p>

                        <p>
                            😴 Sömn: {entry.sleepHours} timmar
                        </p>

                        <p>
                            😰 Stressnivå: {entry.stressLevel}
                        </p>

                        <p>
                            🏃 Fysisk aktivitet:{' '}
                            {entry.physicalActivityMinutes} minuter
                        </p>

                        <p>
                            📝 Anteckningar: {entry.notes}
                        </p>

                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteEntry(entry.id)}
                        >
                            Ta bort
                        </button>
                        <button
                            className="btn btn-warning ms-2"
                            onClick={() => handleEditEntry(entry)}
                        >
                            Redigera
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ProtectedRoute({
    children
}: {
    children: React.ReactNode
}) {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" />
    }

    return children
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>
        </BrowserRouter>
    )
}

export default App