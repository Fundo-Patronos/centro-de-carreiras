import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";

interface TimeIntervalsTableProps {
  mentor: string;
  setRowsAvailable: (value: boolean) => void;
  onSelectionChange: (selectedRows: any[]) => void;
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
        if (Array.isArray(data)) {
          const formattedRows = data.map((schedule, index) => ({
            id: index, 
            day: schedule.day_of_the_week,
            startTime: schedule.start_time,
            endTime: schedule.end_time,
          }));
          setRows(formattedRows);
        } else {
          console.error("Failed to fetch schedules:", data);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    if (mentor) {
      fetchSchedules();
    }
  }, [mentor, setRowsAvailable]);

  const handleSelectionChange = useCallback((newSelectionModel: any) => {
    // Get complete rows for the selected data
    const selectedRows = newSelectionModel.map((id: number) => rows.find((row) => row.id === id));
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
      padding: '16px',
      position: 'relative',
      boxShadow: '0px 0px 4px 4px rgba(0, 0, 0, 0.1)', // Sombras comuns para melhor visibilidade
      borderRadius: '8px', // Adiciona borda arredondada para suavizar
      background: 'linear-gradient(135deg, rgba(255, 0, 150, 0.01), rgba(0, 204, 255, 0.1)) padding-box, linear-gradient(135deg, #C964E2, #FF9700) border-box',
      border: '2px solid transparent',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 5, 0.1))', // Opacidade reduzida
        zIndex: -1,
        filter: 'blur(16px)', // Halo
      },
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
        sx={{
          boxShadow: 4,
          border: 2,
          borderColor: 'secondary.light',
          
          backgroundColor: '#ffffff', // Adiciona o fundo sólido para a tabela
          '& .MuiDataGrid-cell': {
            fontSize: '1.1rem', // Aumenta o tamanho do texto das células
          },
          '& .MuiDataGrid-columnHeaders': {
            fontSize: '1.2rem', // Aumenta o tamanho do texto do cabeçalho
            fontWeight: 'bold', // Opcional, para deixar o cabeçalho em negrito
          },
          
          
        }}
      
      />
    </Paper>
  );
}