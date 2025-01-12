# Financial Data Filtering App

A React-based web application that fetches and displays annual income statements for companies like Apple Inc. Users can filter financial data by date range, revenue, and net income, and sort the results dynamically. The app is styled using TailwindCSS.

## Features

- Fetch financial data from a third-party API.
- Filter data by:
  - Date range
  - Revenue range
  - Net income range
- Sort data by:
  - Date
  - Revenue
  - Net income
- Responsive design for desktop and mobile users.
- Clean and professional UI styled with TailwindCSS.

## Technologies Used

- **Frontend**: React with TailwindCSS
- **Backend**: Flask (optional, if backend filtering is implemented)
- **API**: [Financial Modeling Prep](https://financialmodelingprep.com/)

---

## Installation and Setup

### Prerequisites

1. Node.js and npm installed on your machine.
2. Python 3.x installed (if using the backend).
3. A free API key from [Financial Modeling Prep](https://financialmodelingprep.com/).

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/financial-data-filtering-app.git
cd financial-data-filtering-app
```

_FRONTEND implementation_

cd frontend

npm install to install dependencies

create .env file in front end directory to store API key:REACT_APP_API_KEY=your_api_key_here

start react- npm start

The frontend will be accessible at http://localhost:3000
