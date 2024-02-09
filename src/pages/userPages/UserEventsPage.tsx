import React, { useEffect, useState } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import sampleEvents from '../../utilities/samples/SampleEvents.json';
import EventRendererComponent from '../../components/EventRendererComponent';
import { EventInfo } from '../../utilities/EventInfoInterface';
import axios from 'axios';

const UserEventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [isDone, setIsDone] = useState(false);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_REQUEST_LINK}/user/getEvents`);
      setEvents(response.data);
    } catch (e) {
      console.log("No account, temporary message");
      setEvents(sampleEvents.eventList);
    }
    setIsDone(true);
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  const handleEventClick = (event: EventInfo) => {
    console.log(`Clicked event ${event}`);
  }

  return (
    !isDone
      ? <div></div>
      :
    <div>
      <UserNavigationbar />
      <h1>Events</h1>
      {events.map(event => (
        <EventRendererComponent event={event} onClick={handleEventClick}/>
      ))}
    </div>
  );
};

export default UserEventsPage;
