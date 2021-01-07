import React, {useState, FormEvent, ChangeEvent} from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';
import { signin } from '../utilities/auth';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  function onChangeEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event?.target.value);
  }
  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event?.target.value);
  }
  async function submitEmailPassword (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
      signin(email, password)
        .then((user) => {
          console.log('logged in');
          history.push('/admin');
        })
        .catch(error => {
          setErrorMsg(error.message);
        })
  }
    
  return (
    <>
    <h1>Sign In</h1>
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
        <Button color="primary" type="submit">Sign In</Button>
      </Form>
      <hr />
      <h3>Create an Free Account</h3>
      <p><Link to="/signup">Sign up</Link> for a free account</p>

    </>
  );
}

export default Signin;