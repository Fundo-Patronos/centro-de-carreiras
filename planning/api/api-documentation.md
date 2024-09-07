# Documentação da API

### Entidades

As principais entidades do sistema serão:

- **students (estudantes):** Podem se cadastrar, ver a disponibilidade de mentores e visualizar vagas disponíveis.
- **mentors (mentores):** Podem definir suas disponibilidades e recebem pedidos de disponibilidade.
  - **availability (disponibilidade):** É uma subcategoria de mentor, representando os horários semanais em que o mentor poderá ter reuniões com os alunos.

### Relações

- **students-mentor-request-availability:** Um estudante pede disponibilidade a um mentor, passando uma lista de horários com preferência.
- **student-mentor-meeting:** Um aluno marca uma reunião com um mentor com base na disponibilidade previamente definida.

### Suposições

Para o design das rotas da API, algumas suposições foram feitas acerca da aplicação:

- **Gerenciamento de Dados:** Todo o gerenciamento de dados da aplicação será feito a partir do Airtable. Todos os dados de estudantes, mentores, disponibilidades, vagas e pedidos de aprovação manual e de encontro com mentores serão armazenados no Airtable e poderão ser alterados por lá. Inicialmente, como haverá poucos dados, em cada request serão buscados todos os dados do Airtable (é importante estudar o limite de requests da API do Airtable).

- **Padrão REST API:** Apesar de todos os dados serem armazenados no Airtable, todas as rotas seguirão o padrão REST API. A aplicação backend terá uma abstração para converter o formato JSON da aplicação para o formato requerido pela API do Airtable. Dessa forma, a integração com o Airtable fica isolada e não ficamos _vendor-locked_. Assim, caso futuramente precisemos mudar o sistema de gerenciamento de dados ou criar um banco de dados próprio, não será necessário recriar as rotas API do zero.
