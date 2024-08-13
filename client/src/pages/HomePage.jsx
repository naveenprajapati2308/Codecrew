import { useEffect, useState, useContext } from "react";
import Problem_card from "../components/Problem_card";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import Alert from "react-bootstrap/Alert";
import Loader from "../components/Loader";
import UserContext from "../context/UserContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from 'react-router-dom';

export default function HomePage() {
  const [problems, setProblems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState(false);
  const { showToast, setShowtoast , user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (showToast) {
      toast.info(`😊 Welcome Back ${user?.username ? user.username :""}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setShowtoast(false);
    }
  }, []);


  

  useEffect(() => {
      if (location.state?.showLoginToast) {
          toast.success('Logged in successfully' , {autoClose: 2000});
          navigate('.', { replace: true, state: null });
          //clear the state after showing the toast. If not, state will be there even if you refresh.
      }
      if (location.state?.showSignupToast) {
          toast.success('Account Created Succesfully' , {autoClose: 2000});
          navigate('.', { replace: true, state: null });
          //clear the state after showing the toast. If not, state will be there even if you refresh.
      }
  }, [location]);


  useEffect(() => {
    axios
      .get("/api/problems")
      .then(({ data }) => {
        setProblems(() => data);
        setLoading(() => false);
      })
      .catch((err) => {
        console.log(err);
        setFailure(() => err);
        setLoading(() => false);
      });
  }, []);

  if (loading) {
    return <Loader color="blue" />;
  }

  if (failure) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{failure.message}</p>
        <p>{failure.response?.data}</p>
      </Alert>
    );
  }

  return (
    <div>
      <ToastContainer style={{top : "50px"}} />
      <div className="container tw-mb-24">
        {problems && problems.length > 0
          ? problems.map((problem) => (
              <Problem_card {...problem} key={problem._id} />
            ))
          : null}
      </div>
    </div>
  );
}
