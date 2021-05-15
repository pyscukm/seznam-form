import React, {FunctionComponent} from "react";
import {Col, Form} from "react-bootstrap";
import {FormComponentProps} from "../FormComponent";

const FormMessage: FunctionComponent<FormComponentProps> = ({setForm}) => (
    <Form.Group as={Col}>
        <Form.Label>
            <span className={"RedText"}>* </span>Zpráva
        </Form.Label>
        <Col>
            <Form.Control
                onChange={(event) => setForm("message", event.target.value)}
                as="textarea"
                placeholder="Zpráva"
            />
        </Col>
    </Form.Group>
);

export default React.memo(FormMessage, () => false);

