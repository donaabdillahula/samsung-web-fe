# Samsung Library Frontend

A modern library management web application built with **React** and **Vite**.

## Features

- Book management (CRUD)
- Member management
- Borrow & return books
- Top books & members
- Responsive UI (mobile, tablet, desktop)
- Dark mode

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/donaabdillahula/samsung-web-fe.git
cd samsung-web-fe
```

### 2. Install dependencies

```sh
npm install
```

### 3. Run the development server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Environment Variables

Edit the `.env` file to set your API endpoint:

```
VITE_API_URL="https://your-api-url"
```

## Build for Production

```sh
npm run build
```

## Docker Support

Build and run with Docker:

```sh
docker build -t yourusername/samsung-web-fe .
docker run -p 8080:80 yourusername/samsung-web-fe
```

## License

MIT

---

Made with ❤️ by Dona Abdillah Ula