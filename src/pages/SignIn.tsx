import React, {useState, FormEvent, ChangeEvent} from 'react';
import EmailPasswordForm, { EmailPasswordFormReturn } from '../components/EmailPasswordForm';
import { useHistory, Link } from 'react-router-dom';
import { signin } from '../utilities/auth';

const Signin = () => {
  const [ errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const submitEmail = ({ email, password}: EmailPasswordFormReturn) => {
    signin(email, password)
      .then(user=> {
        history.push('/admin');
      })
      .catch(error => {
        setErrorMsg(error.message);
      })
  }
    
  return (
    <>
      <h1>Sign In</h1>
      <EmailPasswordForm submitFn={submitEmail} errorMsg={errorMsg} />
      <hr />
      <h3>Create a Free Account</h3>
      <p><Link to="/signup">Sign up</Link> for a free account</p>
    </>
  );
}

export default Signin;