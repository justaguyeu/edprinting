import PropTypes from 'prop-types';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api';

import {
  Avatar,
  Box,
  Card,
  TextField,
  CardContent,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableRow,
  MenuItem,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { getInitials } from 'src/utils/get-initials';
const statusMap = {
  pending: 'warning',
  paid: 'success',
};

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [entries, setEntries] = useState([]);
  const [entriess, setEntriess] = useState([]);
  const [entriesss, setEntriesss] = useState([]);
  const [entriessss, setEntriessss] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filteredEntriess, setFilteredEntriess] = useState([]);
  const [filteredEntriesss, setFilteredEntriesss] = useState([]);
  const [filteredEntriessss, setFilteredEntriessss] = useState([]);
  const [filteredOutofstock, setFilteredOutofstock] = useState([]);
  const [outofstock, setOutofstock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditModalDebt, setOpenEditModalDebt] = useState(false);
  const [editData, setEditData] = useState({});
  const [openEditModalNon, setOpenEditModalNon] = useState(false);
  const [editDataNon, setEditDataNon] = useState({});
  const [editDataDebt, setEditDataDebt] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessageNon, setSuccessMessageNon]= useState('');
  const [successMessageDebt, setSuccessMessageDebt]= useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/data/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEntries(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntries();
  }, []);
  useEffect(() => {
    const fetchEntriess = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/data2/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setEntriess(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntriess();
  }, []);
  useEffect(() => {
    const fetchEntriesss = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/dataexpense/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEntriesss(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntriesss();
  }, []);
  useEffect(() => {
    const fetchEntriessss = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/debts/`, {
            headers: { Authorization: `Bearer ${token}` },
          }); 
          console.log(response.data)
          setEntriessss(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntriessss();
  }, []);


  useEffect(() => {
    const fetchOutofstock = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/dataoutofstock/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOutofstock(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchOutofstock();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entries.filter((entry) => entry.date === selectedDate);
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries([]);
    }
  }, [selectedDate, entries]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entriesss.filter((entry) => entry.date === selectedDate);
      setFilteredEntriesss(filtered);
    } else {
      setFilteredEntriesss([]);
    }
  }, [selectedDate, entriesss]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entriessss.filter((entry) => entry.date === selectedDate);
      setFilteredEntriessss(filtered);
    } else {
      setFilteredEntriessss([]);
    }
  }, [selectedDate, entriessss]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entriess.filter((entry) => entry.date === selectedDate);
      setFilteredEntriess(filtered);
    } else {
      setFilteredEntriess([]);
    }
  }, [selectedDate, entriess]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = outofstock.filter(
        (entry) => entry.date === selectedDate,
      );
      setFilteredOutofstock(filtered);
    } else {
      setFilteredOutofstock([]);
    }
  }, [selectedDate, outofstock]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatCurrency = (value) => {
    const numericValue = Number(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(numericValue)
      .replace('TZS', 'Tsh');
  };

  // Handle Edit button click
  const handleEdit = (entry) => {
    setEditData(entry); // Populate modal with the selected entry data
    setOpenEditModal(true);
  };

  // Handle input change inside the modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditChangeNon = (e) => {
    const { name, value } = e.target;
    setEditDataNon((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditChangeDebt = (e) => {
    const { name, value } = e.target;
    setEditDataDebt((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Save the updated data
  // const handleSave = async () => {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //   try {
  //     // await axios.put(`${BASE_URL}/api/dataa/${editData.id}/`, editData, {
  //       const response = await axios.get(`${BASE_URL}/api/dataa/${editData.id}/`, editData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setOpenEditModal(false); // Close modal on success
  //     setEntries(response.data); // Refresh the data after edit
  //   } catch (error) {
  //     console.error(
  //       'Error updating data:',
  //       error.response ? error.response.data : error.message,
  //     );
  //   }}
  // };

  // Add a state for the success message

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessage]);

  useEffect(() => {
    if (successMessageNon) {
      const timer = setTimeout(() => {
        setSuccessMessageNon('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessageNon]);

  useEffect(() => {
    if (successMessageDebt){
      const timer = setTimeout(() => {
        setSuccessMessageDebt('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessageDebt]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(''); // Clear any previous messages

    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        console.log(editData.id);
        const response = await axios.put(
          `${BASE_URL}/api/dataexpense/${editData.id}/`,
          editData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // Fetch the updated data after saving
        const fetchEntriesss = async () => {
          const token = localStorage.getItem('access_token');
          if (token) {
            try {
              setLoading(true);
              const response = await axios.get(`${BASE_URL}/api/dataexpense/`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setEntriesss(response.data);
              setLoading(false);

              // Show success message after fetching data
              setSuccessMessage('Expense was updated successfully!');
            } catch (error) {
              console.error(
                'Error fetching data:',
                error.response ? error.response.data : error.message,
              );
              setLoading(false);
            }
          } else {
            console.error('No token found');
          }
        };
        fetchEntriesss();

        // Close the edit modal
        setOpenEditModal(false);

        // Update local state if needed
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === editData.id ? response.data : entry,
          ),
        );
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          console.error(
            'Data submission failed:',
            error.response ? error.response.data : error.message,
          );
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.error('No token found');
    }
  };

  const handleSaveNon = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessageNon(''); // Clear any previous messages

    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        console.log(editDataNon.id);
        const response = await axios.put(
          `${BASE_URL}/api/dataoutofstock/${editDataNon.id}/`,
          editDataNon,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // Fetch the updated data after saving
        const fetchOutofstock = async () => {
          const token = localStorage.getItem('access_token');
          if (token) {
            try {
              setLoading(true);
              const response = await axios.get(`${BASE_URL}/api/dataoutofstock/`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setOutofstock(response.data);
              setLoading(false);

              // Show success message after fetching data
              setSuccessMessageNon('Non-Stock was updated successfully!');
            } catch (error) {
              console.error(
                'Error fetching data:',
                error.response ? error.response.data : error.message,
              );
              setLoading(false);
            }
          } else {
            console.error('No token found');
          }
        };
        fetchOutofstock();

        // Close the edit modal
        setOpenEditModalNon(false);

        // Update local state if needed
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === editDataNon.id ? response.data : entry,
          ),
        );
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          console.error(
            'Data submission failed:',
            error.response ? error.response.data : error.message,
          );
        }

      } finally {
        setLoading(false);
      }
    } else {
      console.error('No token found');
    }
  };

  const handleSaveDebt = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessageDebt(''); // Clear any previous messages

    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.put(
          `${BASE_URL}/debts/${editDataDebt.id}/`,
          editDataDebt,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log(response.data);

        // Fetch the updated data after saving
        const fetchEntriessss = async () => {
          const token = localStorage.getItem('access_token');
          if (token) {
            try {
              setLoading(true);
              const response = await axios.get(`${BASE_URL}/debts/`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setEntriessss(response.data);
              setLoading(false);

              // Show success message after fetching data
              setSuccessMessageDebt('Status was updated successfully!');
            } catch (error) {
              console.error(
                'Error fetching data:',
                error.response ? error.response.data : error.message,
              );
              setLoading(false);
            }
          } else {
            console.error('No token found');
          }
        };
        fetchEntriessss();

        // Close the edit modal
        setOpenEditModalDebt(false);

        // Update local state if needed
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === editDataDebt.id ? response.data : entry,
          ),
        );
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          console.error(
            'Data submission failed:',
            error.response ? error.response.data : error.message,
          );
        }

      } finally {
        setLoading(false);
      }
    } else {
      console.error('No token found');
    }
  };

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //     try {
  //       const response = await axios.put(
  //         `${BASE_URL}/api/dataexpense/${editData.id}/`,
  //         editData,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       const fetchEntriesss = async () => {
  //         const token = localStorage.getItem('access_token');
  //         if (token) {
  //           try {
  //             setLoading(true);
  //             const response = await axios.get(`${BASE_URL}/api/dataexpense/`, {
  //               headers: { Authorization: `Bearer ${token}` },
  //             });
  //             setEntriesss(response.data);
  //             setLoading(false);
  //           } catch (error) {
  //             console.error(
  //               'Error fetching data:',
  //               error.response ? error.response.data : error.message,
  //             );
  //             setLoading(false);
  //           }
  //         } else {
  //           console.error('No token found');
  //         }
  //       };
  //       fetchEntriesss();

  //       setOpenEditModal(false);

  //       if (editData.type === 'entries') {
  //         setEntries((prevEntries) =>
  //           prevEntries.map((entry) =>
  //             entry.id === editData.id ? response.data : entry
  //           )
  //         );
  //       } else if (editData.type === 'entriess') {
  //         setEntriess((prevEntriess) =>
  //           prevEntriess.map((entry) =>
  //             entry.id === editData.id ? response.data : entry
  //           )
  //         );
  //       } else if (editData.type === 'entriesss') {
  //         setEntriesss((prevEntriesss) =>
  //           prevEntriesss.map((entry) =>
  //             entry.id === editData.id ? response.data : entry
  //           )
  //         );
  //       }

  //     } catch (error) {
  //       if (
  //         error.response &&
  //         error.response.data &&
  //         error.response.data.error
  //       ) {
  //         alert(error.response.data.error);
  //       } else {
  //         console.error(
  //           'Data submission failed:',
  //           error.response ? error.response.data : error.message,
  //         );
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     console.error('No token found');
  //   }
  // };

  const handleOpenEditModal = (entry) => {
    setEditData({
      id: entry.id,
      date: entry.date,
      expense_name: entry.expense_name,
      expenses: entry.expenses,
    });
    setOpenEditModal(true); // Open the modal
  };
  const handleOpenEditModalDebt = (entry) => {
    setEditDataDebt({
      id: entry.id,
      date: entry.date,
      status: entry.status,
    });
    setOpenEditModalDebt(true); // Open the modal
  };

  const handleOpenEditModalNon = (entry) => {
    setEditDataNon({
      id: entry.id,
      date: entry.date,
      name: entry.name,
      price: entry.price,
    });
    setOpenEditModalNon(true); // Open the modal
  };

  return (
    <>
      <Card sx={{ p: 2 }}>
        <div>
          <label htmlFor="date-filter"> Select Date to view: </label>
          <input
            type="date"
            id="date-filter"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </Card>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {selectedDate ? (
            filteredEntries.length > 0 ||
            filteredEntriess.length > 0 ||
            filteredEntriessss.length > 0 ||
            filteredOutofstock.length > 0 ||
            filteredEntriesss.length > 0 ? (
              <>
                <>
                  <CardContent>
                    <Card>
                      <Scrollbar>
                        <Box sx={{ minWidth: 800 }}>
                          <Table>
                            <TableHead>
                              <Typography
                                variant="h6"
                                sx={{
                                  p: 2,
                                  alignItems: 'center',
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                Sales
                              </Typography>
                              <TableRow>
                                {/* <TableCell>USERNAME</TableCell> */}
                                <TableCell>DATE</TableCell>
                                <TableCell>ITEM NAME</TableCell>
                                <TableCell>QUANTITY</TableCell>
                                <TableCell>PRICE</TableCell>
                                <TableCell>DISCOUNT PRICE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredEntries.map((entry) => {
                                return (
                                  <TableRow>
                                    {/* <TableCell>
                                      {entry.user ? entry.user : 'N/A'}
                                    </TableCell> */}
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.item_name}</TableCell>
                                    <TableCell>{entry.quantity}</TableCell>
                                    <TableCell>
                                      {formatCurrency(entry.total_price)}
                                    </TableCell>
                                    <TableCell>
                                      {formatCurrency(entry.discount_price)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                            <TableBody>
                              {filteredEntriess.map((entry) => {
                                return (
                                  <TableRow>
                                    {/* <TableCell>
                                      {entry.user ? entry.user : 'N/A'}
                                    </TableCell> */}
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.item_name}</TableCell>
                                    <TableCell>
                                      {entry.area_in_square_meters}
                                    </TableCell>
                                    <TableCell>
                                      {formatCurrency(entry.total_price)}
                                    </TableCell>
                                    <TableCell>
                                      {formatCurrency(entry.discount_price)}
                                    </TableCell>
                                    {/* <TableCell>
                                      
                                      <Button
                                        variant="outlined"
                                        onClick={() => handleEdit(entry)}
                                      >
                                        Edit
                                      </Button>
                                    </TableCell> */}
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Box>
                      </Scrollbar>

                      {/* <TablePagination
component="div"
count={count}
onPageChange={onPageChange}
onRowsPerPageChange={onRowsPerPageChange}
page={page}
rowsPerPage={rowsPerPage}
rowsPerPageOptions={[5, 10, 25]} /> */}
                    </Card>
                  </CardContent>
                  <CardContent>
                    <Card>
                      <Scrollbar>
                        <Box sx={{ minWidth: 800 }}>
                          <Table>
                            <TableHead>
                              <Typography
                                variant="h6"
                                sx={{
                                  p: 2,
                                  alignItems: 'center',
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                Non Stock Sales
                              </Typography>
                              <TableRow>
                                <TableCell>DATE</TableCell>
                                <TableCell> NAME</TableCell>
                                <TableCell>PRICE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredOutofstock.map((entry) => {
                                return (
                                  <TableRow>
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.name}</TableCell>
                                    <TableCell>
                                      {formatCurrency(entry.price) || 0}
                                    </TableCell>
                                    <TableCell>

                                      <Button
                                        variant="outlined"
                                        key={entry.id}
                                        onClick={() =>
                                          handleOpenEditModalNon(entry)
                                        }
                                      >
                                        Edit
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                          <div>
                            {successMessageNon && (
                              <div className="success-message">
                                <p>{successMessageNon}</p>
                              </div>
                            )}
                          </div>
                        </Box>
                      </Scrollbar>
                    </Card>
                  </CardContent>
                  <CardContent>
                    <Card>
                      <Scrollbar>
                        <Box sx={{ minWidth: 800 }}>
                          <Table>
                            <TableHead>
                              <Typography
                                variant="h6"
                                sx={{
                                  p: 2,
                                  alignItems: 'center',
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                Expenses
                              </Typography>
                              <TableRow>
                                {/* <TableCell>USERNAME</TableCell> */}
                                <TableCell>DATE</TableCell>
                                <TableCell>EXPENSE TYPE</TableCell>
                                <TableCell>EXPENSE PRICE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredEntriesss.map((entry) => {
                                return (
                                  <TableRow>
                                    {/* <TableCell>
                                      {entry.user ? entry.user : 'N/A'}
                                    </TableCell> */}
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.expense_name}</TableCell>
                                    <TableCell>
                                      {formatCurrency(entry.expenses) || 0}
                                    </TableCell>
                                    <TableCell>

                                      <Button
                                        variant="outlined"
                                        key={entry.id}
                                        onClick={() =>
                                          handleOpenEditModal(entry)
                                        }
                                      >
                                        Edit
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                          <div>
                            {successMessage && (
                              <div className="success-message">
                                <p>{successMessage}</p>
                              </div>
                            )}
                          </div>
                        </Box>
                      </Scrollbar>
                    </Card>
                  </CardContent>
                  <CardContent>
                    <Card>
                      <Scrollbar>
                        <Box sx={{ minWidth: 800 }}>
                          <Table>
                            <TableHead>
                              <Typography
                                variant="h6"
                                sx={{
                                  p: 2,
                                  alignItems: 'center',
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}
                              >
                                Debts
                              </Typography>
                              <TableRow>
                              <TableCell>Stock Name</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Stock Amount/Dimensions</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredEntriessss.map((entry) => {
                                const createdAt = format(new Date(entry.date), 'dd/MM/yyyy');
                                return (
                                  <TableRow>
                                    <TableCell>{entry.stock_name}</TableCell>
                    <TableCell>{entry.debtor_name}</TableCell>
                    <TableCell>{entry.stock_dimensions}</TableCell>
                    <TableCell>{formatCurrency(entry.amount)}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[entry.status]}>
                        {entry.status}
                      </SeverityPill>
                    </TableCell>
                                    <TableCell>

                                      <Button
                                        variant="outlined"
                                        key={entry.id}
                                        onClick={() =>
                                          handleOpenEditModalDebt(entry)
                                        }
                                      >
                                        Update
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                          <div>
                            {successMessageDebt && (
                              <div className="success-message">
                                <p>{successMessageDebt}</p>
                              </div>
                            )}
                          </div>
                        </Box>
                      </Scrollbar>
                    </Card>
                  </CardContent>
                </>
                <Dialog
                  open={openEditModal}
                  onClose={() => setOpenEditModal(false)}
                >
                  <DialogTitle>Edit Expense</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Expense Name"
                      name="expense_name"
                      value={editData.expense_name || ''}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Expense Price"
                      name="expenses"
                      value={editData.expenses || ''}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openEditModalNon}
                  onClose={() => setOpenEditModalNon(false)}
                >
                  <DialogTitle>Edit Non Stock Sales</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Name"
                      name="name"
                      value={editDataNon.name || ''}
                      onChange={handleEditChangeNon}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Price"
                      name="price"
                      value={editDataNon.price || ''}
                      onChange={handleEditChangeNon}
                      fullWidth
                      margin="normal"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenEditModalNon(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveNon} variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openEditModalDebt}
                  onClose={() => setOpenEditModalDebt(false)}
                >
                  <DialogTitle>Edit Debt Status</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Status"
                      name="status"
                      select
                      value={editDataDebt.status || ''}
                      onChange={handleEditChangeDebt}
                      required
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                    </TextField>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenEditModalDebt(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveDebt} variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </>

              
            ) : (
              <p>No data available for the selected date .</p>
            )
          ) : (
            <p>Please select date to view the data.</p>
          )}
        </div>
      )}
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
