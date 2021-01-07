import React from 'react';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import EmailPasswordForm, { EmailPasswordFormReturn } from '../components/EmailPasswordForm';
import PhoneAuthForm, { PhoneFormReturn } from '../components/PhoneAuthForm';
declare global {
  interface Window {
    confirmationResult: any;
  }
}

const Signup = () => {
  const [ errorMsg, setErrorMsg] = React.useState('');
  const [ phoneErrorMsg, setPhoneErrorMsg] = React.useState('');
  
  const history = useHistory();

  const submitPhone = ({ phoneNumber, recaptchaVerifier}: PhoneFormReturn) => {
    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch(error => {
        console.log('confirmation not sent', error.message)
      })
  }
  const submitEmail = ({ email, password}: EmailPasswordFormReturn) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user=> {
        history.push('/admin');
      })
      .catch(error => {
        setErrorMsg(error.message);
      })
  }
  return (
    <>
      <h1>Sign Up For a Free Account</h1>
      <p>Please create an account to reserve a drop-off time. Your phone and email is only used to identify you and you will not receive junk email.</p>
      <h3>Accout Using Mobile Phone</h3>
      <p>Using this method will send a text message to your mobile phone. You may incur fees.</p>
      <PhoneAuthForm submitFn={submitPhone} errorMsg={phoneErrorMsg} />
      <hr />
      <h3>Account Using Email</h3>
      <EmailPasswordForm submitFn={submitEmail} errorMsg={errorMsg} />
    </>
  );
}

export default Signup;