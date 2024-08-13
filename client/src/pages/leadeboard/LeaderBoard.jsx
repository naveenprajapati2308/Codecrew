import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function LeaderBoard() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getLeaderBoard() {
      try {
        setLoading((prev) => true);
        const { data } = await axios.get("/api/site/leaderboard");
        setUsers(data);
      } catch (error) {
        if (error.response) {
          alert(err.response.data.message);
        } else {
          alert(err.message);
        }
      } finally {
        setLoading((prev) => false);
      }
    }

    getLeaderBoard();
  }, []);


  return (
<>
<div className="tw-flex tw-flex-wrap tw-mb-5 md:tw-p-16 tw-p-0">
  <div className="tw-w-full tw-max-w-full  tw-mb-6 tw-mx-auto">
    <div className="tw-relative tw-flex tw-flex-col tw-break-words tw-min-w-0  tw-rounded-[.95rem] tw-bg-white tw-m-5 dark:tw-bg-gray-800">
      <div className="tw-relative tw-flex tw-flex-col tw-min-w-0 tw-break-words  tw-bg-clip-border tw-rounded-2xl tw-border-stone-200 tw-bg-light/30 dark:tw-border-gray-600 dark:tw-bg-gray-900">
        {/* Card Header */}
        <div className="tw-px-9  tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-min-h-[70px] tw-pb-0 tw-bg-transparent">
          <h3 className="tw-m-2 tw-ml-0 tw-font-medium tw-text-3xl/tight tw-text-dark dark:tw-text-white">
            Leaderboard
          </h3>
        </div>
        {/* End Card Header */}
        {/* Card Body */}
        <div className="tw-py-8 tw-pt-6 tw-px-9">
          <div className="tw-overflow-x-auto">
            <table className="tw-w-full tw-my-0 tw-align-middle tw-text-dark tw-border-neutral-200 dark:tw-text-gray-300 dark:tw-border-gray-600">
              <thead>
                <tr className="tw-font-semibold tw-text-[0.95rem] tw-text-secondary-dark dark:tw-text-gray-400">
                  <th className="tw-pb-3 tw-text-start tw-min-w-[175px]">
                    Rank
                  </th>
                  <th className="tw-pb-3 tw-text-start tw-min-w-[175px]">
                    Profile
                  </th>
                  <th className="tw-pb-3 tw-text-center tw-min-w-[100px]">
                    Submissions
                  </th>
                  <th className="tw-pb-3 tw-text-center tw-min-w-[100px]">
                    Problems Solved
                  </th>
                  <th className="tw-pb-3 tw-pr-12 tw-text-center tw-min-w-[175px]">
                    Points
                  </th>
                  <th className="tw-pb-3 tw-pr-12 tw-text-center tw-min-w-[100px]">
                    Joined At
                  </th>
                </tr>
              </thead>
              <tbody className="tw-h-96 tw-overflow-y-auto tw-w-full">
                {users &&
                  users.length > 0 &&
                  users.map((user, i) => (
                    <tr
                      key={user.username}
                      className="tw-w-full tw-border-b tw-border-dashed last:tw-border-b-0 dark:tw-border-gray-600"
                    >
                      <td className="tw-p-3 tw-pr-0 tw-text-start">
                        <span className="tw-font-semibold tw-text-light-inverse tw-text-md/normal dark:tw-text-gray-200">
                          {i + 1}
                        </span>
                      </td>
                      <td className="tw-p-3 tw-pl-0">
                        <div className="tw-flex tw-items-center">
                          <div className="tw-relative tw-inline-block tw-shrink-0 tw-rounded-2xl tw-me-3">
                            <img
                              src={user.image.url}
                              className="tw-w-[50px] tw-h-[50px] tw-inline-block tw-shrink-0 tw-rounded-2xl"
                              alt={user.username}
                            />
                          </div>
                          <div className="tw-flex tw-flex-col tw-justify-start">
                            <Link
                              to={`/user/${user.username}`}
                              className="tw-mb-1 tw-font-semibold tw-transition-colors tw-duration-200 tw-ease-in-out tw-text-lg/normal tw-text-secondary-inverse dark:tw-text-gray-200 hover:tw-text-primary"
                            >
                              {user.username}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="tw-p-3 tw-pr-0 tw-text-center">
                        <span className="tw-font-semibold tw-text-light-inverse tw-text-md/normal dark:tw-text-gray-200">
                          {user.submissionCount}
                        </span>
                      </td>
                      <td className="tw-p-3 tw-pr-0 tw-text-center">
                        <span className="tw-text-center tw-align-baseline tw-inline-flex tw-px-2 tw-py-1 tw-mr-auto tw-items-center tw-font-semibold tw-text-base/none tw-text-success tw-bg-success-light tw-rounded-lg dark:tw-bg-green-800 dark:tw-text-green-300">
                          {user.solvedCount}
                        </span>
                      </td>
                      <td className="tw-p-3 tw-pr-12 tw-text-center">
                        <span className="tw-text-center tw-align-baseline tw-inline-flex tw-px-4 tw-py-3 tw-mr-auto tw-items-center tw-font-semibold tw-text-[.95rem] tw-leading-none tw-text-primary tw-bg-primary-light tw-rounded-lg dark:tw-bg-blue-900 dark:tw-text-blue-300">
                          {user.points}
                        </span>
                      </td>
                      <td className="tw-pr-0 tw-text-center">
                        <span className="tw-font-semibold tw-text-light-inverse tw-text-md/normal dark:tw-text-gray-200">
                          {formatDistanceToNow(new Date(user.createdAt))} ago
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* End Card Body */}
      </div>
    </div>
  </div>
</div>


</>

  );
}

export default LeaderBoard;
