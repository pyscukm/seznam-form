import React, {FunctionComponent} from "react";
import {Col, Form} from "react-bootstrap";
import {FormComponentProps, Notification} from "../FormComponent";

export const validatePhone = (phone: string, setNotification: (notification: Notification) => void): boolean => {
    const phoneRegex = /^\d{9}$/;
    if(phone.match(phoneRegex)) {
        return true;
    }
    else {
        setNotification({
            title: "Validace selhala",
            message: "Telefon nema správný formát."
        });
        console.error("Not a valid Phone Number");
        return false;
    }
};

const FormPhone: FunctionComponent<FormComponentProps> = ({setForm}) => (
    <Form.Group as={Col}>
        <Form.Label>
            <span className={"RedText"}>** </span>Telefon
        </Form.Label>
        <Col>
            <Form.Control
                onChange={(event) => setForm("phone", event.target.value)}
                type="text"
                placeholder="Telefon"
            />
        </Col>
    </Form.Group>
);

export default React.memo(FormPhone, () => false);

