import React, { useState } from 'react';
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

const UserRecordsPage: React.FC = () => {
    const [rows, setRows] = useState<AttendanceRecord[]>(attendanceData.rows);

    const handleRequestCertificate = (id: number) => {
        const updatedRows = rows.map(row => {
            if (row.id === id && row.Attendance) {
                return { ...row, certificateStage: "Pending" };
            }
            return row;
        });
        setRows(updatedRows);
    }

    const handleDownloadCertificate = (id: number) => {
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, certificateStage: "Ready To Download" };
            }
            return row;
        });
        setRows(updatedRows);
    }

    const handlePendingCertificate = (id: number) => {
        const updatedRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, certificateStage: row.certificateStage === "Ready To Download" ? "Ready To Download" : "Pending" };
            }
            return row;
        });
        setRows(updatedRows);
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
                                        <StyledTableCell align="center">
                                            {!row.Attendance ?
                                                <CertButton endIcon={<DescriptionIcon />} buttonType='Disabled' onClick={() => {}}>Request for Certificate</CertButton> :
                                                row.certificateStage === "Able to Request" ?
                                                    <CertButton endIcon={<DescriptionIcon />} buttonType='Request' onClick={() => handleRequestCertificate(row.id)}>Request for Certificate</CertButton> :
                                                    row.certificateStage === "Pending" ?
                                                        <CertButton endIcon={<AccessTimeIcon />} buttonType='Pending' onClick={() => handlePendingCertificate(row.id)}>Pending Approval</CertButton> :
                                                        <CertButton endIcon={<DownloadIcon />} buttonType='Download' onClick={() => handleDownloadCertificate(row.id)}>Download Certificate</CertButton>
                                            }
                                        </StyledTableCell>
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
