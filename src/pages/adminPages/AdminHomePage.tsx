import React, { useEffect, useState } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
// requestCerts
import CalendarComponent from '../../components/CalendarComponent';
import NotificationComponent from '../../components/NotificationComponent';
import GenCertsComponent from '../../components/GenCertsComponent';
//=======
import { useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { EventInfo } from '../../utilities/EventInfoInterface';
import EventRendererComponent from '../../components/EventRendererComponent';
import sampleEvents from '../../utilities/samples/SampleEvents.json';
// main

const AdminHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  const [isDone, setIsDone] = useState(false);
  const [events, setEvents] = useState<EventInfo[]>([]);

  const getEventsByAdmin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/getEvents`, {username});
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
      <h1>Hello Admin!</h1>
      <h3>My Events</h3>
      <div className="d-flex justify-content-evenly">
        <div>
          <div className="shadow rounded p-2">
            <CalendarComponent />
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="shadow rounded p-2">
            <NotificationComponent />
          </div>
          <div className="shadow rounded p-2">
            <GenCertsComponent />
          </div>
        </div>
      </div>
       

      {/* <AdminNavigationbar/>
      <h1>Dashboard</h1>
      {events.map((event, index) => (
          <EventRendererComponent key={index} event={event} onClick={()=>{}} />
        ))} */}

    </div>
  );
};

export default AdminHomePage;
