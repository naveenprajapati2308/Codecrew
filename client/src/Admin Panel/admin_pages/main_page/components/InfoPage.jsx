import React, { useState } from 'react';

const InfoPage = ({ data }) => {
    // Sample data
    const totalProblems = data.problems.total;
    const totalUsers = data.userInfo.count;
    const totalSubmissions = data.submissionInfo.total;
    const acceptedSubmissions = data.submissionInfo.accepted;
    const rejectedSubmissions = data.submissionInfo.rejected;
    const totalViews = "NOT AVAILABLE";
    const totalComments = "NOT AVAILABLE";
    const totalLikes = "NOT AVAILABLE";
    const totalActiveUsers = data.userInfo.count;
    const runCount = data.jobsCount;

    return (

        <div className={`'dark:tw-bg-gray-900 dark:tw-text-white' 'tw-bg-gray-100 tw-text-black' tw-min-h-screen tw-p-8`}>
            <div className="tw-max-w-7xl tw-mx-auto tw-p-4 tw-bg-white dark:tw-bg-gray-800 tw-shadow-2xl dark:tw-shadow-cyan-500/50 ">
                <h1 className="tw-text-2xl tw-font-bold tw-mb-6">Admin Dashboard</h1>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                    <div className="tw-bg-blue-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Problems</h2>
                        <p className="tw-text-3xl tw-mt-2">{totalProblems}</p>
                    </div>
                    <div className="tw-bg-green-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Users</h2>
                        <p className="tw-text-3xl tw-mt-2">{totalUsers}</p>
                    </div>
                    <div className="tw-bg-purple-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Submissions</h2>
                        <p className="tw-text-3xl tw-mt-2">{totalSubmissions}</p>
                        <div className="tw-mt-4">
                            <div className="tw-bg-green-600 tw-text-white tw-p-3  tw-shadow">
                                <h3 className="tw-text-md tw-font-semibold">Accepted Submissions</h3>
                                <p className="tw-text-xl tw-mt-1">{acceptedSubmissions}</p>
                            </div>
                            <div className="tw-bg-red-600 tw-text-white tw-p-3  tw-shadow tw-mt-2">
                                <h3 className="tw-text-md tw-font-semibold">Rejected Submissions</h3>
                                <p className="tw-text-xl tw-mt-1">{rejectedSubmissions}</p>
                            </div>
                        </div>
                    </div>
                    <div className="tw-bg-yellow-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Views</h2>
                        <p className="tw-text-3xl tw-mt-2">{totalViews}</p>
                    </div>
                    <div className="tw-bg-teal-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Comments</h2>
                        <p className="tw-text-3xl tw-mt-2">{totalComments}</p>
                    </div>
                    <div className="tw-bg-indigo-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Likes</h2>
                        <p className="tw-text-3xl tw-mt-2">{totalLikes}</p>
                    </div>
                    <div className="tw-bg-pink-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Active Users</h2>
                        <p className="tw-text-3xl tw-mt-2">{totalActiveUsers}</p>
                    </div>
                    <div className="tw-bg-orange-500 tw-text-white tw-p-6  tw-shadow">
                        <h2 className="tw-text-lg tw-font-semibold">Total Runs</h2>
                        <p className="tw-text-3xl tw-mt-2">{runCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
