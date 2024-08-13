import axios from "axios"
import { useEffect, useState } from "react"
import TableRow from "./components/TableRow"
import Loader from "../../components/Loader"

export default function StandingPage() {

    const [submissions, setSubmissions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)

    useEffect(() => {
        async function getSubmissions() {
            try {
                const { data } = await axios.get('/api/submissions')
                setSubmissions(() => data)
            } catch (error) {
                setErr(() => error)
            }
            setLoading(false)
        }
        getSubmissions()
    }, [])

    if (loading) {
        return (
            <Loader color="orange" />
        )
    }

    return (
        <div className="container mt-5 tw-overflow-scroll tw-h-screen">
            <div className="tw-h-3/4">
                <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                        <tr>
                            <th>User</th>
                            <th>Problem</th>
                            <th>Status</th>
                            <th>Message</th>
                            <th>Language</th>
                            <th>Submitted at</th>
                            <th>View Submission</th>
                            <th>Runtime(ms)</th>
                            <th>Code</th>
                        </tr>
                    </thead>
                    <tbody >
                        {submissions && submissions.map((submission) => <TableRow key={submission._id} {...submission} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}