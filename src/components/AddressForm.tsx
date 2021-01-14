import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Alert } from 'reactstrap';

export type AddressFormReturn = {
  address1: string,
  city: string,
  postalCode: string;
};

type FormProps = {
  submitFn: (val: AddressFormReturn) => void,
  errorMsg: string
};

const AddressForm: React.FunctionComponent<FormProps> = ({
  submitFn,
  errorMsg
}: FormProps) => {
  const [ address1, setAddress1] = React.useState("");
  const [ city, setCity] = React.useState("");
  const [ postalCode, setPostalCode] = React.useState("");

  function onChangeAddress1(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress1(event?.target.value);
  }
  function onChangeCity(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event?.target.value);
  }
  function onChangePostalCode(event: React.ChangeEvent<HTMLInputElement>) {
    setPostalCode(event?.target.value);
  }
  function submitAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFn({ address1, city, postalCode});
  }
  return (
    <>
      <Form onSubmit={submitAddress}>
        <FormGroup className="text-right" row>
          <Label for="street_address" sm={2}>Address</Label>
          <Col sm={9}>
            <Input 
              type="text" 
              name="street_address" 
              id="street_address" 
              placeholder="Enter your street address" 
              onChange={onChangeAddress1}
              required
              value={address1}
            />
          </Col>
        </FormGroup>
        <FormGroup className="text-right" row>
          <Label for="city" sm={2}>City</Label>
          <Col sm={9}>
            <Input 
              type="text" 
              name="city" 
              id="city" 
              placeholder="Enter your city" 
              value={city} 
              onChange={onChangeCity} 
              required
            />
          </Col>
        </FormGroup>
        <FormGroup className="text-right" row>
          <Label for="postalCode" sm={2}>ZIP</Label>
          <Col sm={9}>
            <Input 
              type="number" 
              name="postalCode" 
              id="postalCode" 
              placeholder="Enter your ZIP code" 
              value={postalCode} 
              onChange={onChangePostalCode} 
              required
            />
          </Col>
        </FormGroup>
        <Alert isOpen={!!errorMsg}>{errorMsg}</Alert>
        <Button color="primary" type="submit" >
          Submit Address
        </Button>
      </Form>
    </>
  );
}

export default AddressForm;