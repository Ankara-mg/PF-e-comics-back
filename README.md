## E-Comics Backend

### **1. Project Overview**

This project is the backend for **E-Comics**. It is built using **Node.js, TypeScript, Sequelize, Postgres, Express.js, Axios**, and some smaller dependencies for authentication and payment flow.

**Features:**

- Fetches comics from a public API and stores relevant data to the database.
- User sign up with credentials or Google.
- Users can save their favorite comics.
- Purchase comics using Stripe for payments.
- Add ratings to comics.
- Admin panel for managing comics and users.

**Future goals:**

- Strengthen admin dashboard functionality.
- Improve error handling using more descriptive HTTP status code.
- Showcase admin routes to allow visitors to see the project without altering the database.

---

### **2. Prerequisites**

- Node.js v22.18.0
- PostgreSQL v15.13
- A ComicVine api key
- *(Optional)* Google/Gmail app password
- *(Optional)* Stripe secret key

---

### **3. Database Setup**

* This project needs a PostgreSQL database to run. 
* Create the PostgreSQL and configure the connection variables in the `.env` file.
* To populate the database, run:
```bash
npm run seed
```

---

### **4. Node Setup**

1. Clone the repository.

```bash
git clone https://github.com/Ankara-mg/PF-e-comics-back
```

2. Install dependencies.

```bash
npm install
```

3. Add an `.env` to the project root.

4. Use `.env.example` as a reference for the required variables.

---

### **5. Running the Backend**

Start the server:

```bash
npm start
```

The backend will run at `http://localhost:PORT`. Example route: `http://localhost:3000/comics`.

---

### **6. API Endpoints**

* `GET /comics` -> Returns a list of all the comics in the database.

---

### **7. Environment Variables**

**Server:**
* `PORT` - Port where this project will run.
* `FRONT_URL` - URL of the frontend that will consume this API.

**Database:**
* `PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT` - PostgreSQL credentials.

**Third party APIs:**
* `API_URL, API_KEY` - ComicVine API.
* `STRIPE_KEY` - Stripe secret key.
* `GOOGLE_CLIENT_ID` - Google OAuth client ID.

**Security:**
* `SESSION_SECRET_USER, SESSION_SECRET_ADMIN` - JsonWebToken secret strings.

**Mailer:**
* `MAILER_EMAIL` - Gmail account to send emails.
* `MAILER_PASSWORD` - Gmail app password, this is a 16 character string, not your account password.

---

### **8. Notes**

* This project is running on a Render free tier. This means that the database resets montly and sleeps after 15 minutes of inactivity, which can cause slow start up times.

### **9. Changelog**

**v2.0.0 - Refactoring**

- Improved TypeScript typing.
- Normalized all variable names.
- Converted most model fields to `snake_case`.
- Moved API fetching into seeders.
- Separated functions into controllers instead of routes.
- Merged similar files (example: auth and user routes).
- Removed unnecessary and duplicated functions.
- Changed names of route and controller files so they follow the same format.
- Changed some endpoint names.

------

## Español (Resumen)

Este proyecto es el backend para **E-Comics**. Construido con **Node.js, TypeScript, Sequelize, Postgres, Express.js, Axios**, y otras dependencias más pequeñas para manejar los pagos y autenticación.

**Funcionalidades:**

- Busca comics de una API pública y guarda los datos relevantes en la base de datos.
- Los usuarios se registran con credenciales o Google.
- Los usuarios pueden guardar sus comics favoritos.
- Comprar comics usando Stripe para los pagos.
- Agregar puntaje a los comics.
- Panel de admin para manejar los comics y los usuarios.
