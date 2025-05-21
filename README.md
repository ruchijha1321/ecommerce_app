# E-commerce Application

A full-featured e-commerce web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## Setup Instructions

1. **Clone the Repository**
   Clone the project and navigate to the root directory.

2. **Install Server Dependencies**

   ```bash
   npm install
   ```

3. **Build Frontend**
   Navigate to the `frontend` directory and run:

   ```bash
   npm install
   npm run build
   ```

4. **Configure Environment Variables**
   Open the environment configuration file (e.g., `backend/config/config.env`) and set your MongoDB connection string:

   ```env
   DB_LOCAL_URI=mongodb://localhost:27017/your-database-name
   ```

5. **Load Sample Data (Optional)**
   From the root directory, run:

   ```bash
   npm run seeder
   ```

6. **Run the Application in Production Mode**

   ```bash
   npm run prod
   ```

---

## Access the Application

Once the server is running, open your browser and go to:
**[http://localhost:8000](http://localhost:8000)**

---

## API Documentation

You can import the API collection into Postman using a shared link or local file as provided with the project.

---

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

---

Let me know if you'd like this adapted for Docker, CI/CD, or cloud deployment.
