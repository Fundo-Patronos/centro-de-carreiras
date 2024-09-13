# Centro de Carreiras

Este repositório contém o projeto da plataforma do Centro de Carreiras do Fundo Patronos.

O projeto é divido em 2 aplicações independentes: front-end e back-end.

# Back-end

## Instalação e Execução

Para instalar e executar a aplicação de back-end localmente, siga  os passos abaixo:

1. Crie um ambiente virtual Python com a ferramenta de sua preferência. Caso opte por utilizar o venv, instale-o com `pip install virtualenv
`, crie um ambiente com `python -m venv nome_do_ambiente` e ative-o com `source nome_do_ambiente/bin/activate`
2. Execute `cd backend` para ir à pasta do back-end
3. Execute `pip install -r requirements-dev.txt` para instalar as dependências de desenvolvimento e execução
4. Execute `uvicorn app.__init__:app --reload` para executar a aplicação na porta 8000. Aa 
