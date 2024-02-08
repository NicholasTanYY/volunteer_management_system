import React, { useEffect, useState } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import sampleEvents from '../../utilities/samples/SampleEvents.json';
import EventRendererComponent from '../../components/EventRendererComponent';
import { EventInfo } from '../../utilities/EventInfoInterface';

const UserEventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventInfo[]>([]);

  useEffect(() => {
    setEvents(sampleEvents.eventList);
  }, []);

  const handleEventClick = (event: EventInfo) => {
    console.log('Clicked event', event.id);
  }

  return (
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
