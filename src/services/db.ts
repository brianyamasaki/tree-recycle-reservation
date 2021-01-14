import {db} from './firebase';
export type TreeReservation = {
  uid: string;
  address: string;
  city: string;
  postalCode: string;
  slot: string;
}

export const makeReservation = (payload: TreeReservation) => {
  const { address, city, postalCode, slot, uid } = payload;
  return db.ref(`users/${uid}`).set({
    address,
    city,
    postalCode,
    slot
  })
}

export const readReservation = (uid:string) => {
  return db.ref(`users/${uid}`).once('value');
}