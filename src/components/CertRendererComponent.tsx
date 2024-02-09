import React, { useState } from 'react';
import { CertInfo } from '../utilities/CertInfoInterface';
import { Button, Modal } from 'react-bootstrap';

interface CertRendererProps {
    cert: CertInfo;
}

const CertRendererComponent: React.FC<CertRendererProps> = ({ cert }) => {
    const [showModal, setShowModal] = useState(false);

    const openCertRequestModal = () => {
        setShowModal(true);
    };

    const closeCertRequestModal = () => {
        setShowModal(false);
    };

    const generateCertificate = () => {
        // Add the code to generate the certificate here
    }

    return (
        <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }} >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2>{cert.name}</h2>
                    <p>{cert.eventName}</p>
                </div>
                <div>
                    <Button variant="primary" onClick={openCertRequestModal}>View Request</Button>
                </div>
            </div>

            <Modal show={showModal} onHide={closeCertRequestModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Certificate Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Full Name:</strong> {cert.name}</p>
                    <p><strong>Event Name:</strong> {cert.eventName}</p>
                    <p><strong>Event Attendance:</strong> {cert.eventAttendance ? "Present" : "Absent"}</p>
                    <p><strong>Total Duration:</strong> {cert.totalDuration}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={generateCertificate}>
                        Generate Certificate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CertRendererComponent;