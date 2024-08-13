import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MonacoEditor from '@monaco-editor/react';

export default function Solution({ code ,language, ...props}) {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {language}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4>Centered Modal</h4> */}
                    <MonacoEditor
                    height="60vh"
                    language={language}
                    theme={"vs-dark"}
                    value={code}
                    // onChange={onChange}
                    options={{
                        wordWrap: 'on',
                        minimap: { enabled: false }
                    }}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}