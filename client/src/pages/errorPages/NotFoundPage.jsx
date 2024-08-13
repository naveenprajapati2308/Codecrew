import { Link , NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="tw-h-screen tw-flex tw-items-center tw-justify-center dark:tw-bg-gray-900">
      <section className="tw-bg-white dark:tw-bg-gray-900 tw-h-sc">
        <div className="tw-py-8 tw-px-4 tw-mx-auto tw-max-w-screen-xl lg:tw-py-16 lg:tw-px-6">
          <div className="tw-mx-auto tw-max-w-screen-sm tw-text-center">
            <h1 className="tw-mb-4 tw-text-7xl tw-tracking-tight tw-font-extrabold lg:tw-text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="tw-mb-4 tw-text-3xl tw-tracking-tight tw-font-bold tw-text-gray-900 md:tw-text-4xl dark:tw-text-white">
              Something's missing.
            </p>
            <p className="tw-mb-4 tw-text-lg tw-font-light tw-text-gray-500 dark:tw-text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Link
              to="/"
            >
              <span className="tw-inline-flex tw-text-white tw-bg-blue-800 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:focus:ring-primary-900 tw-my-4">Back to Homepage</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
