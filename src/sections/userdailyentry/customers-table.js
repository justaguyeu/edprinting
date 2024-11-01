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
  const [openEditModalSales, setOpenEditModalSales] = useState(false);
  const [openEditModalNonSales, setOpenEditModalNonSales] = useState(false);
  const [editDataNon, setEditDataNon] = useState({});
  const [editDataDebt, setEditDataDebt] = useState({});
  const [editDataSales, setEditDataSales] = useState({});
  const [editDataNonSales, setEditDataNonSales] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessageNon, setSuccessMessageNon]= useState('');
  const [successMessageDebt, setSuccessMessageDebt]= useState('');
  const [successMessageSales, setSuccessMessageSales]= useState('');
  const [successMessageNonSales, setSuccessMessageNonSales]= useState('');
  const [stockItems, setStockItems] = useState([]);
  const [stockItemss, setStockItemss] = useState([]);


  useEffect(() => {
    const fetchStockItems = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/available-stock/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // const setStockItems = response.data.filter(item => item.remaining_stock > 0);
          
          // setStockItems(availableStockItems);

          setStockItems(response.data);
        } catch (error) {
          console.error(
            'Error fetching stock data:',
            error.response ? error.response.data : error.message,
          );
        }
      }
    };
    fetchStockItems();
  }, []);

  useEffect(() => {
    const fetchStockItemss = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/available-stock2/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // const setStockItemss = response.data.filter(item => item.remaining_stock > 0);

          // setStockItemss(availableStockItems);
          // console.log('Fetched stockItemss:', stockItemss);
          setStockItemss(response.data);
        } catch (error) {
          console.error(
            'Error fetching stock data:',
            error.response ? error.response.data : error.message,
          );
        }
      }
    };
    fetchStockItemss();
  }, []);

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
    if (editDataNonSales.item_name) {
      const selectedItem = stockItemss.find(
        (item) => item.stock_name === editDataNonSales.item_name,
      );
      if (selectedItem) {
        const pricePerSquareMeter = selectedItem.price_per_square_meter;
        const area = editDataNonSales.area_in_square_meters || 0;

        // Calculate the price based on area
        const priceWithoutDiscount = pricePerSquareMeter * area ;

        // Apply discount if provided
        const discount = editDataNonSales.discount_price || 0;
        const totalPrice = priceWithoutDiscount - discount;

        setEditDataNonSales((prevData) => ({
          ...prevData,
         total_price: totalPrice > 0 ? totalPrice : 0, // Ensure the total price is not negative
        }));
      }
    }
  }, [
    editDataNonSales.item_name,
    editDataNonSales.area_in_square_meters,
    editDataNonSales.discount_price,
    stockItemss,
  ]);

  useEffect(() => {
    if (editDataSales.item_name) {
      const selectedItem = stockItems.find(
        (item) => item.name === editDataSales.item_name,
      );
      if (selectedItem) {
        const priceWithoutDiscount =
          selectedItem.price_per_unit * editDataSales.quantity;
        const discount = editDataSales.discount_price || 0; // Use discount if provided, otherwise default to 0
        const totalPrice = priceWithoutDiscount - discount;

        setEditDataSales((prevData) => ({
          ...prevData,
          total_price: totalPrice > 0 ? totalPrice : 0, // Ensure total price does not go negative
        }));
      }
    }
  }, [
    editDataSales.item_name,
    editDataSales.quantity,
    editDataSales.discount_price,
    stockItems,
  ]);


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




  
  // Helper function to format numbers with commas
  const formatWithCommas = (value) => {
    if (typeof value === 'string') {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three digits
    }
    return value; // Return as-is if not a string
};

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
  // const handleEditChangeSales = (e) => {
  //   const { name, value } = e.target;
  //   setEditDataSales((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  // const handleEditChangeNonSales = (e) => {
  //   const { name, value } = e.target;
  //   setEditDataNonSales((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };


  const handleEditChangeSales = (e) => {
    const { name, value } = e.target;
    if (name === 'discount_price') {
      // Handle amount formatting with commas
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      setEditDataSales({
        ...editDataSales,
        [name]: numericValue, // Store raw numeric value without commas
      });

      
      
    } else {
      setEditDataSales({
      ...editDataSales,
      [name]:
        name === 'quantity' ||
        name === 'total_price'
          ? parseFloat(value) || ''
          : value,
    });}
    
  };

  const handleEditChangeNonSales = (e) => {
    const { name, value } = e.target;

    if (name === 'discount_price') {
      // Handle amount formatting with commas
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      setEditDataNonSales({
        ...editDataNonSales,
        [name]: numericValue, // Store raw numeric value without commas
      });

    e.target.value = formatWithCommas(numericValue);

  } else if (name === 'area_in_square_meters') {
    // Handle area_in_square_meters as a string to allow leading zeros
    setEditDataNonSales({
      ...editDataNonSales,
      [name]: value, // Keep the value as a string to preserve leading zero
    });
      
    } else {
      setEditDataNonSales({
      ...editDataNonSales,
      [name]:
        // name === 'area_in_square_meters' ||
        name === 'total_price'
          ? parseFloat(value) || ''
          : value,
    });}


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

  useEffect(() => {
    if (successMessageSales) {
      const timer = setTimeout(() => {
        setSuccessMessageSales('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessageSales]);

  useEffect(() => {
    if (successMessageNonSales) {
      const timer = setTimeout(() => {
        setSuccessMessageNonSales('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessageNonSales]);

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

        const debtToUpdate = {
          ...editDataDebt,// Copy the current debt data
          id: editDataDebt.id // Ensure the id is the correct one from the selected debt
        };

        const response = await axios.put(
          `${BASE_URL}/debts/${debtToUpdate.id}/`,
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

  const handleSaveSales= async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessageSales(''); // Clear any previous messages

    const token = localStorage.getItem('access_token');
    if (token) {
      try {

        const salesToUpdate = {
          ...editDataSales,// Copy the current debt data
          id: editDataSales.id // Ensure the id is the correct one from the selected debt
        };

        console.log(editDataSales.id);
        const response = await axios.put(
          `${BASE_URL}/api/data/${salesToUpdate.id}/`,
          editDataSales,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // Fetch the updated data after saving
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

              // Show success message after fetching data
              setSuccessMessageSales('Sales was updated successfully!');
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

        // Close the edit modal
        setOpenEditModalSales(false);

        // Update local state if needed
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === editDataSales.id ? response.data : entry,
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

  const handleSaveNonSales = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessageNonSales(''); // Clear any previous messages

    const token = localStorage.getItem('access_token');
    if (token) {
      try {

        const nonsalesToUpdate = {
          ...editDataNonSales,// Copy the current debt data
          id: editDataNonSales.id // Ensure the id is the correct one from the selected debt
        };

        console.log(editDataNonSales.id);
        const response = await axios.put(
          `${BASE_URL}/api/data2/${nonsalesToUpdate.id}/`,
          editDataNonSales,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        // Fetch the updated data after saving
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

              // Show success message after fetching data
              setSuccessMessageNonSales('Sales was updated successfully!');
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

        // Close the edit modal
        setOpenEditModalNonSales(false);

        // Update local state if needed
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === editDataNonSales.id ? response.data : entry,
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
      stock_name: entry.stock_name,
      debtor_name: entry.debtor_name,
      amount: entry.amount,
      stock_dimensions: entry.stock_dimensions,
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

  const handleOpenEditModalSales= (entry) => {
    setEditDataSales({
      id: entry.id,
      date: entry.date,
      item_name: entry.item_name,
      quantity: entry.quantity,
      total_price: entry.total_price,
      discount_price: entry.discount_price,
    });
    setOpenEditModalSales(true); // Open the modal
  };
  const handleOpenEditModalNonSales = (entry) => {
    setEditDataNonSales({
      id: entry.id,
      date: entry.date,
      item_name: entry.item_name,
      total_price: entry.total_price,
      area_in_square_meters: entry.area_in_square_meters,
      discount_price: entry.discount_price,
    });
    setOpenEditModalNonSales(true); // Open the modal
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
                                    <Button
                                        variant="outlined"
                                        key={entry.id}
                                        onClick={() =>
                                          handleOpenEditModalSales(entry)
                                        }
                                      >
                                        Edit
                                      </Button>
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
                                    <Button
                                        variant="outlined"
                                        key={entry.id}
                                        onClick={() =>
                                          handleOpenEditModalNonSales(entry)
                                        }
                                      >
                                        Edit
                                      </Button>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                          <div>
                            {successMessageNonSales && (
                              <div className="success-message">
                                <p>{successMessageNonSales}</p>
                              </div>
                            )}
                          </div>
                          <div>
                                  {successMessageSales&& (
                                    <div className="success-message">
                                      <p>{successMessageSales}</p>
                                    </div>
                                  )}
                                </div>
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
                  <TextField
                      label="Stock"
                      name="stock_name"
                      value={editDataDebt.stock_name || ''}
                      onChange={handleEditChangeDebt}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Debtor"
                      name="debtor_name"
                      value={editDataDebt.debtor_name || ''}
                      onChange={handleEditChangeDebt}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Dimensions"
                      name="stock_dimensions "
                      value={editDataDebt.stock_dimensions || ''}
                      onChange={handleEditChangeDebt}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Amount"
                      name="amount"
                      value={editDataDebt.amount || ''}
                      onChange={handleEditChangeDebt}
                      fullWidth
                      margin="normal"
                    />
                    
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
                <Dialog
                  open={openEditModalSales}
                  onClose={() => setOpenEditModalSales(false)}
                >
                  <DialogTitle>Edit Sales</DialogTitle>
                  <DialogContent>
                    <Card 
                    sx={{
                      p: 2,
                      gap: 3,
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    >
                  <input
                          type="date"
                          name="date"
                          value={editDataSales.date}
                          onChange={handleEditChangeSales}
                          required
                        />
                        <label htmlFor="date-filter"> Selection Stock:</label>
                        <select
                        
                          name="item_name"
                          value={editDataSales.item_name}
                          onChange={handleEditChangeSales}
                          required
                        >
                          <option value="">Choose Stock</option>
                          {stockItems.map((item, index) => (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        </Card>
                    <TextField
                      label="Name"
                      name="item_name"
                      value={editDataSales.item_name || ''}
                      onChange={handleEditChangeSales}
                      fullWidth
                      margin="normal"
                    />
                    
                    <TextField
                      label="Quantity"
                      name="quantity"
                      value={editDataSales.quantity || ''}
                      onChange={handleEditChangeSales}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Discount Price"
                      name="discount_price"
                      value={formatWithCommas(editDataSales.discount_price || '')}
                      onChange={handleEditChangeSales}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Total Price"
                      name="total_price"
                      value={formatCurrency(editDataSales.total_price || '')}
                      onChange={handleEditChangeSales}
                      fullWidth
                      margin="normal"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenEditModalSales(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveSales} variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openEditModalNonSales}
                  onClose={() => setOpenEditModalNonSales(false)}
                >
                  <DialogTitle>Edit  Sales</DialogTitle>
                  <DialogContent>
                  <Card 
                    sx={{
                      p: 2,
                      gap: 3,
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    >
                  <input
                          type="date"
                          name="date"
                          value={editDataNonSales.date}
                          onChange={handleEditChangeNonSales}
                          required
                        />
                        <label htmlFor="date-filter"> Selection Stock:</label>
                        <select
                        
                          name="item_name"
                          value={editDataNonSales.item_name}
                          onChange={handleEditChangeNonSales}
                          required
                        >
                          <option value="">Choose Stock</option>
                          {stockItemss.map((item, index) => (
                            <option key={index} value={item.stock_name}>
                              {item.stock_name}
                            </option>
                          ))}
                        </select>
                        </Card>
                    <TextField
                      label="Name"
                      name="item_name"
                      value={editDataNonSales.item_name || ''}
                      onChange={handleEditChangeNonSales}
                      fullWidth
                      margin="normal"
                    />
                    
                    <TextField
                      label="Square Meters"
                      name="area_in_square_meters"
                      value={editDataNonSales.area_in_square_meters || ''}
                      onChange={handleEditChangeNonSales}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Discount Price"
                      name="discount_price"
                      value={formatWithCommas(editDataNonSales.discount_price || '')}
                      onChange={handleEditChangeNonSales}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Total Price"
                      name="total_price"
                      value={formatCurrency(editDataNonSales.total_price || '')}
                      onChange={handleEditChangeNonSales}
                      fullWidth
                      margin="normal"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenEditModalNonSales(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveNonSales} variant="contained">
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
