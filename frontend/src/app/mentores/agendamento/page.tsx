"use client";

import { useSearchParams } from 'next/navigation';
import TimeIntervalsTable from '../../components/DataTable.js';

const Agendamento = () => {
  const searchParams = useSearchParams();
  const mentor = searchParams.get('mentor'); // Get the 'mentor' value

  if (!mentor) {
    return <p>Mentor não especificado.</p>;
  }

  return (
    <div>
      <h1>Agendamento</h1>
      <h6>Mostrando horários de agendamento para {decodeURIComponent(mentor)}</h6>
      <TimeIntervalsTable mentor={mentor} /> {/* Pass the mentor prop */}
    </div>
  );
};

export default Agendamento;
