import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";

interface TimeIntervalsTableProps {
  mentor: string;
  setRowsAvailable: (_: boolean) => void;
  onSelectionChange: (_: RowData[]) => void;
}

interface Schedule {
  day_of_the_week: string;
  start_time: string;
  end_time: string;
}

interface RowData {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

const add30Minutes = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); 
  date.setMinutes(date.getMinutes() + 30); 
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export default function TimeIntervalsTable({ mentor, onSelectionChange, setRowsAvailable }: TimeIntervalsTableProps) {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const fetchApiUrl = async () => {
      const response = await axios.get('/api');
      return response.data.apiUrl;
    };

      const fetchSchedules = async () => {
      try {
        const apiUrl = await fetchApiUrl(); 
        const response = await axios.get<Schedule[]>(`${apiUrl}/mentoring/schedules/`, {
          params: { mentor_name: mentor },
        });
        
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const formattedRows = data.map((schedule, index) => ({
            id: index, 
            day: schedule.day_of_the_week,
            startTime: schedule.start_time,
            endTime: add30Minutes(schedule.start_time)
          }));
          setRows(formattedRows);
          setRowsAvailable(true);
        } else {
          setRowsAvailable(false);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setRowsAvailable(false);
      }
    };
    if (mentor) {
      fetchSchedules();
    }
  }, [mentor, setRowsAvailable]);

  const handleSelectionChange = useCallback((newSelectionModel: GridRowSelectionModel) => {
    const selectedRows = newSelectionModel.map((id: GridRowId) => rows.find((row) => row.id === id) as RowData);
    onSelectionChange(selectedRows);
  }, [onSelectionChange, rows]);

  const columns = [
    { field: 'day', headerName: 'Dia', width: 150 },
    { field: 'startTime', headerName: 'Horário Início', width: 150 },
    { field: 'endTime', headerName: 'Horário Fim', width: 150 },
  ];

  const paginationModel = { pageSize: 5, page: 0 };

  return (
    <Paper sx={{ height: 400,
      width: '100%',
      position: 'relative',
      boxShadow: '0px 0px 1px 0.5px rgba(0, 0, 0, 0.05)', 
      borderRadius: '8px',
      '&::before': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '8px',
        zIndex: -1,
        filter: 'blur(4px)', 
      },
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
        localeText={
          {
            MuiTablePagination: {
              labelRowsPerPage: `Linhas por página`,
              labelDisplayedRows: ({from, to, count }) => `${from} - ${to} de ${count === -1 ? `mais que ${to}` : `${count}` }`
            },
            footerRowSelected: (count) =>
              count === 1 ? `${count} linha selecionada` : `${count} linhas selecionadas`,
            noRowsLabel: "Buscando horários..."
            }
        }
        sx={{
          boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          border: 0,
          borderColor: 'secondary.light',
          
          backgroundColor: '#ffffff', 
          '& .MuiDataGrid-cell': {
            fontSize: '1.1rem',
          },
          '& .MuiDataGrid-columnHeaders': {
            fontSize: '1.1rem',
            fontWeight: 'bold',
          },
        }}
      />
    </Paper>
  );
}
