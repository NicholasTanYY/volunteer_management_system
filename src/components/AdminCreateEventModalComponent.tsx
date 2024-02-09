import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import AllInterestAreas from '../utilities/AllInterestAreas';
import { EventInfo } from '../utilities/EventInfoInterface';
import { useAppSelector } from '../redux/hooks';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCreateEventModalComponent: React.FC = () => {
  const username = useAppSelector(state => state.username.value);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [newEventInfo, setNewEventInfo] = useState<EventInfo>({
    name: '',
    date: '',
    startTime: '',
    endTime: '',
    category: '',
    description: '',
    createdBy: username,
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleNewEventSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newEventInfo.category = newEventInfo.category.map((category: any) => category.label);
    const response = await axios.post(`${process.env.REACT_APP_REQUEST_LINK}/admin/createEvent`, newEventInfo);
    console.log(JSON.stringify(response.data));
    if (response.data.message !== "Event added!") {
      return;
    }
    navigate('/adminHome');
  };

  const handleInterestChange = (selectedOption: any) => {
    setNewEventInfo({ ...newEventInfo, category: selectedOption });
  };

  const handleNewEventChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewEventInfo({ ...newEventInfo, [event.target.name]: event.target.value });
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewEventInfo({ ...newEventInfo, description: event.target.value });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ paddingInline: '100px'}}>
        Create Event  +
      </Button>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleNewEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
              Event Name:
              <input type="text" className="form-control" name="name" value={newEventInfo.name} onChange={handleNewEventChange} />
            </label>
            <label>
              Description:
              <textarea
                className="form-control"
                name="description"
                value={newEventInfo.description}
                onChange={handleDescriptionChange}
                rows={5} // Set the initial size of the textarea
              />
            </label>
            <label>
              Date:
              <input type="date" className="form-control" name="date" value={newEventInfo.date} onChange={handleNewEventChange} />
            </label>
            <label>
              Start Time:
              <input type="time" className="form-control" name="startTime" value={newEventInfo.startTime} onChange={handleNewEventChange} />
            </label>
            <label>
              End Time:
              <input type="time" className="form-control" name="endTime" value={newEventInfo.endTime} onChange={handleNewEventChange} />
            </label>
            <label>
              Categories:
              <Select
                value={newEventInfo.category}
                onChange={handleInterestChange}
                options={AllInterestAreas}
                isMulti={true} // Allow multiple selections
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </label>
            <Button className="btn-dark" type="submit">Add Event</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminCreateEventModalComponent;
