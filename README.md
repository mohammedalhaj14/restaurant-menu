# 🍽️ Gourmet Kitchen - Digital WhatsApp Menu

A professional, high-performance digital restaurant menu built with **React** and **Vite**. This application enables seamless browsing and a frictionless checkout process that sends orders directly to a restaurant's WhatsApp.

🚀 **Live Demo:** [https://my-restaurant-menu-xi.vercel.app/](https://my-restaurant-menu-xi.vercel.app/)

---

## ✨ Features

* **📱 Fully Responsive:** Optimized for mobile-first ordering.
* **🛒 Advanced Cart System:** Add, remove, and update quantities with real-time total calculation.
* **🔍 Category Filtering:** Switch between Burgers, Pizza, Salads, and Drinks instantly.
* **🔒 Mandatory Validation:** Built-in checks to ensure **Phone Number** and **Address** are provided before order submission.
* **🔢 Numeric-Only Input:** Smart filtering on the phone field to prevent customer typos.
* **💬 WhatsApp Receipt:** Generates a beautifully formatted receipt message automatically.
* **⚡ Ultra-Fast:** Powered by Vite for near-instant load times.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React (Vite)** | Frontend Framework & Build Tool |
| **Bootstrap 5** | Responsive UI & Grid System |
| **WhatsApp API** | Direct Customer-to-Business Communication |
| **Vercel** | Cloud Hosting & Continuous Deployment |
| **Git Bash** | Version Control Management |

---

## ⚙️ How It Works (Technical Flow)

The app manages state using React hooks. When a user clicks "Order," the system validates the inputs and constructs a URI-encoded string to trigger the WhatsApp API.



---

## 🚀 Installation & Local Setup

To run this project on your local machine:

1. **Clone the project:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/restaurant-app.git](https://github.com/YOUR_USERNAME/restaurant-app.git)

```

2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```



---

## 📂 Project Structure

```text
restaurant-app/
├── src/
│   ├── App.jsx        # Main logic, Menu data, and Cart state
│   ├── main.jsx       # React entry point
│   └── index.css      # Custom styling & animations
├── public/            # Static assets
├── package.json       # Project dependencies
└── README.md          # Project documentation

```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

**Developed with ❤️ by [Mohammad Al Haj]**
