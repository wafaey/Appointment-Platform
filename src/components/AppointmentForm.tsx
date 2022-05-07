import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAvailabilities,
  availabilitiesSelectors,
} from 'store/availabilities';
import { addAppointment } from 'store/appointments';
import { formatDateRange } from 'utils/date';
import { useFormik } from 'formik';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core';

const Yup = require('yup');
const AppointmentForm = (props) => {
  const dispatch = useDispatch();
  const { practitioners, patients } = props;
  const availabilities = useSelector((state) =>
    availabilitiesSelectors.selectAll(state.availabilities),
  );

  const validationSchema = Yup.object().shape({
    patientId: Yup.number()
      .moreThan(0, 'Select a Patient')
      .required('Patient is required'),
    practitionerId: Yup.number()
      .moreThan(0, 'Select a Practitioner')
      .required('Practitioner is required'),
    availability: Yup.string('Select an Availability').required(
      'Availability is required',
    ),
  });
  const formik = useFormik({
    initialValues: {
      practitionerId: 0,
      patientId: 0,
      availability: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const availability = JSON.parse(values.availability);
      const appointmentData = {
        patientId: values.patientId,
        practitionerId: values.practitionerId,
        startDate: availability.startDate,
        endDate: availability.endDate,
      };
      dispatch(addAppointment(appointmentData));
    },
  });

  useEffect(() => {
    if (formik.values.practitionerId)
      dispatch(getAvailabilities(formik.values.practitionerId));
  }, [formik.values.practitionerId]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="appointmentInputs">
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Practitioner
            </InputLabel>
            <Select
              id="practitionerId"
              name="practitionerId"
              value={formik.values.practitionerId}
              onChange={formik.handleChange}
              label="Practitioner"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {practitioners.map((practitioner, id) => {
                return (
                  <MenuItem key={id} value={practitioner.id}>
                    {practitioner.firstName + '' + practitioner.lastName}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.errors.practitionerId ? (
              <div>{formik.errors.practitionerId}</div>
            ) : null}
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Patient
            </InputLabel>
            <Select
              id="patientId"
              name="patientId"
              value={formik.values.patientId}
              onChange={formik.handleChange}
              label="Patient"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {patients.map((patient, id) => {
                return (
                  <MenuItem key={id} value={patient.id}>
                    {patient.firstName + '' + patient.lastName}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.errors.patientId ? (
              <div>{formik.errors.patientId}</div>
            ) : null}
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Availability
            </InputLabel>
            <Select
              id="availability"
              name="availability"
              value={formik.values.availability}
              onChange={formik.handleChange}
              label="Availability"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {availabilities.map((availability, id) => {
                return (
                  <MenuItem key={id} value={JSON.stringify(availability)}>
                    {formatDateRange({
                      from: new Date(availability.startDate),
                      to: new Date(availability.endDate),
                    })}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.errors.availability ? (
              <div>{formik.errors.availability}</div>
            ) : null}
          </FormControl>
        </div>
        <Button color="primary" variant="contained" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default AppointmentForm;
