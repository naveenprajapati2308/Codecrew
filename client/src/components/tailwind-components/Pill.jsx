import React from 'react';

export default function Pill({ mode, text }) {
  const getPillClasses = () => {
    switch (mode) {
      case 'basic':
        return 'tw-bg-blue-300 tw-text-blue-800 tw-dark:tw-bg-blue-900 dark:tw-text-blue-300';
      case 'dark':
        return 'tw-bg-gray-300 tw-text-gray-800 dark:tw-bg-gray-700 dark:tw-text-gray-300';
      case 'hard':
        return 'tw-bg-red-300 tw-text-red-800 dark:tw-bg-red-900 dark:tw-text-red-300';
      case 'easy':
        return 'tw-bg-green-300 tw-text-green-800 dark:tw-bg-green-900 dark:tw-text-green-300';
      case 'medium':
        return 'tw-bg-yellow-300 tw-text-yellow-800 dark:tw-bg-yellow-900 dark:tw-text-yellow-300';
      case 'indigo':
        return 'tw-bg-indigo-300 tw-text-indigo-800 dark:tw-bg-indigo-900 dark:tw-text-indigo-300';
      case 'purple':
        return 'tw-bg-purple-300 tw-text-purple-800 dark:tw-bg-purple-900 dark:tw-text-purple-300';
      case 'pink':
        return 'tw-bg-pink-300 tw-text-pink-800 dark:tw-bg-pink-900 dark:tw-text-pink-300';
      default:
        return 'tw-bg-blue-300 tw-text-blue-800 dark:tw-bg-blue-900 dark:tw-text-blue-300';
    }
  };

  return (
    <>
    <span className={`tw-text-sm tw-my-auto tw-font-medium tw-me-2 tw-px-2.5 tw-py-0.5 tw-rounded ${getPillClasses()}`}>
      {text}
    </span>
    </>
  );
}