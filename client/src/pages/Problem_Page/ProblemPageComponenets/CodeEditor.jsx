import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import UserContext from "../../../context/UserContext";
import { json } from "react-router-dom";

const CodeEditor = ({ setKey, setResultInfo, _id , input}) => {
  const [language, setLanguage] = useState("cpp");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [inputValue, setInputValue] = useState(input);
  const [outputValue, setOutputValue] = useState("");
  const [code, setCode] = useState("");
  // const [submittedButton, setSubmittedButton] = useState(null);
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [statusHistory, setStatusHistory] = useState("");
  const [jobResult, setjobResult] = useState(null);

  const { updateUser } = useContext(UserContext);

  const handleOutputChange = (e) => {
    setOutputValue(e.target.value);
  };

//   async function runCode2(e) {
//     e.preventDefault();
//     setLoadingRun((prev) => true);
//     const payload = {
//       code,
//       language,
//       inputValue,
//     };

//     try {
//       const { data } = await axios.post("/api/run", { payload });
//       // console.log({ data });
//       setOutputValue(data.output);
//     } catch (e) {
//       if (e.response) {
//         // The request was made and the server responded with a status code

//         const customError = e.response.data;
//         // console.log(e.response.data);
//         if (customError.type == "compilation error") {
//           setOutputValue(customError.message);
//         } else if (customError.type == "execution failure") {
//           setOutputValue(customError.message);
//         }
//       } else if (e.request) {
//         // The request was made but no response was received
//         // console.log(error.request);
//         alert("No response received");
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         alert(e.message);
//         console.log("Error", e.message);
//       }
//     }
//     setLoadingRun((prev) => false);
//   }

  async function runCode(e) {
    e.preventDefault();
    setLoadingRun((prev) => true);
    setStatusHistory((prev) => "");
    setjobResult(null)
    const payload = {
      code,
      language,
      inputValue,
    };

    try {
      const { data } = await axios.post("/api/run", { payload });
      const jobId = data.jobDoc._id;

      //   console.log(data);
      const { data: res } = await axios.get(`/api/run/status?id=${jobId}`);
      //   console.log(res);
      setStatusHistory((prev) => prev.concat(`queue\n`));
        
      let count = 1;
    //   const poll = setInterval(async () => {
    //     const { data } = await axios.get(`/api/run/status?id=${jobId}`);
    //     // console.log(data);
    //     const status = data.status;
    //     // setStatusHistory(prev => prev.concat(`\n${status}`))

    //     if (status != "completed" || count-- == 1) {
    //       setStatusHistory((prev) => prev.concat(`${status}\n`));
    //     }
    //     console.log(status);
    //     if (status == "completed") {
    //       setOutputValue(data.runResult.output);
    //       setLoadingRun((prev) => false);
    //       clearInterval(poll);
    //       setjobResult((prev) => data);
    //     //   console.log(data);
    //     }
    //   }, 3500);

    count = 1
    while(true){
        const { data } = await axios.get(`/api/run/status?id=${jobId}`);
        const status = data.status;
        if (status != "completed" || count-- == 1) {
            setStatusHistory((prev) => prev.concat(`${status}\n`));
        }
        if (status == "completed") {
            setOutputValue(data.runResult.output);
            setLoadingRun((prev) => false);
            setjobResult((prev) => data);
          //   console.log(data);
          break;
        }
        await new Promise(r => setTimeout(r, 3300));
    }

    } catch (e) {
      if (e.response) {
        alert(e.response.data);
      } else if (e.request) {
        // The request was made but no response was received
        // console.log(error.request);
        alert("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(e.message);
        console.log("Error", e.message);
      }
    }
    // setLoadingRun(prev => false)
  }

  async function submitCode(e) {
    e.preventDefault();
    setStatusHistory((prev) => "");
    setLoadingSubmit((prev) => true);
    setjobResult(prev=> null)
    const payload = {
      code,
      language,
    };

    try {
      
      const { data } = await axios.post(`/api/submit/${_id}`, { payload });
      // console.log(data);
      
      const jobId = data.jobDoc._id;
      setStatusHistory((prev) => prev.concat(`queue\n`));

      let count = 1
      while(true){
          const { data } = await axios.get(`/api/submit/status?id=${jobId}`);
          
          let status = data.jobDoc.status;
          // console.log(status);
          // status=""
          if (status != "completed" || count-- == 1) {
              setStatusHistory((prev) => prev.concat(`${status}\n`));
          }
          if (status == "completed") {
            // setLoadingSubmit((prev) => false);
            //   console.log(data);
            setResultInfo(data.submissionDoc)
            console.log(data.submissionDoc);
            // console.log(data);
            break;
          }
          await new Promise(r => setTimeout(r, 3300));
      }

      
    } catch (e) {
      if (e.response) {
        alert(JSON.stringify(e.response))
      } else if (e.request) {
        alert("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(e.message);
        console.log("Error", e.message);
      }
    }
    finally{
      await updateUser();
      setLoadingSubmit((prev) => false);
      setKey("Result");

    }
  }

  return (
    <div className="container mt-5">
      <Row>
        <Col md={8}>
          <Row>
            <Col md={4}>
              <div>
                <label htmlFor="language" className="form-label">
                  Language:
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage((prev) => e.target.value)}
                  className="form-select"
                >
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  {/* Add more language options as needed */}
                </select>
              </div>
            </Col>

            <Col md={4}>
              <div>
                <label htmlFor="theme" className="form-label">
                  Theme:
                </label>
                <select
                  id="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="form-select"
                >
                  <option value="vs-dark">Dark</option>
                  <option value="vs-light">Light</option>
                  {/* Add more theme options as needed */}
                </select>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <label htmlFor="fontSize" className="form-label">
                  Font Size:
                </label>
                <input
                  id="fontSize"
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="form-control"
                />
              </div>
            </Col>
          </Row>
          <div className="border">
            <Editor
              height="60vh"
              // defaultLanguage={language}
              language={language}
              defaultValue={""}
              value={code}
              onChange={(value) => setCode(value)}
              theme={theme}
              options={{ fontSize }}
            />
          </div>
        </Col>
        <Col md={4}>
          <div>
            <label htmlFor="input" className="form-label">
              Input:
            </label>
            <textarea
              id="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="form-control"
              rows="8"
            />
          </div>
          <div>
            <label htmlFor="output" className="form-label">
              Output:
            </label>
            <textarea
              id="output"
              value={outputValue}
              // onChange={handleOutputChange}
              className="form-control"
              rows="8"
              readOnly
            />
          </div>
          <div className="mt-3">
            <button
              onClick={runCode}
              type="submit"
              name="run"
              className="btn btn-warning"
            >
              Run{" "}
              {loadingRun && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </button>
            {"        "}
            <button
              onClick={submitCode}
              type="submit"
              name="submit"
              className="btn btn-success"
            >
              Submit{" "}
              {loadingSubmit && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </Col>
      </Row>
      <div className="tw-flex tw-p-4  tw-mt-4 tw-mb-28 tw-flex-col tw-h-68 tw-bg-gray-900 tw-text-gray-200 tw-font-mono">
        <div className="tw-flex tw-items-center tw-h-8 tw-px-4 tw-py-4 tw-bg-gray-800">
          <div className="tw-h-3 tw-w-3 tw-mr-2 tw-rounded-full tw-bg-red-500"></div>
          <div className="tw-h-3 tw-w-3 tw-mr-2 tw-rounded-full tw-bg-yellow-500"></div>
          <div className="tw-h-3 tw-w-3 tw-rounded-full tw-bg-green-500"></div>
        </div>

        <div className="tw-flex-1 tw-p-4">
          <div className="tw-flex">
            {/* <div className="tw-mr-2">&gt;</div> */}
            {/* <input
              type="text"
              className="tw-flex-1 tw-bg-gray-800 focus:tw-outline-none"
              placeholder="Type your command here"
            /> */}
          </div>

          <div className="tw-mt-2">
            <span className="tw-text-green-500">&gt; status:</span>
            <div className="tw-bg-gray-800 tw-p-2 tw-mt-1">
              <p className="tw-whitespace-pre-wrap tw-mb-4 tw-overflow-auto tw-h-28">
                {statusHistory}
              </p>
            </div>
          </div>

          {jobResult ? (
            <div className="tw-mt-2">
              <span className="tw-text-green-500">&gt; Times:</span>
              <div className="tw-bg-gray-800 tw-p-2 tw-mt-1">
                {/* <p className="tw-whitespace-pre-wrap tw-mb-4 tw-overflow-auto tw-h-28"></p> */}
                <p>Runtime : <span className="tw-text-green-500">{jobResult.runResult.executionTime} </span>ms</p>
                <p>processCompletionTime : <span className="tw-text-green-500">{jobResult.runResult.processCompletionTime}</span> ms</p>
                <p>popped from queue at : <span className="tw-text-green-500">{jobResult.runResult.processStartTime} </span>ms</p>
                <p>totalTime from queue insertion till end :<span className="tw-text-green-500"> {jobResult.runResult.totalTime} </span>ms</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
