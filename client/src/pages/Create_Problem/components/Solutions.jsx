import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import RCE from '../../../components/RCE';


export default function Solutions({control , errors}) {
    return (
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
              <Nav.Link eventKey="java">Java</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="python">Python</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="cpp"><RCE name={"cppSolution"} control={control} language="cpp" errors={errors} /></Tab.Pane>
            <Tab.Pane eventKey="c"><RCE name={"cSolution"} control={control} language="c" errors={errors} /></Tab.Pane>
            <Tab.Pane eventKey="java"><RCE name={"javaSolution"} control={control} language="java" errors={errors} /></Tab.Pane>
            <Tab.Pane eventKey="python"><RCE name={"pythonSolution"} control={control} language="python" errors={errors} /></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    )
}