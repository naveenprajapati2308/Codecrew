import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import UserTable from "../components/UserTable"
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";

export default function Users() {

    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [failure, setFailure] = useState(false)

    useEffect(() => {
        async function getSubmissions() {
            try {
                const { data } = await axios.get('/api/users')
                setUsers(() => data)
            } catch (error) {
                setFailure(() => error)
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

    if (failure) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {failure.message}
                </p>
                <p>
                    {failure.response?.data.message}
                </p>
                <Link to="/"><button className="btn btn-success btn-lg">Go back</button></Link>
            </Alert>
        );
    }

    return (
        <>
            <UserTable users={users}/>
        </>
    )
}