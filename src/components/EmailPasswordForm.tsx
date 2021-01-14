import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { isValidEmail } from '../utilities/formatStrings';

export type EmailPasswordFormReturn = {
  email: string,
  password: string
};

type FormProps = {
  submitFn: (val: EmailPasswordFormReturn) => void,
  errorMsg: string
};

const EmailPasswordForm = ({
  submitFn,
  errorMsg
}: FormProps) => {
  const [email, setEmail] = React.useState("");
  const [ password, setPassword] = React.useState("");

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event?.target.value);
  }
  function onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event?.target.value);
  }
  function submitEmailPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFn({ email, password});
  }
  return (
    <div className="col-md-12">
      <Form onSubmit={submitEmailPassword}>
        <FormGroup className="text-right" row>
          <Label xs="3" for="email">Email</Label>
          <Col xs="9">
            <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter your email" 
              onChange={onChangeEmail}
              required
              value={email}
              valid={isValidEmail(email)}
            />
          </Col>
        </FormGroup>
        <FormGroup className="text-right" row>
          <Label for="password" xs={3}>Password</Label>
          <Col xs={9}>
            <Input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={onChangePassword} 
              required
            />
          </Col>
        </FormGroup>
          <div className="col-md-12 text-center">
          <Alert isOpen={!!errorMsg}>{errorMsg}</Alert>
          <Button color="primary" type="submit" disabled={!isValidEmail(email)}>
            Create Email Account
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EmailPasswordForm;