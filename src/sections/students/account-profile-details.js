import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@mui/material';

export const AccountProfileDetails = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleImport = () => {
    router.push('');
  };

  const handleRegister = () => {
    router.push('/auth/register_student');
  };

  useEffect(() => {
    // Fetch data from API
    fetch('your_api_endpoint')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, []);

  const filteredStudents = students.filter(student =>
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader sx={{ m: -1.5, width: 'auto' }} />
        {/* <Stack direction="row" spacing={2} sx={{ mb: 6, mr: 9, justifyContent: 'flex-end' }}>
          <Button onClick={handleImport} variant="contained">
            Import
          </Button>
          <Button onClick={handleRegister} variant="contained">
            Register Student
          </Button>
        </Stack> */}
        <Typography variant="h5" sx={{ m: 1.5 }}>
          
        </Typography>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: 1.5, width: 'auto' }}>
            <TextField
              label="Search student"
              // variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mb: 2 }}
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Class Level</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Middle Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Registration Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.classLevel}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.middleName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.Dob}</TableCell>
                    <TableCell>{student.registrationNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredStudents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
