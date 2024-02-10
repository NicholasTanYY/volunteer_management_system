import React, { useState, useEffect } from 'react';
import UserNavigationbar from '../../components/UserNavigationBarComponent';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import attendanceData from '../../utilities/samples/SampleAttendanceRecords.json';
import { AttendanceRecord } from '../../utilities/AttendanceRecordInterface';
import CertButton from '../../components/certButtonComponents/certButtonComponent';
import DownloadIcon from '@mui/icons-material/Download';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CertRendererProps } from '../../utilities/CertRendererInterface';
import CertificateTemplate from '../../components/certificateComponents/CertificateTemplateComponent';
import { CertInfo } from '../../utilities/CertInfoInterface';
import sampleCertRequests from '../../utilities/samples/SampleCertNotifications.json';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const certificateRef = React.createRef<HTMLDivElement>();

const UserRecordsPage: React.FC = () => {
    const [certs, setCerts] = useState<CertInfo[]>([]);
    const [rows, setRows] = useState<AttendanceRecord[]>(attendanceData.rows);

    useEffect(() => {
        setCerts(sampleCertRequests.certRequestList);
    }, []);

    const handleRequestCertificate = (id: number) => {
        const updatedRows = rows.map(row => {
            if (row.id === id && row.Attendance) {
                return { ...row, certificateStage: "Pending" };
            }
            return row;
        });
        setRows(updatedRows);
    }

    // const handleDownloadCertificate = async (id: number) => {
    //     console.log(certificateRef.current); // Debugging line to see if the ref is correctly set
    //     if (!certificateRef.current) {
    //         console.error('Certificate element is not rendered yet.');
    //         return;
    //     }
    //     const canvas = await html2canvas(certificateRef.current);
    //     const dataURL = canvas.toDataURL('image/png');

    //     const pdf = new jsPDF('p', 'mm', [canvas.width * 0.264583, canvas.height * 0.264583 * 1.2]);
    //     pdf.addImage(dataURL, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    //     pdf.save(`${cert.name} - Certificate of Participation - ${cert.eventName}.pdf`);
    // };

    const handleDownloadCertificate = async (id: number) => {
        // Find the certificate info for the given id
        const cert = certs.find(c => c.id === id);
    
        if (!cert) {
            console.error('Certificate data not found.');
            return;
        }
    
        // Assuming CertificateTemplate component accepts a cert and renders the certificate
        const certificateElement = <CertificateTemplate userData={cert} certificateRef={certificateRef} />;
        // You have to mount this component to the DOM to use html2canvas, 
        // as it can't work directly on React components.
    
        // Render the component to a div or similar container
        const container = document.createElement('div');
        container.style.position = 'absolute'; // Position it out of view
        container.style.left = '-9999px'; // Position it out of view
        document.body.appendChild(container); // Append to body
    
        // You'll need to render your component into the container
        // This requires a rendering library such as ReactDOM
        // ReactDOM.render(certificateElement, container);
    
        // Now that you have the actual DOM element, you can use html2canvas
        const canvas = await html2canvas(container);
        const dataURL = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF('p', 'mm', [canvas.width * 0.264583, canvas.height * 0.264583 * 1.2]);
        pdf.addImage(dataURL, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save(`${cert.name} - Certificate of Participation - ${cert.eventName}.pdf`);
    
        // Clean up: remove the temporary container from the DOM
        document.body.removeChild(container);
    };
    

    const handlePendingCertificate = (id: number) => {
        // do nothing
    }

    return (
        <div>
            <UserNavigationbar />
            <h1>Records</h1>
            <div style={{ padding: '2%', paddingInline: '10%' }}>
                <h2>Events Record</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Activity</StyledTableCell>
                                <StyledTableCell align="center">Duration</StyledTableCell>
                                <StyledTableCell align="center">Attendance</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.Date}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Activity}</StyledTableCell>
                                    <StyledTableCell align="center">{row.Duration} hours</StyledTableCell>
                                    <StyledTableCell align="center">{row.Attendance ? "Present" : "Absent"}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {!row.Attendance ?
                                            <CertButton endIcon={<DescriptionIcon />} onClick={() => { }} buttonType='Disabled'>Request for Certificate</CertButton> :
                                            row.certificateStage === "Able to Request" ?
                                                <CertButton endIcon={<DescriptionIcon />} buttonType='Request' onClick={() => handleRequestCertificate(row.id)}>Request for Certificate</CertButton> :
                                                row.certificateStage === "Pending" ?
                                                    <CertButton endIcon={<AccessTimeIcon />} buttonType='Pending' onClick={() => handlePendingCertificate(row.id)}>Pending Approval</CertButton> :
                                                    certs.filter(cert => cert.name === row).map(cert => (
                                                        <React.Fragment key={cert.id}>
                                                            <CertButton endIcon={<DownloadIcon />} buttonType='Download' onClick={() => handleDownloadCertificate(row.id)}>Download Certificate</CertButton>
                                                            <CertificateTemplate userData={cert} certificateRef={certificateRef} />
                                                        </React.Fragment>
                                                    ))
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
};

export default UserRecordsPage;
