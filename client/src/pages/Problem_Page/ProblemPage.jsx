import Description from "./ProblemPageComponenets/Description"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import Solution_code from './ProblemPageComponenets/Solution_code'
import CodeEditor from "./ProblemPageComponenets/CodeEditor";
import { useEffect, useState , useContext } from "react";
import Result from "./ProblemPageComponenets/Result";
import FadeLoader from "react-spinners/FadeLoader";
import axios from 'axios'
import Alert from 'react-bootstrap/Alert';
import {MoonStars , BrightnessHigh} from'react-bootstrap-icons'
import UserContext from "../../context/UserContext";
import BackButton from "../../components/styled-components/BackButton";

export default function ProblemPage() {
    
    const {id} = useParams()
    const { user , logout , toggleDarkMode , darkMode} = useContext(UserContext)
    const navigate = useNavigate()

    const [key, setKey] = useState('Description');
    const [resultInfo, setResultInfo] = useState(null);

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const [problem, setProblem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [failure, setFailure] = useState(false)

    useEffect(() => {
        axios.get(`/api/problem/${id}`)
        .then(({ data }) => {
            // console.log(data);
            setProblem(() => data)
            setLoading(() => false)
        })
        .catch(err => {
            console.log(err);
            setFailure(() => err)
            setLoading(() => false)
            navigate('/error')
        })
    }, [])

    if (loading) {
        return (
            <div className="middle">
                <FadeLoader
                    color={"green"}
                    loading={loading}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
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
            <Link to="/"><button className="btn btn-success btn-lg">Go back</button></Link>
            
          </Alert>
        );
      }

    return (
        <div className="pt-1">
            <button onClick={toggleDarkMode} className='btn dark:tw-bg-slate-800 tw-bg-sky-950 tw-text-white tw-fixed tw-bottom-5 tw-right-5'>{darkMode ? <MoonStars size={25} /> : <BrightnessHigh size={25} /> }</button>
            <Link to="/"><BackButton variant="problem" size={"small"} top={"-5px"} /></Link>
            <Tabs
                variant='underline'
                defaultActiveKey="Description"
                id="justify-tab-example"
                className=""
                activeKey={key}
                onSelect={(k) => setKey(k)}
                justify
            >
                <Tab eventKey="Description" title="Description">
                    <Description problem={problem} setProblem={setProblem} />
                </Tab>
                <Tab eventKey="Editor" title="Editor">
                    <CodeEditor setKey={setKey} setResultInfo={setResultInfo} {...problem} />
                </Tab>
                <Tab eventKey="Result" title="Result">
                    <div className="">
                        <Result submissionDoc={resultInfo} {...problem}/>
                    </div>
                </Tab>
                <Tab eventKey="Solution" title="Solution">
                    <Solution_code {...problem} />
                </Tab>
            </Tabs>

        </div>
    )
}