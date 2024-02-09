
import React, { useState } from 'react';
import Select from 'react-select';
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
import * as XLSX from 'xlsx';
import AllNames from '../../utilities/AllVolunteerNames';

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

type VolunteerNameType = {
    value: string;
    label: string;
};

const rows: AttendanceRecord[] = attendanceData.rows;

const IndividualComponent: React.FC = () => {
    const [volunteerName, setVolunteerName] = useState<VolunteerNameType | null>(null);

    const handleDownloadPress = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(volunteerName);

        const fileName = `Attendance_Report_${volunteerName?.label}_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}.xlsx`;

        const ws = XLSX.utils.json_to_sheet(attendanceData.rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, fileName);   
    }

    const handleNameChange = (selectedOption: any) => {
        setVolunteerName(selectedOption);
    }

    return (
        <div style={{ padding: "3%" }}>
            <form onSubmit={handleDownloadPress} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                    <label style={{ flex: '0 0 30%' }}>
                        <Select
                            value={volunteerName}
                            placeholder="Select volunteer"
                            onChange={handleNameChange}
                            options={AllNames}
                            isMulti={false} // do not allow multiple selections
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={{ control: (base) => ({ ...base, height: '50px' }) }}
                        />
                    </label>
                    <button className="form-control" type="submit" style={{ flex: '0 0 20%', height: '50px' }}>Download</button>
                </div>
            </form>
            {
                volunteerName && (
                    <div style={{ padding: '2%', paddingInline: '10%' }}>
                        <h2>Attendance Report {volunteerName.value}</h2>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center">Activity</StyledTableCell>
                                        <StyledTableCell align="center">Duration</StyledTableCell>
                                        <StyledTableCell align="center">Attendance</StyledTableCell>
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
                                            <StyledTableCell align="center">{row.Duration}</StyledTableCell>
                                            <StyledTableCell align="center">{row.Attendance ? "Present" : "Absent"}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )
            }
        </div>
    );
};

export default IndividualComponent;
