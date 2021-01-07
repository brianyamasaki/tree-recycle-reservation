import React from 'react';
import { Form, FormText, FormGroup, Label, Button, Input } from 'reactstrap';

export type ReservationSlot = {
  description: string;
  value: string;
}

type FormProps = {
  slots: ReservationSlot[];
}

const ReservationRadioForm = ({slots}: FormProps) => {
  if (!slots) {
    console.error('must pass in reservation slots');
  }
  const radioItems = slots.map(slot => {
    return (
      <FormGroup>
        <Label>
          <Input type="radio" value={slot.value} name="timeslot" />{' '}
          {slot.description}
        </Label>
      </FormGroup>
    )
  })
  return (
    <Form>
      <FormText>
        Choose a time period to have your tree picked up
      </FormText>
        {radioItems}
      <Button type="submit" color="primary">Make Reservation</Button>
    </Form>
  )
}

export default ReservationRadioForm;