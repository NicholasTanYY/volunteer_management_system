
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import activities from '../../utilities/AllEvents';

interface EventInfo {
    value: string;
    label: string;
}

const AllEvents: EventInfo[] = activities;

const ByActivityComponent: React.FC = () => {

    const [activity, setActivity] = useState<EventInfo[] | null>(null);

    const handleDownloadPress = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(activity);
    }

    const handleDemographicChange = (selectedOption: any) => {
        setActivity(selectedOption);
        if (selectedOption.length === 0) {
            setActivity(null);
        }
    }

    return (
        <div style={{ padding: "3%" }}>
            <form onSubmit={handleDownloadPress} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                    <label style={{ flex: '0 0 30%' }}>
                        <Select
                            value={activity}
                            placeholder="Select Event(s)"
                            onChange={handleDemographicChange}
                            options={AllEvents}
                            isMulti={true} // allow multiple selections
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={{ control: (base) => ({ ...base, height: '50px' }) }}
                        />
                    </label>
                    <button className="form-control" type="submit" style={{ flex: '0 0 20%', height: '50px' }}>Download</button>
                </div>
            </form>
            </div>
    );
};

export default ByActivityComponent;
