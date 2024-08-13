import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./component.css";

import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { MoonStars, BrightnessHigh } from "react-bootstrap-icons";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchBar from "./SearchBar";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function NavbarComponent() {
  const { user, logout, toggleDarkMode, darkMode } = useContext(UserContext);
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logoutHandler(ev) {
    ev.preventDefault();
    try {
      await logout();
      toast.info("Logged OUT successfully", { autoClose: 2000 });
      handleClose()
    } catch (error) {
      alert(error.message);
    }
  }
  const [toggled, setToggled] = useState(false);

  function toggleNavbar() {
    setToggled((prev) => !prev);
    console.log("clicked");
  }

  function profileHandler(params) {
    handleClose()
    navigate(`/user/${user.username}`)
  }

  return (
    <nav
      className={`tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-py-4 tw-bg-white dark:tw-bg-gray-800 lg:tw-py-4 tw-pr-0 lg:tw-px-12
       lg:tw-shadow tw-border-solid tw-border-t-2 tw-border-blue-700 dark:tw-border-blue-500`}
    >
      <div className="tw-flex tw-justify-between lg:tw-w-auto tw-w-full lg:tw-border-b-0 tw-pl-6 tw-pr-2 tw-border-solid tw-border-b-2 tw-border-gray-300 dark:tw-border-gray-700 tw-pb-5 lg:tw-pb-0">
        <div className="tw-flex tw-items-center tw-flex-shrink-0 tw-text-gray-800 dark:tw-text-gray-200 tw-mr-16">
          <span className="tw-font-semibold tw-text-3xl tw-tracking-tight">
            <Link to="/"> {"< AK />"}</Link>
          </span>
        </div>
        <div className="tw-block lg:tw-hidden ">
          <button
            onClick={toggleNavbar}
            id="nav"
            className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-border-2 tw-rounded tw-text-blue-700 dark:tw-text-blue-300 tw-border-blue-700 dark:tw-border-blue-500 hover:tw-text-blue-700 hover:tw-border-blue-700 dark:hover:tw-text-blue-500 dark:hover:tw-border-blue-300"
          >
            <svg
              className="tw-fill-current tw-h-3 tw-w-3 dark:tw-text-gray-200"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          toggled ? "tw-hidden" : ""
        } menu tw-w-full lg:tw-block tw-flex-grow lg:tw-flex lg:tw-items-center lg:tw-w-auto lg:tw-px-3 tw-px-8`}
      >
        <div className="text-md tw-font-bold tw-text-blue-700 dark:tw-text-blue-300 lg:tw-flex-grow">
          <Link
            to="/admin/dashboard"
            className="tw-block tw-mt-4 lg:tw-inline-block lg:tw-mt-0 hover:tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-blue-700 dark:hover:tw-bg-blue-500 tw-mr-2"
          >
            Admin Panel
          </Link>
          <Link
            to="/submissions"
            className="tw-block tw-mt-4 lg:tw-inline-block lg:tw-mt-0 hover:tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-blue-700 dark:hover:tw-bg-blue-500 tw-mr-2"
          >
            Submissions
          </Link>
          <Link to={'/leaderboard'}
        className="tw-block tw-mt-4 lg:tw-inline-block lg:tw-mt-0 hover:tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-blue-700 dark:hover:tw-bg-blue-500 tw-mr-2">
        Leaderboard
      </Link>
        </div>
        <button onClick={toggleDarkMode} className="btn tw-mr-1">
            {darkMode ? <MoonStars size={25} /> : <BrightnessHigh size={25} />}
          </button>
        <div className="tw-relative tw-mx-auto tw-text-gray-600 dark:tw-text-gray-300 lg:tw-block">
          <SearchBar />
        </div>

        {user ? (
          <>
            <div className="tw-mx-4 tw-cursor-pointer">
              <Avatar
                onClick={handleClick}
                alt="Remy Sharp"
                src={user.image.url}
              />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <h4 className="tw-font-semibold ">{user.username}</h4>
              </MenuItem>
              <MenuItem onClick={profileHandler}>
                <div className="tw-w-full tw-text-center">
                    Profile
                </div>
              </MenuItem>
              <MenuItem className="" onClick={logoutHandler}>
                  <span className="tw-text-center tw-w-full">Logout</span>      
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {" "}
            <div className="tw-flex ">
              <Link
                to="/signup"
                className="tw-block text-md tw-px-4 tw-py-2 tw-rounded tw-text-blue-700 dark:tw-text-blue-300 tw-ml-2 tw-font-bold hover:tw-text-white tw-mt-4 hover:tw-bg-blue-700 dark:hover:tw-bg-blue-500 lg:tw-mt-0"
              >
                Sign up
              </Link>

              <Link
                to="/login"
                className="tw-block text-md tw-px-4 tw-ml-2 tw-py-2 tw-rounded tw-text-blue-700 dark:tw-text-blue-300 tw-font-bold hover:tw-text-white tw-mt-4 hover:tw-bg-blue-700 dark:hover:tw-bg-blue-500 lg:tw-mt-0"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Link className="remove-underline" to="/">
          <Navbar.Brand>Code bavarchi</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className="remove-underline" to="/admin/dashboard">
              <Nav.Link as={"span"}>Admin Panel</Nav.Link>
            </Link>
            <Link className="remove-underline" to="/submissions">
              <Nav.Link as={"span"}>Submissions</Nav.Link>
            </Link>
            {/* <Nav.Link href="#action2">Coming soon</Nav.Link> */}
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Coming soon</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Coming soon</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Coming soon</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Coming soon
            </Nav.Link>
          </Nav>
          <button onClick={toggleDarkMode} className="btn">
            {darkMode ? <MoonStars size={25} /> : <BrightnessHigh size={25} />}
          </button>
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            /> */}
            {user ? null : (
              <>
                <Link to="/signup">
                  <Button variant="outline-primary">Signup</Button>
                </Link>
                <span className="m-1"></span>
                <Link to="/login">
                  <Button variant="outline-success">Login</Button>
                </Link>
              </>
            )}

            {user ? (
              <>
                <Avatar alt="Remy Sharp" src={user.image.url} />
                <h4 className="m-2 tw-font-semibold tw-text-lg">
                  <Link
                    className="remove-underline"
                    to={`/user/${user.username}`}
                  >
                    @{user.username}
                  </Link>
                </h4>
                <Button onClick={logoutHandler} variant="outline-danger">
                  Logout
                </Button>
              </>
            ) : null}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
