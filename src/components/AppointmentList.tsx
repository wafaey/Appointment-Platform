import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import { AccountCircle } from '@material-ui/icons';

const getTimeSlotDatacy = (id: string) => `timeslot-${id}`;

const AppointmentList = (props) => {
  const { appointments, practitioners } = props;
  return (
    <List className="timeSlots" datacy="timeslot-list">
      {appointments.map((appointment) => (
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
  );
};

export default AppointmentList;
