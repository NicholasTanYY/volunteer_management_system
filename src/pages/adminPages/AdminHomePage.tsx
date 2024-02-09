import React, { useEffect, useState } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
import { useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { EventInfo } from '../../utilities/EventInfoInterface';
import EventRendererComponent from '../../components/EventRendererComponent';

const AdminHomePage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  const [isDone, setIsDone] = useState(false);
  const [events, setEvents] = useState<EventInfo[]>([]);

  const getEventsByAdmin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/getEvents`, {username});
      setEvents(response.data);
    } catch (e) {
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
      <AdminNavigationbar/>
      <h1>Dashboard</h1>
      {events.map((event, index) => (
          <EventRendererComponent key={index} event={event} onClick={()=>{}} />
        ))}
    </div>
  );
};

export default AdminHomePage;
