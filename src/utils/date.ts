import { format } from 'date-fns';

const DATE_FORMAT = 'MM/dd/yyyy';
const TIME_FORMAT = 'HH:mm';

export type Range = { from: Date; to: Date };
export type Practitioner = {
  id: number;
  firstName: string;
  lastName: string;
  speciality: string;
};
export type Appointment = {
  id: string;
  patientId: string;
  practitionerId: string;
  startDate: string;
  endDate: string;
};
export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
};

export const formatDate = (date: Date) => format(new Date(date), DATE_FORMAT);
export const formatTime = (date: Date) => format(new Date(date), TIME_FORMAT);

export const formatDateRange = (range: Range) => {
  const { from, to } = range;
  return `${formatDate(from)} ${formatTime(from)} - ${formatTime(to)}`;
};
