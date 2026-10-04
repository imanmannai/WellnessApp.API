import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7093/api',
})

export const getWellnessGoals = async () => {
    const response = await api.get('/WellnessGoals')
    return response.data
}

export const getWellnessEntries = async () => {
    const token = localStorage.getItem('token')

    const response = await api.get('/WellnessEntries', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}
export const createWellnessEntry = async (entry: {
    date: string
    mood: number
    sleepHours: number
    stressLevel: number
    physicalActivityMinutes: number
    notes: string
}) => {
    const token = localStorage.getItem('token')

    const response = await api.post('/WellnessEntries', entry, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return response.data
}

export const deleteWellnessEntry = async (id: number) => {
    const token = localStorage.getItem('token')

    await api.delete(`/WellnessEntries/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
export const updateWellnessEntry = async (
    id: number,
    entry: {
        date: string
        mood: number
        sleepHours: number
        stressLevel: number
        physicalActivityMinutes: number
        notes: string
    }
) => {
    const token = localStorage.getItem('token')

    const response = await api.put(
        `/WellnessEntries/${id}`,
        entry,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response.data
}

export const login = async (email: string, password: string) => {
    const response = await api.post('/Auth/login', {
        email,
        password,
    })

    return response.data
}

export default api