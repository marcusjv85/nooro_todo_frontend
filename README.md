# 🚀 Todo List App (Frontend)

A **simple and responsive** Todo List application built with **Next.js, Tailwind CSS, and TypeScript**. This app allows users to **add, edit, complete, and delete tasks** with color categorization.

## 🌟 Features
- ✅ **Create, edit, and delete tasks**
- 🎨 **Color-coded tasks for better organization**
- 📌 **Mark tasks as completed**
- 📊 **Summary of total & completed tasks**
- ⚡ **Fully responsive and modern UI**
- 🌙 **Dark mode compatible**

---

## 🛠️ Tech Stack
- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: `useState`, `useEffect`
- **Icons**: React Icons (`react-icons`)
- **API Calls**: [Axios](https://axios-http.com/)

---

## 📦 Project Structure
```
📂 todo-frontend
├── 📁 components
│   ├── TaskItem.tsx  # Individual task component
│   ├── TaskList.tsx  # Task list wrapper
├── 📁 pages
│   ├── index.tsx     # Home page (Task list + summary)
│   ├── new.tsx       # Create Task page
│   ├── [id].tsx      # Edit Task page
├── 📁 public
│   ├── favicon.ico
├── 📁 styles
│   ├── globals.css   # Tailwind + global styles
├── layout.tsx        # App layout (header, metadata)
├── tsconfig.json     # TypeScript config
├── next.config.js    # Next.js config
├── package.json      # Dependencies & scripts
├── README.md         # This file
```

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/todo-frontend.git
cd todo-frontend
```

### **2️⃣ Install Dependencies**
```sh
npm install
# or
yarn install
```

### **3️⃣ Start the Development Server**
```sh
npm run dev
# or
yarn dev
```
- Runs the frontend on `http://localhost:3000`

---

## ⚙️ Environment Variables
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
> Update this URL if your backend is hosted elsewhere.

---

## 🔗 Backend API (Required)
Make sure your **backend server** is running before starting the frontend.

- The backend should be available at `http://localhost:5000`
- Follow the backend setup guide for installation.

---

## 📝 API Endpoints (Used by Frontend)
| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| `GET`  | `/tasks`             | Fetch all tasks |
| `GET`  | `/tasks/:id`         | Fetch a single task |
| `POST` | `/tasks`             | Create a new task |
| `PUT`  | `/tasks/:id`         | Update an existing task |
| `DELETE` | `/tasks/:id`       | Delete a task |

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author
**Your Name**  
🔗 GitHub: [@marcusjv85](https://github.com/marcusjv85)  
📧 Email: marcusjv85@gmail.com 
