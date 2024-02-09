
import React, { useEffect, useState } from 'react';
import sampleCertRequests from '../utilities/samples/SampleCertNotifications.json';
import CertRendererComponent from './CertRendererComponent';
import { CertInfo } from '../utilities/CertInfoInterface';

const GenCertsComponent: React.FC = () => {
    const [certs, setCerts] = useState<CertInfo[]>([]);

    useEffect(() => {
        setCerts(sampleCertRequests.certRequestList);
    }, []);

    return (
        <div>
            <h2>Generate Certificates</h2>
            {certs.map(event => (
                <CertRendererComponent cert={event} />
            ))}
        </div>
    );
};

export default GenCertsComponent;
