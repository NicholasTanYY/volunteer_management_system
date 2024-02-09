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
    <div className="vh-100">
      <UserNavigationbar />
      <h1>Events</h1>
      <div className="d-flex justify-content-center">
        <div className="w-75 d-flex justify-content-evenly overflow-auto">
          {events.map(event => (
            <UserEventRendererComponent event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserEventsPage;
