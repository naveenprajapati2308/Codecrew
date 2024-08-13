import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useNavigate, useParams } from "react-router-dom";
import Pill from "../../components/tailwind-components/Pill";

import Loader from "../../components/Loader";
import HeatChart from "../../components/HeatChart";
import NotFoundPage from "../errorPages/NotFoundPage";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import UserContext from "../../context/UserContext";
import ProfileImage from "./components/ProfileImage";


const ProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [value, setValue] = React.useState("4");
  const navigate = useNavigate();
  const { user} = useContext(UserContext)

  // const id = "test"
  const { username } = useParams();

  useEffect(() => {
    async function doStuff() {
      try {
        setLoading(prev=>true);
        const { data: userData } = await axios.get(`/api/user/${username}`);

        const accepted = userData.submissions.filter(
          (s) => s.status == "Accepted"
        );
        const rejected = userData.submissions.filter(
          (s) => s.status == "Rejected"
        );

        userData.accepted = accepted;
        userData.rejected = rejected;
        userData.accuracy = (
          (100 * accepted.length) /
          (accepted.length + rejected.length)
        ).toFixed(2);

        setUserProfileData((prev) => userData);
        setLoading(prev=>false);
        // console.log(userData)
      } catch (error) {
        console.log(error);
        // alert(error.message);
        setLoading(false);
        navigate(`/error`);
      }
      finally{
      }
      // console.log("re-render");
    }
    
    doStuff();
  }, [username ]);
  // console.log("re-render out");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <>
        <Loader color="cyan" />
      </>
    );
  }

  return (
    <div
      className={`tw-min-h-screen tw-bg-gray-100 dark:tw-bg-gray-900 dark:tw-text-gray-100`}
    >
      <div className="container tw-mx-auto tw-p-6">
        <header className="tw-mb-6 tw-flex tw-items-center tw-justify-between">
          <h1 className="tw-text-3xl tw-font-bold">
            @{userProfileData.username}
          </h1>
        </header>

        {/* ************************************************************************************************************************************************* */}
        <section className="tw-mb-10 tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-lg dark:tw-bg-gray-800">
          <div className="tw-flex tw-flex-col tw-items-center lg:tw-flex-row">
            <div className="tw-mb-6 tw-flex tw-flex-col tw-items-center lg:tw-mb-0 lg:tw-w-1/3 lg:tw-items-start">
            
            <ProfileImage userProfileData={userProfileData} setUserProfileData={setUserProfileData} />

              <h2 className="tw-mb-2 tw-text-2xl tw-font-semibold">
                {userProfileData.username}
              </h2>
              <p className="tw-mb-2 tw-text-gray-500 dark:tw-text-gray-400">
                {userProfileData.email}
              </p>
              <p className="tw-text-lg tw-font-medium">
                Solved:{" "}
                <span className="tw-font-normal">
                  {userProfileData.solved.length}
                </span>
              </p>
              <p className="tw-text-lg tw-font-medium">
                Accuracy:{" "}
                <span className="tw-font-normal">
                  {userProfileData.accuracy} %
                </span>
              </p>
            </div>
            <div className="tw-flex tw-flex-col tw-space-y-4 lg:tw-w-2/3">
              <div className="tw-rounded-lg tw-bg-gray-100 tw-p-4 tw-shadow dark:tw-bg-gray-700">
                <h3 className="tw-mb-2 tw-text-lg tw-font-semibold">
                  Statistics
                </h3>
                <div className="tw-grid tw-grid-cols-1 tw-gap-4 sm:tw-grid-cols-2">
                  <p className="tw-text-lg tw-font-medium">
                    Accepted Submissions:{" "}
                    <span className="tw-font-normal">
                      {userProfileData.accepted.length}
                    </span>
                  </p>
                  <p className="tw-text-lg tw-font-medium">
                    Rejected Submissions:{" "}
                    <span className="tw-font-normal">
                      {userProfileData.rejected.length}
                    </span>
                  </p>
                  <p className="tw-text-lg tw-font-medium">
                    Acceptance Rate:{" "}
                    <span className="tw-font-normal">
                      {userProfileData.accuracy}
                    </span>
                  </p>
                  <p className="tw-text-lg tw-font-medium">
                    Points{" : "}
                    <span className="tw-font-normal">{userProfileData.points}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ************************************************************************************************************************************************* */}

        {/* ************************************************************************************************************************************************* */}
        <div className="tw-my-10">
          <HeatChart submissions={userProfileData.submissions} />
        </div>
        {/* ************************************************************************************************************************************************* */}

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                // textColor="gray"
                textColor=""
                variant="scrollable"
                // scrollButtons="auto"
              >
                <Tab
                  sx={{ fontWeight: "bold" }}
                  label="Liked Problems"
                  value="1"
                />
                <Tab
                  sx={{ fontWeight: "bold" }}
                  label="Disliked Problems"
                  value="2"
                />
                <Tab
                  sx={{ fontWeight: "bold" }}
                  label="Saved Problems"
                  value="3"
                />
                <Tab
                  sx={{ fontWeight: "bold" }}
                  label="Submissions"
                  value="4"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <LikedProblemsTable
                likedProblems={userProfileData.likedProblems}
              />
            </TabPanel>
            <TabPanel value="2">
              <DislikedProblemsTable
                dislikedProblems={userProfileData.dislikedProblems}
              />
            </TabPanel>
            <TabPanel value="3">
              <SavedProblemsTable saved={userProfileData.saved} />
            </TabPanel>
            <TabPanel value="4">
              <div className="">
                <SubmissionsTable submissions={userProfileData.submissions} />
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

const LikedProblemsTable = ({ likedProblems }) => {
  return (
    <section className="tw-mb-10">
      <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-lg dark:tw-bg-gray-800">
        <h2 className="tw-mb-6 tw-text-2xl tw-font-semibold">Liked Problems</h2>
        <div className="tw-h-[600px] tw-overflow-y-auto tw-overflow-x-auto">
          <table className="tw-min-w-full tw-rounded-lg tw-bg-white tw-shadow-md dark:tw-bg-gray-800">
            <thead>
              <tr className="tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:tw-text-gray-300">
                <th className="tw-px-6 tw-py-3 tw-text-left">Problem ID</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Title</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {likedProblems
                ? likedProblems.length > 0
                  ? likedProblems.map((lp) => (
                      <tr
                        key={lp._id}
                        className="tw-border-b dark:tw-border-gray-700"
                      >
                        <td className="tw-px-6 tw-py-4">{lp._id}</td>
                        <td className="tw-px-6 tw-py-4">{lp.name}</td>
                        <td className="tw-px-6 tw-py-4">
                          <Pill mode={lp.difficulty} text={lp.difficulty} />
                        </td>
                      </tr>
                    ))
                  : null
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const DislikedProblemsTable = ({ dislikedProblems }) => {
  return (
    <section className="tw-mb-10">
      <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-lg dark:tw-bg-gray-800">
        <h2 className="tw-mb-6 tw-text-2xl tw-font-semibold">
          Disliked Problems
        </h2>
        <div className="tw-h-[600px] tw-overflow-y-auto tw-overflow-x-auto">
          <table className="tw-min-w-full tw-rounded-lg tw-bg-white tw-shadow-md dark:tw-bg-gray-800">
            <thead>
              <tr className="tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:tw-text-gray-300">
                <th className="tw-px-6 tw-py-3 tw-text-left">Problem ID</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Title</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {dislikedProblems
                ? dislikedProblems.length > 0
                  ? dislikedProblems.map((dp) => (
                      <tr
                        key={dp._id}
                        className="tw-border-b dark:tw-border-gray-700"
                      >
                        <td className="tw-px-6 tw-py-4">{dp._id}</td>
                        <td className="tw-px-6 tw-py-4">{dp.name}</td>
                        <td className="tw-px-6 tw-py-4">
                          <Pill mode={dp.difficulty} text={dp.difficulty} />
                        </td>
                      </tr>
                    ))
                  : null
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const SavedProblemsTable = ({ saved }) => {
  return (
    <section className="tw-mb-10">
      <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-lg dark:tw-bg-gray-800">
        <h2 className="tw-mb-6 tw-text-2xl tw-font-semibold">Saved Problems</h2>
        <div className="tw-h-[600px] tw-overflow-y-auto tw-overflow-x-auto">
          <table className="tw-min-w-full tw-rounded-lg tw-bg-white tw-shadow-md dark:tw-bg-gray-800">
            <thead>
              <tr className="tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:tw-text-gray-300">
                <th className="tw-px-6 tw-py-3 tw-text-left">Problem ID</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Title</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {saved
                ? saved.length > 0
                  ? saved.map((sp) => (
                      <tr
                        key={sp._id}
                        className="tw-border-b dark:tw-border-gray-700"
                      >
                        <td className="tw-px-6 tw-py-4">{sp._id}</td>
                        <td className="tw-px-6 tw-py-4">{sp.name}</td>
                        <td className="tw-px-6 tw-py-4">
                          {/* {sp.difficulty} */}
                          <Pill mode={sp.difficulty} text={sp.difficulty} />
                        </td>
                      </tr>
                    ))
                  : null
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const SubmissionsTable = ({ submissions }) => {
  const navigate = useNavigate();

  return (
    <section className="tw-mb-10">
      <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-lg dark:tw-bg-gray-800">
        <h2 className="tw-mb-6 tw-text-2xl tw-font-semibold">Submissions</h2>
        <div className="tw-h-[600px] tw-overflow-y-auto tw-overflow-x-auto">
          <table className="tw-min-w-full tw-rounded-lg tw-bg-white tw-shadow-md dark:tw-bg-gray-800">
            <thead>
              <tr className="tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:tw-text-gray-300">
                <th className="tw-px-6 tw-py-3 tw-text-left">Submission ID</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Problem</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Status</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">Language</th>
                <th className="tw-px-6 tw-py-3 tw-text-left">time</th>
                {/* <th className="tw-px-6 tw-py-3 tw-text-left">code</th> */}
              </tr>
            </thead>
            <tbody>
              {submissions
                ? submissions.length > 0
                  ? submissions.map((submission) => (
                      <tr
                        onClick={() => {
                          navigate(`/submission/${submission._id}`);
                        }}
                        key={submission._id}
                        className="tw-border-b dark:tw-border-gray-700 tw-cursor-pointer hover:tw-bg-gray-100 dark:hover:tw-bg-gray-700"
                      >
                        <td className="tw-px-6 tw-py-4">{submission._id}</td>
                        <td className="tw-px-6 tw-py-4">
                          {submission.problemName}
                        </td>
                        <td className="tw-px-6 tw-py-4">
                          <Pill
                            mode={
                              submission.status == "Accepted" ? "easy" : "hard"
                            }
                            text={submission.status}
                          />
                        </td>
                        <td className="tw-px-6 tw-py-4">
                          {submission.language}
                        </td>
                        <td className="tw-px-6 tw-py-4">
                          {formatDistanceToNow(submission.createdAt, {
                            addSuffix: true,
                          })}
                        </td>
                      </tr>
                    ))
                  : null
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
