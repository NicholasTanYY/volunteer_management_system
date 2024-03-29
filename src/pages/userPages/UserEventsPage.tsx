import React, { useEffect, useState } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import sampleEvents from '../../utilities/samples/SampleEvents.json';
import { EventInfo } from '../../utilities/EventInfoInterface';
import axios from 'axios';
import UserEventRendererComponent from '../../components/UserEventRendererComponent';

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

  return (
    !isDone
      ? <div></div>
      :
    <div className="vh-100" style={{background:"radial-gradient(#ffd8c5, #ffffff)"}}>
      <UserNavigationbar />
      <h2 style={{ color: '#af2918' }}>Events</h2>
      <div className="vh-100 d-flex flex-wrap border justify-content-evenly">
        {events.map(event => (
          <UserEventRendererComponent event={event} />
        ))}
      </div>
    </div>
  );
};

export default UserEventsPage;
