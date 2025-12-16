# 📱 **Social Media Web App**

*A modern Social Media platform inspired by Threads.*

---

### 🏷️ **Badges**

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative)
![Status](https://img.shields.io/badge/Status-Under%20Development-orange)

---

## ✨ **Features**

Social Media Web app delivers the core functionality expected of a modern Socia Media platform:

* **Comment/Like** - Interact with others posts
* **Posting Content** - Include text and photos
* **Following people** - Sending following requests to other people
* 💬 **One-on-One Chat** – Private conversations between two users.
* 🖼️ **Media Support** – Send and receive images (with file size limits).
* 🕒 **Message History** – Persistent storage for all chat records.
* 🔐 **User Authentication** – Secure login and registration using **JWT Auth**.

---

## 💻 **Tech Stack**

The app is built using a **modern, scalable architecture**.

### 🖥️ **Frontend**

* **Framework:** ReactJS
* **Styling:** Tailwind CSS / Styled Components

### 🌐 **API**

* **Type:** RESTful API

---

## 🚀 **Getting Started**

Follow these steps to set up and run the project locally.

### **Prerequisites**

Make sure you have installed:

* **npm** or **yarn**

---

### **Installation**

#### 1️⃣ Clone the Repository

```bash
git clone http://github.com/vietAnhPhan/social-media-frontend.git
```

#### 2️⃣ Install Client Dependencies

```bash
cd social-media-frontend
npm install
# or
yarn install
```
---

## ⚙️ **Running Locally**

### **1. Configure Environment Variables**

#### **client `.env`**

Create a `.env` file in `social-media-frontend/`:

```bash
VITE_SERVER_DOMAIN=[BACKEND_DOMAIN]/api
VITE_SUPABASE_PROJECT_URL=[SUPABASE_PROJECT_URL]
VITE_SUPABASE_API_KEY=[SUPABASE_API_KEY]
```

---

### **2. Start the Frontend Client**

```bash
cd ../social-media-frontend
npm run dev
```

Client runs at: **[http://localhost:[YOUR_PORT](http://localhost:[YOUR_PORT)]**

---

## 🛠 **Usage**
When you naviate to the root, you will see a feed of the page without login.
Features do not require authentication:

1. **Register (Optional):** Go to `http://localhost:[YOUR_PORT]/sign-up` to create a new account.
2. **Login:** Use your credentials to access features like: Posting, updating profile, sending messages, following people.
   
Other features require authentication:
3. **Posting content:** Include text and images.
4. **Start Chatting:** Select a any user to start chatting
5. **Following People**
6. **Like, comment on posts**

---

## 🤝 **Contributing**

We welcome contributions!

1. **Fork** the project
2. **Create** a feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to your branch

   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 **License**

Distributed under the **MIT License**.
See the `LICENSE` file for more information.

---

## 📧 **Contact**

**Viet Anh Phan** – [vietanhphan2810@gmail.com](mailto:vietanhphan2810@gmail.com)
**Project Link:** [GitHub Repository](https://github.com/vietAnhPhan/social-media-frontend/)
