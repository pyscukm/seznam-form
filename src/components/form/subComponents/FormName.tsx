import React, {FunctionComponent} from "react";
import {Col, Form} from "react-bootstrap";
import {FormComponentProps} from "../FormComponent";

const FormName: FunctionComponent<FormComponentProps> = ({setForm}) => (
    <Form.Group as={Col}>
        <Form.Label>
            Jméno
        </Form.Label>
        <Col>
            <Form.Control
                onChange={(event) => setForm("name", event.target.value)}
                type="text"
                placeholder="Jméno"
            />
        </Col>
    </Form.Group>
);

export default React.memo(FormName, () => false);

