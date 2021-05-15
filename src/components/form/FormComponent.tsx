import React, {FunctionComponent, useState} from "react";
import {Button, Col, Container, Form, Row, Toast} from "react-bootstrap";
import FormName from "./subComponents/FormName";
import FormEmail, {validateEmail} from "./subComponents/FormEmail";
import FormPhone, {validatePhone} from "./subComponents/FormPhone";
import FormMessage from "./subComponents/FormMessage";

const API_DELAY = 3000;
const NON_EXIST_EMAIL = "neexistujici@email.cz";

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

export type Notification = {
    title: string;
    message: string;
}

const INITIAL_FORM_STATE = {
    name: "",
    email: "",
    phone: "",
    message: ""
};

export type FormComponentProps = {
    setForm: (field: string, value: string) => void;
};

const apiSendEmail = (formState: FormState): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("formState.email:", formState.email);

            if (formState.email === NON_EXIST_EMAIL) {
                reject("Neexistující emailová adresa.");
            }

            resolve("Email byl odeslán. Budeme Vás kontaktovat.");
        }, API_DELAY)
    });
};

const isEmptyString = (value: string): boolean => {
    return value.length === 0
};

const FormComponent: FunctionComponent = () => {
    const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
    const [notification, setNotification] = useState<null | Notification>(null);
    const [emailStatus, setEmailStatus] = useState<string | null>(null);

    const setForm = (field: string, value: string): void => {
        setFormState({...formState, [field]: value});
    };

    const closeNotifications = () =>{
        setNotification(null);
        setEmailStatus(null);
    };

    const validate = (actualFormState: FormState = formState) => {
        const usePhone = !isEmptyString(actualFormState.phone);
        const useEmail= !isEmptyString(actualFormState.email);
        if (!usePhone && !useEmail) {
            setNotification({
                title: "Formulář není vyplněný",
                message: "Email nebo telefon musí být zadaný."
            });
            return false;
        }

        if (usePhone && !validatePhone(actualFormState.phone, setNotification)) {
            setNotification({
                title: "Validace selhala",
                message: "Telefon nema správný formát."
            });
            return false;
        }

        if (useEmail && !validateEmail(actualFormState.email, setNotification)) {
            setNotification({
                title: "Validace selhala",
                message: "Email nema správný formát."
            });
            return false;
        }

        if (isEmptyString(actualFormState.message)) {
            setNotification({
                title: "Formulář není vyplněný",
                message: "Zpráva musí být zadána."
            });
            return false;
        }

        return true;
    };

    const sendEmail = async(event: React.MouseEvent): Promise<void> => {
        event.stopPropagation();
        event.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const response = await apiSendEmail(formState);
            setEmailStatus(response);
        } catch (error) {
            console.error("error:", error);
            setNotification({
                title: "Validace selhala",
                message: error
            });
        }
    };

    const cannotSend = (isEmptyString(formState.email) && isEmptyString(formState.phone)) || isEmptyString(formState.message);

    return (
        <Container className={"MyContainer"} fluid>
            <Row>
                <Col>
                    <h1 className={"CenteredTitle"}>Kontaktujte nás</h1>
                </Col>
            </Row>
            <Form className={"MyForm"}>
                <FormName setForm={setForm} />
                <FormEmail setForm={setForm} />
                <FormPhone setForm={setForm} />
                <FormMessage setForm={setForm} />
                <Form.Group as={Col}>
                    <Row className={"ButtonRowMargin"}>
                        <Col xs={12} sm={5}  className={"FormButton"}>
                        <Button
                            type={"submit"}
                            variant="primary"
                            onClick={sendEmail}
                            disabled={cannotSend}
                        >
                            Send email
                        </Button>

                        </Col>
                    <Col xs={12} sm={7} className={"Explanations"}>
                        <div>
                            * Povinná položka
                        </div>
                        <div>
                            ** Email nebo telefon musí být vyplněn.
                        </div>
                    </Col>
                    </Row>
                </Form.Group>
            </Form>
            <div className={"NotificationsPosition"}>
                <Toast
                    className={"error"}
                    show={Boolean(notification)}
                    onClose={closeNotifications}
                    delay={7000}
                    autohide
                >
                    <Toast.Header>
                        <div>{notification?.title}</div>
                    </Toast.Header>
                    <Toast.Body>
                        {notification?.message}
                    </Toast.Body>
                </Toast>
                <Toast
                    className={"success"}
                    show={Boolean(emailStatus)}
                    onClose={closeNotifications}
                    delay={5000}
                    autohide
                >
                    <Toast.Header>
                        <div>Stav emailu</div>
                    </Toast.Header>
                    <Toast.Body>
                        {emailStatus}
                    </Toast.Body>
                </Toast>
            </div>
        </Container>
    );
}

export default FormComponent;