import { useState, useContext } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
// import { c, cpp, java, python } from './solutions'
import { Clipboard } from "react-bootstrap-icons";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy, a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../../context/UserContext";

export default function Solution_code({
  cSolution,
  cppSolution,
  javaSolution,
  pythonSolution,
}) {
  const { darkMode } = useContext(UserContext);
  return (
    <div className="container tw-mt-10">
      <ToastContainer />

      <Tab.Container id="left-tabs-example" defaultActiveKey="cpp">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="cpp">C++</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="c">C</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="python">Python</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="java">Java</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="cpp">
                <div className="container ">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(cppSolution);
                      toast.info("Copied", { autoClose: 1000 });
                    }}
                    className="btn btn-secondary mb-3 btn-lg tw-flex tw-items-center tw-justify-around"
                  >
                    Solution in C++ :{" "}
                    <Badge bg="">
                      <Clipboard size={20} />
                    </Badge>
                  </button>
                  <div className="border p-3 rounded">
                    <SyntaxHighlighter
                      showLineNumbers={true}
                      language="cpp"
                      style={darkMode ? a11yDark : coy}
                    >
                      {cppSolution}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="c">
                <div className="container">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(cSolution);
                      toast.info("Copied", { autoClose: 1000 });
                    }}
                    className="btn btn-secondary mb-3 btn-lg tw-flex tw-items-center tw-justify-around"
                  >
                    Solution in C :{" "}
                    <Badge bg="">
                      <Clipboard size={20} />
                    </Badge>
                  </button>
                  <div className="border p-3 rounded">
                    <SyntaxHighlighter
                      showLineNumbers={true}
                      language="cpp"
                      style={darkMode ? a11yDark : coy}
                    >
                      {cSolution}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="python">
                <div className="container ">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(pythonSolution);
                      toast.info("Copied", { autoClose: 1000 });
                    }}
                    className="btn btn-secondary mb-3 btn-lg tw-flex tw-items-center tw-justify-around"
                  >
                    Solution in Python :{" "}
                    <Badge bg="">
                      <Clipboard size={20} />
                    </Badge>
                  </button>
                  <div className="border p-3 rounded">
                    <SyntaxHighlighter
                      showLineNumbers={true}
                      language="cpp"
                      style={darkMode ? a11yDark : coy}
                    >
                      {pythonSolution}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="java">
                <div className="container ">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(javaSolution);
                      toast.info("Copied", { autoClose: 1000 });
                    }}
                    className="btn btn-secondary mb-3 btn-lg tw-flex tw-items-center tw-justify-around"
                  >
                    <span className="">Solution in Java </span>
                    <Badge bg="">
                      <Clipboard size={20} />
                    </Badge>
                  </button>
                  <div className="border p-3 rounded">
                    <SyntaxHighlighter
                      showLineNumbers={true}
                      language="cpp"
                      style={darkMode ? a11yDark : coy}
                    >
                      {javaSolution}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
