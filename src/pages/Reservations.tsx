import React from 'react';
import { Button, Col } from 'reactstrap';
import { AuthContext } from '../contexts/AuthProvider';
import ReservationForm, { ReservationSlot, ReservationFormReturn } from '../components/ReservationForm';
import { readReservation, makeReservation, TreeReservation } from '../services/db';

type CurReservation = TreeReservation | null;
const Reservations = () => {
  const [ errorMsg, setErrorMsg] = React.useState('');
  const [ reservation, setReservation] = React.useState(null as CurReservation);
  const appUser = React.useContext(AuthContext);
  const [ showMakeReservations, setShowMakeReservations] = React.useState(false);
  const uid = appUser?.user?.uid || '';
  React.useEffect(() => {
    if (uid) {
      readReservation(uid)
      .then(snapshot => {
        // retrieve data from the snapshot with .val()
        const res: CurReservation = snapshot.val();
        if (res) {
          setReservation(res);  
        } else {
          setShowMakeReservations(true);
        }
      })
      .catch(error => {
        console.error(error.message);
        setErrorMsg(error.message);
        setShowMakeReservations(true);
      })
    }
  },[uid])
  
  const slots: ReservationSlot[] = [
    {
      description: 'Saturday Morning, January 8',
      value: 'SaturdayAM'
    },
    {
      description: 'Saturday Afternoon, January 8',
      value: 'SaturdayPM'
    },
    {
      description: 'Sunday Afternoon, January 9',
      value: 'SundayAM'
    },
    {
      description: 'Sunday Afternoon, January 9',
      value: 'SundayPM'
    }
  ]
  const currentReservation = () => {
    if (reservation) {
      return (
        <>
          <h3>Your Reservation</h3>
          <p>
            {reservation.address}<br />
            {reservation.city}, {reservation.postalCode}<br />
            {reservation.slot}
          </p>
        </>
      )
    }
  }
  const onClickChangeReservation = () => {
    setShowMakeReservations(!showMakeReservations);
  }

  const makeReservationSection = () => {
    if (!showMakeReservations) {
      return (
        <Button color="primary" onClick={onClickChangeReservation}>Change Reservation</Button>
      )
    } else {
      const sectionTitle = reservation ? 'Change Reservation' : 'Make a Reservation';
      let inits: ReservationFormReturn;
      if (!!reservation) {
        const { address, city, postalCode, slot} = reservation;
        inits = {
          address,
          city,
          postalCode,
          slot
        }
      } else {
        inits = { 
          address: '',
          city: '',
          postalCode: '',
          slot: ''
        }
      }
      return (
        <>
          <h3>{sectionTitle}</h3>
          <ReservationForm inits={inits} slots={slots} submitFn={submitReservation} errorMsg={errorMsg} />
        </>
      )  
    }
  }
  const submitReservation = ({ address, city, postalCode, slot}: ReservationFormReturn) => {
    makeReservation({
      uid: appUser?.user?.uid || '',
      address,
      city,
      postalCode,
      slot
    })
      .then(() => {
        setShowMakeReservations(false);
      })
      .catch(error => {
        setErrorMsg(error.message);
      })
  }
  return (
    <Col>
      <h1 className="text-center">Reservations</h1>
      {currentReservation()}
      {makeReservationSection()}
    </Col>
  )
}

export default Reservations;