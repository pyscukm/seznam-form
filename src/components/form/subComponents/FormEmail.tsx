import React, {FunctionComponent} from "react";
import {Col, Form} from "react-bootstrap";
import {FormComponentProps, Notification} from "../FormComponent";

export const validateEmail = (email: string, setNotification: (notification: Notification) => void): boolean => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
        return true;
    } else {
        setNotification({
            title: "Validace selhala",
            message: "Email nema správný formát."
        });
        console.error("Not a valid email");
        return false;
    }
};

const FormEmail: FunctionComponent<FormComponentProps> = ({setForm}) => (
    <Form.Group as={Col}>
        <Form.Label>
            <span className={"RedText"}>** </span>Email
        </Form.Label>
        <Col>
            <Form.Control
                onChange={(event) => setForm("email", event.target.value)}
                type="email"
                placeholder="Email"
            />
        </Col>
    </Form.Group>
);

export default React.memo(FormEmail, () => false);

