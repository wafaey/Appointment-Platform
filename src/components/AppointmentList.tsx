import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import { AccountCircle } from '@material-ui/icons';

const getTimeSlotDatacy = (id: string) => `timeslot-${id}`;

const AppointmentList = (props) => {
  const { appointments, practitioners } = props;
  const [searchText, setSearchText] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(
    appointments,
  );

  const filterAppointments = (text: string) => {
    if (text) {
      const filteredAppointmentsArray = appointments.filter((appointment) => {
        return (
          appointment.practitionerId.toString().includes(text) ||
          appointment.patientId.toString().includes(text) ||
          appointment.id.toString().includes(text)
        );
      });
      setFilteredAppointments(filteredAppointmentsArray);
    } else {
      setFilteredAppointments(appointments);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterAppointments(searchText);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchText, appointments]);
  return (
    <>
      <div className="search__input">
        <label>Search: </label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
          }}
        ></input>
      </div>
      <List className="timeSlots" datacy="timeslot-list">
        {filteredAppointments.map((appointment) => (
          <Card
            key={appointment.id}
            datacy={getTimeSlotDatacy(appointment.id)}
            className="timeSlot__item btn"
          >
            <CardHeader
              avatar={<AccountCircle />}
              title={
                <>
                  <Typography
                    datacy={`${getTimeSlotDatacy(appointment.id)}-range`}
                  >
                    Practitioner name:
                    {practitioners.map((practitioner) => {
                      if (practitioner.id === appointment.practitionerId)
                        return practitioner.firstName;
                    })}
                  </Typography>
                </>
              }
            />
            <CardContent>
              <pre>
                <code>{JSON.stringify(appointment, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  );
};

export default AppointmentList;
