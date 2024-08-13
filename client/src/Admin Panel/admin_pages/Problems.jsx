import '../module.style.css'
import ProblemTable from '../components/ProblemTable'
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from "react"
import Loader from '../../components/Loader';
import axios from 'axios';

export default function Problems() {

    
    const [problems, setProblems] = useState(null)
    const [loading, setLoading] = useState(true)
    const [failure, setFailure] = useState(false)

    useEffect(() => {
        axios.get("/api/problems")
        .then(({ data }) => {
            setProblems(() => data)
            setLoading(() => false)
        })
        .catch(err => {
            console.log(err);
            setFailure(() => err)
            setLoading(() => false)
        })
    }, [])

    if (loading) {
        return (
            <Loader color="blue"/>
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
              {failure.response?.data}
            </p>
          </Alert>
        );
      }

    return (
        <div>
            <div className="container">

                {/* {problems && problems.length >0 ? problems.map((problem)=><Problem_card {...problem} key={problem._id} />) : null} */}
                <ProblemTable problems={problems} />
            </div>
        </div>
    )

    return (
        <>
            <ProblemTable />
        </>
    )
}