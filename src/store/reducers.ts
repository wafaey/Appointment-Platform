import timeslots from './timeslots';
import practitioners from './practitioners';
import patients from './patients';
import availabilities from './availabilities';

export default {
  timeslots: timeslots.reducer,
  practitioners: practitioners.reducer,
  patients: patients.reducer,
  availabilities: availabilities.reducer,
};
