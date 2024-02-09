
import React, { useState } from 'react';
import Select from 'react-select';
import demographics from '../../utilities/AllDemographics';
import ChartComponent from './chartsComponents/ChartComponent';

interface DemographicType {
    value: string;
    label: string;
}

const AllDemographics: DemographicType[] = demographics;

const ByDemographicsComponent: React.FC = () => {

    const [demographic, setDemographic] = useState<DemographicType[] | null>(null);

    const handleDownloadPress = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(demographic);
    }

    const handleDemographicChange = (selectedOption: any) => {
        setDemographic(selectedOption);
        if (selectedOption.length === 0) {
            setDemographic(null);
        }
    }

    return (
        <div style={{ padding: "3%" }}>
            <form onSubmit={handleDownloadPress} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                    <label style={{ flex: '0 0 30%' }}>
                        <Select
                            value={demographic}
                            placeholder="Select demographic(s)"
                            onChange={handleDemographicChange}
                            options={AllDemographics}
                            isMulti={true} // allow multiple selections
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={{ control: (base) => ({ ...base, height: '50px' }) }}
                        />
                    </label>
                    <button className="form-control" type="submit" style={{ flex: '0 0 20%', height: '50px' }}>Download</button>
                </div>
            </form>
            {
                demographic && (
                    <div style={{ padding: '2%' }}>
                        {
                            demographic.map((demo, index) => (
                                <div key={index} style={{ border: '1px solid black', alignContent:'center', alignItems:'center'}}>
                                    <h2>Demographic: {demo.label}</h2>
                                    <ChartComponent />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>

    );
};

export default ByDemographicsComponent;
