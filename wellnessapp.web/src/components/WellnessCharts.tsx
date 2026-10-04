import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

interface WellnessEntry {
    id: number
    date: string
    mood: number
    sleepHours: number
    stressLevel: number
    physicalActivityMinutes: number
    notes: string
}

interface WellnessChartsProps {
    entries: WellnessEntry[]
}

const average = (values: number[]) => {
    if (values.length === 0) {
        return 0
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length
}

const correlation = (xs: number[], ys: number[]) => {
    if (xs.length < 3) {
        return null
    }

    const meanX = average(xs)
    const meanY = average(ys)

    let numerator = 0
    let denominatorX = 0
    let denominatorY = 0

    for (let i = 0; i < xs.length; i++) {
        const dx = xs[i] - meanX
        const dy = ys[i] - meanY

        numerator += dx * dy
        denominatorX += dx * dx
        denominatorY += dy * dy
    }

    if (denominatorX === 0 || denominatorY === 0) {
        return null
    }

    return numerator / Math.sqrt(denominatorX * denominatorY)
}

const describeCorrelation = (r: number | null) => {
    if (r === null) {
        return 'Lägg till minst 3 entries med olika värden för att se ett samband.'
    }

    const strength =
        Math.abs(r) >= 0.7
            ? 'starkt'
            : Math.abs(r) >= 0.4
                ? 'måttligt'
                : Math.abs(r) >= 0.2
                    ? 'svagt'
                    : null

    if (strength === null) {
        return 'Inget tydligt samband mellan sömn och humör hittades.'
    }

    const direction = r > 0 ? 'positivt' : 'negativt'

    return `Det finns ett ${strength} ${direction} samband mellan sömn och humör (korrelation ${r.toFixed(2)}).`
}

function WellnessCharts({ entries }: WellnessChartsProps) {
    if (entries.length === 0) {
        return (
            <div className="alert alert-info">
                Lägg till din första wellness-entry för att se grafer och
                sammanställningar.
            </div>
        )
    }

    const sortedEntries = [...entries].sort((a, b) =>
        String(a.date).localeCompare(String(b.date))
    )

    const chartData = sortedEntries.map((entry) => ({
        date: String(entry.date).split('T')[0],
        mood: entry.mood,
        sleepHours: entry.sleepHours,
        stressLevel: entry.stressLevel,
        physicalActivityMinutes: entry.physicalActivityMinutes
    }))

    const summary = [
        {
            label: 'Snitt humör',
            value: average(entries.map((e) => e.mood)).toFixed(1)
        },
        {
            label: 'Snitt sömn (timmar)',
            value: average(entries.map((e) => e.sleepHours)).toFixed(1)
        },
        {
            label: 'Snitt stress',
            value: average(entries.map((e) => e.stressLevel)).toFixed(1)
        },
        {
            label: 'Snitt aktivitet (min)',
            value: average(
                entries.map((e) => e.physicalActivityMinutes)
            ).toFixed(0)
        }
    ]

    const sleepMoodCorrelation = correlation(
        entries.map((e) => e.sleepHours),
        entries.map((e) => e.mood)
    )

    return (
        <div className="mb-5">
            <h2 className="mb-3">Sammanställning</h2>

            <div className="row">
                {summary.map((item) => (
                    <div className="col-6 col-md-3 mb-3" key={item.label}>
                        <div className="card text-center">
                            <div className="card-body">
                                <div className="text-muted small">
                                    {item.label}
                                </div>
                                <div className="fs-3 fw-bold">
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">
                        Humör, sömn och stress över tid
                    </h5>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="mood"
                                name="Humör"
                                stroke="#0d6efd"
                            />
                            <Line
                                type="monotone"
                                dataKey="sleepHours"
                                name="Sömn (timmar)"
                                stroke="#198754"
                            />
                            <Line
                                type="monotone"
                                dataKey="stressLevel"
                                name="Stress"
                                stroke="#dc3545"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Samband mellan sömn och humör</h5>

                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                type="number"
                                dataKey="sleepHours"
                                name="Sömn"
                                unit=" h"
                            />
                            <YAxis
                                type="number"
                                dataKey="mood"
                                name="Humör"
                            />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={chartData} fill="#0d6efd" />
                        </ScatterChart>
                    </ResponsiveContainer>

                    <p className="mb-1">
                        {describeCorrelation(sleepMoodCorrelation)}
                    </p>
                    <p className="text-muted small mb-0">
                        Ett samband betyder inte att det ena orsakar det andra.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WellnessCharts