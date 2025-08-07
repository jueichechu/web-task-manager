# web-task-manager

## Setup Instructions

### Prerequisites

- Node.js
- npm
- MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/jueichechu/web-task-manager.git
cd web-task-manager
```

### Setup Instruction for backend

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   - Create a `.env` file in the `root` directory:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```
   - Replace `your_mongodb_connection_string` with your MongoDB URI.

3. **Start the backend server:**

   ```bash
   npm run dev
   ```

   - The backend will run on [http://localhost:5000](http://localhost:5000).

### Setup Instruction for frontend

1. **Install dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the frontend dev server:**

   ```bash
   npm run dev
   ```

   - The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port).

## Tech Stack Used

- **Frontend:** React 19, Vite, Tailwind CSS, React Icons, Axios
- **Backend:** Node.js, Express, Mongoose, MongoDB

## Features

- Add new tasks
- View all tasks
- Mark tasks as complete/incomplete
- Delete tasks

## Extra Features

- Edit and Update task description text
