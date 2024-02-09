import React, { useEffect, useState } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
import { useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { EventInfo } from '../../utilities/EventInfoInterface';
import EventRendererComponent from '../../components/EventRendererComponent';
import sampleEvents from '../../utilities/samples/SampleEvents.json';
import { Button } from 'react-bootstrap';
import AdminCreateEventModalComponent from '../../components/AdminCreateEventModalComponent';

const AdminHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  const [isDone, setIsDone] = useState(false);
  const [events, setEvents] = useState<EventInfo[]>([]);

  const getEventsByAdmin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/getEvents`, { username });
      setEvents(response.data);
    } catch (e) {
      setEvents(sampleEvents.eventList);
      console.log("No account, temporary message");
    }
    setIsDone(true);
  }

  useEffect(() => {
    getEventsByAdmin();
  }, [])

  return (
    !isDone
      ? <div></div>
      :
      <div>
        <AdminNavigationbar />
        <h3>My Events</h3>
        <AdminCreateEventModalComponent />
        <div className="d-flex justify-content-evenly">
          {events.map((event, index) => (
            <EventRendererComponent key={index} event={event} onClick={() => { }} />
          ))}
        </div>

      </div>
  );
};

export default AdminHomePage;
