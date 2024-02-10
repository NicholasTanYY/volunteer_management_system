import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { EventInfo } from '../utilities/EventInfoInterface';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import attendanceList from '../utilities/samples/SampleAttendanceList.json';
import { AttendanceList } from '../utilities/AttendanceListInterface';
import Checkbox from '@mui/material/Checkbox';

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

interface AdminTakeAttendanceModalComponentProps {
    event: EventInfo;
}

// const rows: AttendanceList[] = attendanceList.rows;

const AdminTakeAttendanceModalComponent: React.FC<AdminTakeAttendanceModalComponentProps> = ({ event }) => {
    const [showModal, setShowModal] = useState(false);
    const [rows, setRows] = useState<AttendanceList[]>(attendanceList.rows);

    // Function to open the modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleToggleAttendanceChange = (id: number) => {
        setRows(rows.map((row) => {
          if (row.id === id) {
            return { ...row, Attendance: !row.Attendance };
          } else {
            return row;
          }
        }));
      };

    return (
        <>
            <Button className="btn btn-light btn-outline-dark btn-lg take-attendance-btn" onClick={handleOpenModal}>Take Attendance</Button>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Take Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Event Name: {event.name}</h5>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>#</StyledTableCell>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Phone Number</StyledTableCell>
                                    <StyledTableCell align="center">Attendance</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Checkbox
                                                checked={row.Attendance}
                                                onChange={() => handleToggleAttendanceChange(row.id)}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AdminTakeAttendanceModalComponent;
