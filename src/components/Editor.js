import React, { useState } from "react";
import AceEditor from "react-ace";
import "../assets/css/Editor.css";

import Sidebar from "../components/ui/Sidebar";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Editor = (props) => {
    const [editorValue, setEditorValue] = useState();
    const [output, setOutput] = useState()
    const copyText = () => {
        const [file] = document.querySelector("input[type='file']").files;
        const reader = new FileReader();

        reader.onload = () => {
            setEditorValue(reader.result);
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    const handleRun = async () => {
        try {
            const response = await fetch("http://localhost:8080/hackerearth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    program: editorValue,
                }),
            });

            const resData = await response.json();
            setOutput(resData.data);
            console.log(resData);
        } catch (error) {
            console.log(error);
            setOutput("Invalid syntax")
        }
    };

    return (
        <div className="bg">
            <Container fluid className="p-1">
                <Row>
                    <Col>
                        <AceEditor
                            mode="python"
                            theme="monokai"
                            width="100%"
                            height="90vh"
                            className="editor__1 rounded-3"
                            fontSize={18}
                            value={editorValue}
                            onChange={(value) => setEditorValue(value)}
                            enableBasicAutocompletion={true}
                            enableLiveAutocompletion={true}
                            enableSnippets={true}
                            showPrintMargin={false}
                        />
                        <Container fluid className="p-0 mt-2">
                            <Row>
                                <Col>
                                    <Form>
                                        <Form.Group
                                            controlId="formFile"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="file"
                                                onChange={copyText}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col>
                                    <Container
                                        fluid
                                        className="p-0 d-flex justify-content-end"
                                    >
                                        <Button
                                            variant="success"
                                            onClick={handleRun}
                                        >
                                            Run
                                        </Button>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <AceEditor
                            theme="monokai"
                            width="100%"
                            height="90vh"
                            className="editor__1 rounded-3"
                            fontSize={18}
                            showGutter={false}
                            showPrintMargin={false}
                            highlightActiveLine={false}
                            readOnly={true}
                            value={output}
                            placeholder="// Run code to see output"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Editor;
