import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NavButton from './NavButtonComponent';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { chunkArray } from '../utilities/DateUtilities';
import { storeSelectedDate } from '../redux/reducers/selectedDateSlice';
import { RootState } from '../redux/store';
import { EventInfo } from '../utilities/EventInfoInterface';
import axios from 'axios';

const CalendarComponent: React.FC = () => {
    const username = useAppSelector(state => state.username.value);
    const [notifications, setNotifications] = useState<EventInfo[]>([]);
    const [isDone, setIsDone] = useState(false);
    const getEvents = async () => {
      const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/getEvent`, {username: username});
      console.log(response.data);
      const eventsSignedupFor = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/user/getEventDetails`, {eventNames: response.data});
      setNotifications(eventsSignedupFor.data);
      setIsDone(true);
    }

    useEffect(() => {
        getEvents();
    }, []);

    const [currentMonth, setCurrentMonth] = useState(new Date(useAppSelector((state: RootState) => (state.selectedDate.value))));
    const dispatch = useAppDispatch();

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleDateClick = (day: number | null, currentMonth: Date) => {
        if (day !== null) {
            const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const dateString = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(
                newDate.getDate()
            ).padStart(2, '0')}`;
            dispatch(storeSelectedDate(newDate.toISOString()));
            // navigate(`/day/${dateString}`);
            console.log(dateString + "clicked!")
        } else {
        }
    };

    // Render events on the calendar
    const renderEvents = (date: string) => {
        const eventForDate = notifications.find(event => event.date === date);
        const result:any[] = []
        notifications.forEach(event => {
            if (event.date === date) {
                result.push(
                    <div>
                        <div className="badge bg-secondary">
                            {event.name}
                        </div>
                    </div>
                )
            }
            result.push(null);
        });
        return result;
    };

    return (
    !isDone
        ? <div></div>
        :
        <Container>
            <h2 className="text-center my-4">
                {currentMonth.toLocaleString('en-us', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="d-flex justify-content-between mb-3">
                <NavButton startIcon={<ArrowBackIcon />} onClick={handlePrevMonth}>
                    Previous Month
                </NavButton>
                <NavButton endIcon={<ArrowForwardIcon />} onClick={handleNextMonth}>
                    Next Month
                </NavButton>
            </div>
            <Table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Mon</th>
                        <th className="text-center">Tue</th>
                        <th className="text-center">Wed</th>
                        <th className="text-center">Thu</th>
                        <th className="text-center">Fri</th>
                        <th className="text-center">Sat</th>
                        <th className="text-center">Sun</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {chunkArray(currentMonth).map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, index) => (
                                <td
                                    key={index}
                                    className={`text-center`}
                                    onClick={() => handleDateClick(day, currentMonth)}
                                >
                                    {day !== null ? day : ''}
                                    {day !== null && renderEvents(`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CalendarComponent;
