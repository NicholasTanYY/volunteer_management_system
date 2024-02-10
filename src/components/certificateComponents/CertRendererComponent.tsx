import React, { useState } from 'react';
import { CertInfo } from '../../utilities/CertInfoInterface';
import { Button, Modal } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CertificateTemplate from './CertificateTemplateComponent';

interface CertRendererProps {
    cert: CertInfo;
}
const certificateRef = React.createRef<HTMLDivElement>();

const CertRendererComponent: React.FC<CertRendererProps> = ({ cert }) => {
    const [showModal, setShowModal] = useState(false);

    const openCertRequestModal = () => {
        setShowModal(true);
    };

    const closeCertRequestModal = () => {
        setShowModal(false);
    };

    const generateCertificate = async () => {
        console.log(certificateRef.current); // Debugging line to see if the ref is correctly set
        if (!certificateRef.current) {
            console.error('Certificate element is not rendered yet.');
            return;
        }
        const canvas = await html2canvas(certificateRef.current);
        const dataURL = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', [canvas.width * 0.264583, canvas.height * 0.264583 * 1.2]);
        pdf.addImage(dataURL, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save(`${cert.name} - Certificate of Participation - ${cert.eventName}.pdf`);
    };

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
                    <CertificateTemplate userData={cert} certificateRef={certificateRef} />
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