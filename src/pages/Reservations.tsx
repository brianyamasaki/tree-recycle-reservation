import React from 'react';
import ReservationRadioForm, { ReservationSlot } from '../components/ReservationForm';

const Reservations = () => {
  const slots: ReservationSlot[] = [
    {
      description: 'first slot',
      value: 'period1'
    },
    {
      description: 'next slot',
      value: 'period2'
    }

  ]
  return (
    <>
      <h1>Reservations</h1>
      <h2>Current Reservation</h2>
      <h2>Make a Reservation</h2>
      <ReservationRadioForm slots={slots} />
    </>
  )
}

export default Reservations;