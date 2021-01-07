import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';

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
    <>
      <Form onSubmit={submitEmailPassword}>
        <FormGroup className="text-right" row>
          <Label for="email" sm={2}>Email</Label>
          <Col sm={10}>
            <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter your email" 
              onChange={onChangeEmail}
              value={email}
            />
          </Col>
        </FormGroup>
        <FormGroup className="text-right" row>
          <Label for="password" sm={2}>Password</Label>
          <Col sm={10}>
            <Input type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={onChangePassword} />
          </Col>
        </FormGroup>
        <Alert isOpen={!!errorMsg}>{errorMsg}</Alert>
        <Button color="primary" type="submit">Create Email Account</Button>
      </Form>
    </>
  );
}

export default EmailPasswordForm;