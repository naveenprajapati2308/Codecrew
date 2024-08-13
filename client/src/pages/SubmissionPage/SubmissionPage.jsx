import { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import Result from "../Problem_Page/ProblemPageComponenets/Result";
import NotFoundPage from "../errorPages/NotFoundPage";

//This component makes use of the components from the resut page of problemPage.

export default function SubmissionPage() {
    
    const {id} = useParams()
    const [loading , setLoading] = useState(true)
    const [submissionInfo , setSubmissionInfo] = useState(null)
    const [error , setError] = useState(null)

    useEffect(()=>{
        async function fetchInfo() {
            try {
                const {data} = await axios.get(`/api/submission/${id}` , {withCredentials : true})
                // console.log(data);
                setSubmissionInfo(prev => data)
                             
            } catch (error) {
                setError(error)
            }
            finally{
                setLoading(prev => false)   
            }
        }
        fetchInfo()
    } , [])

    if(loading){
        return <Loader color="black"/>
    }

    if(error){
        return <NotFoundPage />
    }

    return (
        <div>
            <Result submissionDoc={submissionInfo } />
        </div>
    );
}