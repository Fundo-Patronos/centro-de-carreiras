import React, { useState, useEffect, useCallback } from "react";
import { DataGrid } from '@mui/x-data-grid'; 
import { Paper } from '@mui/material';
import Button from './Button';

export default function TimeIntervalsTable({ mentor }) {
  // const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [message, setMessage] = useState(''); 
  const rows = [
    { id: 1, day: 'Segunda 4/10', startTime: "12:00", endTime: "13:00"},
    { id: 2, day: 'Segunda 4/10', startTime: "13:00", endTime: "14:00"},
    { id: 3, day: 'Terça 5/10', startTime: "14:00", endTime: "15:00"},
  ];

  // useEffect(() => {
  //   const fetchSchedules = async () => {
  //     try {
  //       const response = await fetch(`/mentoring/schedules/?mentor_name=${encodeURIComponent(mentor)}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch schedules');
  //       }
  //       const data = await response.json();
  //       if (Array.isArray(data)) {
  //         const formattedRows = data.map(schedule => ({
  //           id: schedule.id, // Assuming your Schedule has an ID
  //           day: schedule.day_of_the_week,
  //           startTime: schedule.start_time,
  //           endTime: schedule.end_time,
  //         }));
  //         setRows(formattedRows);
  //       } else {
  //         console.error('Failed to fetch schedules:', data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching schedules:', error);
  //     }
  //   };

  //   if (mentor) {
  //     fetchSchedules();
  //   }
  // }, [mentor]);

  useEffect(() => {
    // This effect runs whenever the selectedRows state changes in the parent
    console.log('Selected Rows in Parent:', selectedRows);
  }, [selectedRows]);

  const handleSelectionChange = useCallback((newSelection) => {
    console.log('entra aqui')
    setSelectedRows(newSelection); // Update selected rows
    console.log('Selected Rows:', newSelection)
  }, []);

  const handleButtonClick = () => {
    const selectedRowData = rows.filter(row => selectedRows.includes(row.id)); // Get the selected rows' data
    console.log(selectedRowData);

    const timeIntervals = selectedRowData.map(row => `${row.day} ${row.startTime} - ${row.endTime}`).join(', ');
    const message = `Prezado ${mentor},\nEstou mandando esta mensagem a partir do site do centro de carreiras e quero marcar uma reunião nos horários: ${timeIntervals}.\n\nAtenciosamente,\n`;
    setMessage(message); 
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message)
    .then(() => {
      console.log('Message copied to clipboard successfully!');
    })
    .catch(err => {
      console.error('Failed to copy message: ', err);
    });
  }

  const columns = [
    { field: 'day', headerName: 'Dia', width: 150 },
    { field: 'startTime', headerName: 'Data Início', width: 100 },
    { field: 'endTime', headerName: 'Data Fim', width: 100 },
  ];

  const paginationModel = { pageSize: 5, page: 0 };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column', // Stack text and table vertically
        justifyContent: 'center', // Horizontal center
        alignItems: 'center', // Vertical center
        height: '100vh', // Full viewport height
      }}
    >
      {/* Wrapper for the table and button */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
        {/* Paper containing the DataGrid */}
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            options={{selection: true}}
            onSelectionModelChange={handleSelectionChange} // Track selected rows
            sx={{ border: 0 }}
          />
        </Paper>

        {/* Custom Button to Print Selected Rows, positioned at the bottom right */}
        <div style={{
          position: 'relative',
          bottom: '10px', // Adjust as needed
          right: '0px', // Adjust as needed
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Button 
            onClick={handleButtonClick} 
            className="mt-4" // Add margin-top to your button
          >
            Print Selected Rows
          </Button>
        </div>
      </div>
      {/* Display the message if it exists */}
      {message && (
        <div style={{ width: '500px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>{message}</h1>
        <div>
          <Button
          onClick={handleCopyToClipboard} 
          className="mt-4" 
          >
            Copy to clipboard
          </Button>
        </div>
        </div>
      )}
      
    </div>
  );
}
