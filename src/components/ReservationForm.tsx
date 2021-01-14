import React from 'react';
import { Form, Col, FormGroup, Label, Button, Input, Alert } from 'reactstrap';

export type ReservationFormReturn = {
  address: string,
  city: string,
  postalCode: string;
  slot: string;
};

export type ReservationSlot = {
  description: string;
  value: string;
}

type FormProps = {
  inits: ReservationFormReturn;
  slots: ReservationSlot[];
  submitFn: (val: ReservationFormReturn) => void,
  errorMsg: string;
}

const ReservationRadioForm: React.FunctionComponent<FormProps> = ({inits, slots, submitFn, errorMsg}) => {
  const [ address, setAddress] = React.useState("");
  const [ city, setCity] = React.useState("");
  const [ postalCode, setPostalCode] = React.useState("");
  const [ slot, setSlot] = React.useState('');

  if (!slots) {
    console.error('must pass in reservation slots');
  }
  function onChangeAddress(event: React.ChangeEvent<HTMLInputElement>) {
    setAddress(event?.target.value);
  }
  function onChangeCity(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event?.target.value);
  }
  function onChangePostalCode(event: React.ChangeEvent<HTMLInputElement>) {
    setPostalCode(event?.target.value);
  }
  function submitReservation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFn({ address, city, postalCode, slot});
  }

  const radioItems = slots.map((slotL,i) => {
    return (
      <Col>
        <Label>
          <Input 
            type="radio" 
            value={slotL.value} 
            key={i}
            name="timeslot" 
            checked={slot === slotL.value}
            onChange={() =>setSlot(slotL.value)}
          />
          {` ${slotL.description}`}
        </Label>
      </Col>
    )
  })
  return (
    <Form onSubmit={submitReservation}>
        <FormGroup className="text-right" row>
          <Label for="street_address" xs={3}>Address</Label>
          <Col xs={9}>
            <Input 
              type="text" 
              name="street_address" 
              id="street_address" 
              placeholder="Enter your street address" 
              onChange={onChangeAddress}
              required
              value={address}
            />
          </Col>
        </FormGroup>
        <FormGroup className="text-right" row>
          <Label for="city" xs={3}>City</Label>
          <Col xs={9}>
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
          <Label for="postalCode" xs={3}>ZIP</Label>
          <Col xs={9}>
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
      <p>
        Choose a time period to have your tree picked up
      </p>
        {radioItems}
      <Button 
        type="submit" 
        color="primary"
      >
        Make Reservation
      </Button>
    </Form>
  )
}

export default ReservationRadioForm;