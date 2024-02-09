import React, { useEffect, useState } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBarComponent';
import { useAppSelector } from '../../redux/hooks';
import axios from 'axios';
import { EventInfo } from '../../utilities/EventInfoInterface';
import EventRendererComponent from '../../components/EventRendererComponent';
import sampleEvents from '../../utilities/samples/SampleEvents.json';
import AdminCreateEventModalComponent from '../../components/AdminCreateEventModalComponent';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const AdminEventsPage: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  const [isDone, setIsDone] = useState(false);
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return event.name.toLowerCase().includes(searchTerm.toLowerCase())
      && (startDate === null || eventDate >= startDate)
      && (endDate === null || eventDate <= endDate);
  });

  return (
    !isDone
      ? <div></div>
      :
      <div>
        <AdminNavigationbar />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
          <h3>All Events</h3>
          <AdminCreateEventModalComponent />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px' }}>
          <TextField
            style={{ width: 'calc(33.333% - 10px)' }}
            className="form-control"
            placeholder="Search events"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <h5>Start</h5>
          <input
            type="date"
            style={{ width: 'calc(33.333% - 10px)' }}
            className="form-control"
            value={startDate ? startDate.toISOString().substr(0, 10) : ''}
            onChange={e => setStartDate(e.target.value ? new Date(e.target.value) : null)}
          />
          <h5>End</h5>
          <input
            type="date"
            style={{ width: 'calc(33.333% - 10px)' }}
            className="form-control"
            value={endDate ? endDate.toISOString().substr(0, 10) : ''}
            onChange={e => setEndDate(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
        <div className="d-flex justify-content-evenly">
          {filteredEvents.map((event, index) => (
            <EventRendererComponent key={index} event={event} onClick={() => { }} />
          ))}
        </div>
      </div>
  );

};

export default AdminEventsPage;
