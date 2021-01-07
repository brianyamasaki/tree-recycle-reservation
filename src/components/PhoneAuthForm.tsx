import React from 'react';
import firebase from 'firebase/app';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { formatPhoneNumber } from '../utilities/formatStrings';

declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  }
}
export type PhoneFormReturn = {
  phoneNumber: string,
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
};

type FormProps = {
  submitFn: (val: PhoneFormReturn) => void,
  errorMsg: string
};

const PhoneAuthForm = ({submitFn, errorMsg}: FormProps) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
    
  React.useEffect(() => {
    // run this once and only once
    firebase.auth().useDeviceLanguage();
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': () => {
        submitFn({phoneNumber, recaptchaVerifier})
      }
    })
    window.recaptchaVerifier = recaptchaVerifier;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function onChangePhone(event: React.ChangeEvent<HTMLInputElement>) {
    const number = formatPhoneNumber(event?.target.value);
    setPhoneNumber(number);
  }

  function submitPhone(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFn({ phoneNumber, recaptchaVerifier: window.recaptchaVerifier});
  }

  return (
    <Form onSubmit={submitPhone}>
        <FormGroup className="text-right" row>
          <Label for="email" sm={2}>Email</Label>
          <Col sm={10}>
            <Input 
              type="text" 
              name="phone" 
              id="phone" 
              placeholder="Enter your mobile phone number" 
              onChange={onChangePhone}
              value={phoneNumber}
              required
            />
          </Col>
        </FormGroup>
        <Alert isOpen={!!errorMsg}>{errorMsg}</Alert>
        <Button id="sign-in-button" color="primary" type="submit">Create Phone Account</Button>

    </Form>
  )
}

export default PhoneAuthForm;
