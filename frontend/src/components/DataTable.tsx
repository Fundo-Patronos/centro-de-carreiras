import React, { useState, useEffect, useCallback } from "react";
import { DataGrid, GridRowSelectionModel, GridRowId } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";

interface TimeIntervalsTableProps {
  mentor: string;
  onSelectionChange: (_selectedRows: RowData[]) => void;
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

export default function TimeIntervalsTable({
  mentor,
  onSelectionChange,
}: TimeIntervalsTableProps) {
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
  }, [mentor]);

  const handleSelectionChange = useCallback(
    (newSelectionModel: GridRowSelectionModel) => {
      const selectedRows = newSelectionModel
        .map((id: GridRowId) => rows.find((row) => row.id === id))
        .filter((row): row is RowData => row !== undefined);
      onSelectionChange(selectedRows);
    },
    [onSelectionChange, rows],
  );

  const columns = [
    { field: "day", headerName: "Dia", width: 150 },
    { field: "startTime", headerName: "Data Início", width: 150 },
    { field: "endTime", headerName: "Data Fim", width: 150 },
  ];

  const paginationModel = { pageSize: 5, page: 0 };

  return (
    <Paper sx={{ height: 400, width: "100%", padding: "16px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) =>
          handleSelectionChange(newSelectionModel)
        }
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
