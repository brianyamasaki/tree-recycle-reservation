import React, {useState} from 'react';
import EmailPasswordForm, { EmailPasswordFormReturn } from '../components/EmailPasswordForm';
import { useHistory, Link } from 'react-router-dom';
import { signin } from '../utilities/auth';

const Signin = () => {
  const [ errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const submitEmail = ({ email, password}: EmailPasswordFormReturn) => {
    signin(email, password)
      .then(user=> {
        history.push('/reservations');
      })
      .catch(error => {
        setErrorMsg(error.message);
      })
  }
    
  return (
    <>
      <h1 className="col-md-12 text-center">Sign In</h1>
      <EmailPasswordForm submitFn={submitEmail} errorMsg={errorMsg} />
      <hr className="col-md-12 mt-4 mb-3" />
      <h3 className="col-md-12 text-center">Create a Free Account</h3>
      <p className="col-sm-12 text-center"><Link to="/signup">Sign up for a free account</Link></p>
    </>
  );
}

export default Signin;