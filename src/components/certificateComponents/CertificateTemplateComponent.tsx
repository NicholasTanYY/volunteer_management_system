import React from 'react';
import { CertInfo } from '../../utilities/CertInfoInterface';

const certificateRef = React.createRef<HTMLDivElement>();

const CertificateTemplate = ({ userData, certificateRef }: { userData: CertInfo, certificateRef: React.RefObject<HTMLDivElement> }) => (
    <div ref={certificateRef}>
        <div style={{ border: '2px solid black', padding: '20px', textAlign: 'center' }}>
            <h1>Certificate of Completion</h1>
            <p>This is to certify that</p>
            <h2>{userData.name}</h2>
            <p>has attended the event</p>
            <h3>{userData.eventName}</h3>
            <p>on {userData.eventDate} with a total of {userData.totalDuration} hours completed</p>
        </div>
    </div>
);


export default CertificateTemplate;