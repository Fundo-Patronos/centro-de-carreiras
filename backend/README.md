# Backend Runbook

## How to run the API?

1. Install the dependencies:

Make sure you have Python 3.11 installed on your machine. Then, run the following command in an environment with Python 3.11:

```sh
pip install -r requirements.txt
```

2. Run the API:

```sh
fastapi dev app
```

To run in production mode, run

```sh
fastapi run app
```

## How to set environment variables?

The following environment variables need to be added into the `.env` file to run the API:

- `USERS_TABLE_ID`: Airtable users table ID
- `JWT_KEY`: Secret used to sign JWT tokens
- `FRONT_END_BASE_URL`: Base URL of the frontend app
- `VERIFICATION_EMAIL_WEBHOOK_URL`: Webhook URL for sending verification emails in Airtable automation
- `SCHEDULES_TABLE_ID`: Airtable schedules table ID
- `OPPORTUNITIES_TABLE_ID`: Airtable opportunities table ID
- `WORKSPACE_ID`: Airtable workspace ID
- `AIRTABLE_API_KEY`: Airtable API key

Here's an example `.env` file:

```sh
USERS_TABLE_ID=your_airtable_users_table_id
JWT_KEY=your_jwt_key
FRONT_END_BASE_URL=http://localhost:3000
VERIFICATION_EMAIL_WEBHOOK_URL=https://email-verification-webhook.com
SCHEDULES_TABLE_ID=your_airtable_schedules_table_id
WORKSPACE_ID=your_airtable_workspace_id
AIRTABLE_API_KEY=your_airtable_api_key
OPPORTUNITIES_TABLE_ID=your_opportunities_page_id
```

## How to run test and get coverage artifacts?

Simply run

```
pytest --cov-report html:cov_html
```

Then open `cov_html/index.html` in your browser to see the code report.
