import React, { useState, ChangeEvent, FormEvent } from 'react';
import AdminNavigationbar from '../../components/AdminNavigationBar';
import { Container } from 'react-bootstrap';
import Select from 'react-select';
import AllSkillSets from '../../utilities/AllSkillSets';

interface NewEventInfo {
    activity: string;
    description: string;
    startTime: string;
    endTime: string;
    skillsRequired: any;
  }

const AdminEventsPage: React.FC = () => {

  const [newEventInfo, setNewEventInfo] = useState<NewEventInfo>({
    activity: '',
    description: '',
    startTime: '',
    endTime: '',
    skillsRequired: null,
  });

  const handleNewEventSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(newEventInfo); // TODO: database logic here
    setNewEventInfo({ activity: '', description: '', startTime: '', endTime: '', skillsRequired: null });
  }

  const handleSkillChange = (selectedOption: any) => {
    setNewEventInfo({ ...newEventInfo, skillsRequired: selectedOption });
  };

//   const handleNewEventCancel = () => {}
  const handleNewEventChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewEventInfo({ ...newEventInfo, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <AdminNavigationbar/>
      <h1>Add New Event</h1>
      <Container style={{ height: '100vh' }}>
        <div className="d-flex" style={{ height: '85%' }}>
          <div className="overflow-auto" style={{ flex: 1 }}>
            <form onSubmit={handleNewEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
                Event Name:
                <input type="text" name="activity" value={newEventInfo.activity} onChange={handleNewEventChange} />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={newEventInfo.description} onChange={handleNewEventChange} />
            </label>
            <label>
                Start Time: 
                <input type="time" name="startTime" value={newEventInfo.startTime} onChange={handleNewEventChange} />
            </label>
            <label>
                End Time:
                <input type="time" name="endTime" value={newEventInfo.endTime} onChange={handleNewEventChange} />
            </label>
            <label>
                Preferable Skills:
                <Select
                  value={newEventInfo.skillsRequired}
                  onChange={handleSkillChange}
                  options={AllSkillSets}
                  isMulti={true} // Allow multiple selections
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
            </label>
            <button type="submit">Add Event</button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminEventsPage;
