import Alert from "react-bootstrap/Alert";
import "./result.css";
import OutputDiff from "./subComponents/OutputDiff";
import { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy, a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Pill from "../../../components/tailwind-components/Pill";
import { useEffect } from "react";
import axios from "axios";

export default function Result({submissionDoc = null }) {

  if (submissionDoc != null) {
    const { darkMode } = useContext(UserContext);

    const {
      user: username,
      createdAt: submissionTime,
      _id: submissionId,
      problemName: problem,
      problemId,
      email,
      language,
      status,
      message,
      errorMessage,
      code,
      FailedInfo,
      runtime,
      userId,
    } = submissionDoc;

  
    return (
      <div
        className={`${
          darkMode
            ? "tw-dark tw-bg-gray-900 tw-text-white"
            : "tw-bg-gray-100 tw-text-gray-900"
        }`}
      >
        <div
          className={`tw-p-8 tw-container tw-mx-auto ${
            darkMode
              ? "tw-dark tw-bg-gray-900 tw-text-white"
              : "tw-bg-gray-100 tw-text-gray-900"
          } tw-min-h-screen`}
        >
          <h1 className="tw-text-3xl tw-font-bold tw-mb-4 tw-text-center">
            Submission Result
          </h1>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-6">
            <div
              className={`tw-flex tw-items-center tw-overflow-auto tw-pr-5  tw-mb-6 tw-h-full tw-rounded-lg ${
                darkMode
                  ? "tw-bg-gray-800 tw-text-white"
                  : "tw-bg-white tw-text-gray-900"
              }`}
            >
              <img
                // src="https://via.placeholder.com/100"
                src={userId?.image?.url}
                alt="Profile"
                className="tw-w-24 tw-h-24 tw-rounded-full tw-ml-10 tw-mr-4"
              />
              <div>
                <h1 className="tw-text-2xl tw-font-semibold">{username}</h1>
                <p className="tw-text-gray-600 dark:tw-text-gray-400">
                  {email}
                </p>
              </div>
            </div>

            <div
              className={`tw-bg-gray-100 tw-p-6 tw-rounded-lg ${
                darkMode
                  ? "tw-bg-gray-800 tw-text-white"
                  : "tw-bg-white tw-text-gray-900"
              }`}
            >
              <p className="tw-mb-2">
                <strong>Username:</strong> {username}
              </p>
              <p className="tw-mb-2">
                <strong>Submission Time:</strong>{" "}
                {new Date(submissionTime).toLocaleString()}
              </p>
            </div>
            <div
              className={`bg-gray-100 tw-p-6 tw-rounded-lg ${
                darkMode
                  ? "tw-bg-gray-800 tw-text-white"
                  : "tw-bg-white tw-text-gray-900"
              }`}
            >
              <p className="tw-mb-2">
                <strong>Submission Id:</strong> {submissionId}
              </p>
              <p className="tw-mb-2">
                <strong>Problem:</strong> {problem}
              </p>
            </div>
            <div
              className={`bg-gray-100 tw-p-6 tw-rounded-lg ${
                darkMode
                  ? "tw-bg-gray-800 tw-text-white"
                  : "tw-bg-white tw-text-gray-900"
              }`}
            >
              <p className="tw-mb-2">
                <strong>Problem Id:</strong> {problemId}
              </p>
              <p className="tw-mb-2">
                <strong>Email:</strong> {email}
              </p>
            </div>
            <div
              className={`bg-gray-100 tw-p-6 tw-rounded-lg ${
                darkMode
                  ? "tw-bg-gray-800 tw-text-white"
                  : "tw-bg-white tw-text-gray-900"
              }`}
            >
              <p className="tw-mb-2">
                <strong>Language:</strong> {language}
              </p>
              <p className="tw-mb-2">
                <strong>Status:</strong>{" "}
                <Pill
                  mode={status == "Accepted" ? "easy" : "hard"}
                  text={status}
                />
              </p>
            </div>
            <div
              className={`bg-gray-100 tw-p-6 tw-rounded-lg ${
                darkMode
                  ? "tw-bg-gray-800 tw-text-white"
                  : "tw-bg-white tw-text-gray-900"
              }`}
            >
              <p className="tw-mb-2">
                <strong>Message:</strong> {message}
              </p>
              <p className="tw-mb-2">
                <strong>Runtime:</strong> <span className="tw-text-green-500 tw-font-medium">{runtime?runtime : "NO RECORD"}</span> ms
              </p>
            </div>
          </div>

          {FailedInfo ? (
            <OutputDiff judgement={FailedInfo} darkMode={darkMode} />
          ) : null}

          <div>
            {errorMessage ? (
              <Alert variant="danger">
                <Alert.Heading>{message}</Alert.Heading>
                <p>Fix your code bruh....</p>
                <hr />
                <p className="tw-mb-0 tw-whitespace-pre-wrap">{errorMessage}</p>
              </Alert>
            ) : null}
          </div>

          <div
            className={`bg-gray-100 tw-p-6 tw-rounded-lg tw-mb-6 ${
              darkMode
                ? "tw-bg-gray-800 tw-text-white"
                : "tw-bg-white tw-text-gray-900"
            }`}
          >
            <h2 className="tw-text-2xl tw-font-bold tw-mb-2">Submitted Code</h2>
            <pre className="tw-whitespace-pre-wrap tw-font-mono tw-bg-gray-200 tw-rounded-lg dark:tw-bg-gray-700">
              <SyntaxHighlighter
                showLineNumbers={true}
                language="cpp"
                style={darkMode ? a11yDark : coy}
              >
                {code}
              </SyntaxHighlighter>
            </pre>
          </div>
          {/* <ToastContainer toastStyle={{ top: "50px" }} /> */}
        </div>
      </div>
    );
  }
}
