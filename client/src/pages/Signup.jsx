import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import BackButton from "../components/styled-components/BackButton";

export default function Signup() {
  const { signup } = useContext(UserContext);

  const Navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(() => true);
    // console.log(data);
    const { username, email, password } = data;


    async function doStuff(params) {
        return new Promise((resolve , reject)=>{
            setTimeout(()=> (reject({message : "done"})), 2000)
        })
    }

    try {
        await signup(username, password, email);
        Navigate("/", { state: { showSignupToast: true } }); //send state when navigating

      console.log(data);
    } catch (error) {
      if (error.response) {
        setErr(() => error.response.data);
      } else {
        setErr(() => error);
      }
    }
    setLoading(false);
  }

  return (
    <div className="tw-bg-[#222529] tw-dark">
      <Link to="/">
        {/* <Button
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            zIndex: 1000,
            width: "60px",
          }}
          variant="secondary"
        > */}
        <BackButton size={200} />
        {/* <ArrowLeft /> */}
        {/* </Button> */}
      </Link>
      <div className="tw-h-screen tw-w-screen tw-flex tw-justify-around tw-items-center ">
        <section className="tw-flex tw-flex-col tw-items-center tw-pt-6 lg:tw-w-2/3 tw-w-full">
        {err && (
          <Alert variant="danger" onClose={() => setErr(false)} dismissible>
            <Alert.Heading>{err.type ? err.type : err.name}</Alert.Heading>
            <p>{err.message}</p>
          </Alert>
        )}
          <div className="tw-w-full tw-bg-white tw-shadow dark:tw-border md:tw-mt-0 sm:tw-max-w-md xl:tw-p-0 dark:tw-bg-gray-800 dark:tw-border-gray-700">
            <div className="tw-p-6 tw-space-y-4 md:tw-space-y-6 sm:tw-p-8">
              <h1 className="tw-text-xl tw-font-bold tw-leading-tight tw-tracking-tight tw-text-gray-900 md:tw-text-2xl dark:tw-text-white">
                Create an account
              </h1>
              <form
                className="tw-space-y-4 md:tw-space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    username
                  </label>
                  <input
                    type="text"
                    name="username"
                    maxLength={13}
                    id="username"
                    className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm  focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                    placeholder="Emelia Erickson"
                    required
                    {...register("username", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    maxLength={29}
                    name="email"
                    id="email"
                    className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm  focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                    placeholder="emelia90@gmai.com"
                    required
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    minLength={6}
                    id="password"
                    placeholder="••••••••"
                    className="tw-bg-gray-50 tw-border tw-border-gray-300 tw-text-gray-900 sm:tw-text-sm  focus:tw-ring-blue-600 focus:tw-border-blue-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                    required
                    {...register("password", { required: true })}
                  />
                </div>
                <button
                  type="submit"
                  className="tw-w-full tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-medium  tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
                >
                  Create an account{" "}  
                  {loading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <p className="tw-text-sm tw-font-light tw-text-gray-500 dark:tw-text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login"
                    className="tw-font-medium tw-text-blue-600 hover:tw-underline dark:tw-text-blue-500"
                    href="/signin"
                  >
                    Sign in here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <>
      <Link to="/">
        <Button
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            zIndex: 1000,
            width: "60px",
          }}
          variant="secondary"
        >
          <ArrowLeft />
        </Button>
      </Link>

      {err && (
        <Alert variant="danger" onClose={() => setErr(false)} dismissible>
          <Alert.Heading>{err.type ? err.type : err.name}</Alert.Heading>
          <p>{err.message}</p>
        </Alert>
      )}

      {/* ****************************************************************** */}
      <div className="row mt-5 pt-5">
        <h1 className="col-6 offset-3 tw-font-semibold tw-text-4xl tw-mb-8">
          SignUp
        </h1>
        <div className="col-6 offset-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: true })}
                className="form-control"
              />
              <div className="valid-feedback">Looks good</div>
              <div className="invalid-feedback">Invalid</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="form-control"
              />
              <div className="valid-feedback">Looks good</div>
              <div className="invalid-feedback">Invalid</div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="form-control"
              />
              <div className="valid-feedback">Looks good</div>
              <div className="invalid-feedback">Invalid</div>
            </div>

            <button className="btn btn-success">
              SignUp{"  "}
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
