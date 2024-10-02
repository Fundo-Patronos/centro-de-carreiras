"use client";

import { useSearchParams } from 'next/navigation';

const Agendamento = () => {
  const searchParams = useSearchParams();
  const mentor = searchParams.get('mentor'); // Captura o valor de 'mentor'

  if (!mentor) {
    return <p>Mentor não especificado.</p>;
  }

  return (
    <div>
      <h1>Agendamento</h1>
      <p>Mentor: {decodeURIComponent(mentor)}</p>
    </div>
  );
};

export default Agendamento;
