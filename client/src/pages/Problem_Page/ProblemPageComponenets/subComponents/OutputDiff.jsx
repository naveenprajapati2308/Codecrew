import React from 'react';
// import * as Diff from 'diff';
import {diffWords} from 'diff'

const OutputDiff = ({ judgement, darkMode = true }) => {
  const { correctFormat, result, correctOutput, userOutput, testCase, passed, total } = judgement;

  if (!correctFormat) {
    return (
      <div className={`p-4 ${darkMode ? 'tw-bg-gray-900 tw-text-white' : 'tw-bg-white tw-text-gray-900'} tw-shadow-lg tw-rounded-lg  tw-mx-auto tw-my-8`}>
        <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Output Comparison</h2>
        <p className="tw-text-red-500 tw-font-semibold">{result}</p>
      </div>
    );
  }

  const diff = diffWords(userOutput , correctOutput);

  return (
    <div className={`tw-p-8 ${darkMode ? 'tw-bg-gray-900 tw-text-white' : 'tw-bg-white tw-text-gray-900'} tw-shadow-lg tw-rounded-lg  tw-mx-auto tw-my-8`}>
      <h2 className="tw-text-2xl tw-font-bold tw-mb-4">Output Comparison</h2>

      <div className="tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-mb-4 dark:tw-bg-gray-700">
        <p className="tw-font-semibold"><strong>Result:</strong> {result}</p>
        <p className="tw-font-semibold"><strong>Passed:</strong> {passed}/{total}</p>
      </div>
      <div className="tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-mb-4 dark:tw-bg-gray-700">
        <p className="tw-font-semibold">Failed Test Case:</p>
        <pre className="tw-whitespace-pre-wrap tw-font-mono">{testCase}</pre>
      </div>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
        <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md dark:tw-bg-gray-800">
          <h3 className="tw-text-xl tw-font-semibold tw-mb-2">Your Output</h3>
          <pre className="tw-font-mono tw-whitespace-pre-wrap">{userOutput}</pre>
        </div>
        <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md dark:tw-bg-gray-800">
          <h3 className="tw-text-xl tw-font-semibold tw-mb-2">Expected Output</h3>
          <pre className="tw-font-mono tw-whitespace-pre-wrap">{correctOutput}</pre>
        </div>
        <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md dark:tw-bg-gray-800">
          <h3 className="tw-text-xl tw-font-semibold tw-mb-2">Output Difference</h3>
          <pre className="tw-font-mono tw-whitespace-pre-wrap">
            {diff.map((part, index) => {
              const className = part.added ? 'tw-bg-green-100 tw-text-green-700' : part.removed ? 'tw-bg-red-100 tw-text-red-700' : '';
              return (
                <span key={index} className={className}>
                  {part.value}
                </span>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default OutputDiff;
