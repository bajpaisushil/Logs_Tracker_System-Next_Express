module.exports = {
  apps: [
    {
      name: "log-backend",
      script: "./backend/dist/server.js",
      cwd: "/app",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
        FRONTEND_URL: "http://localhost:3000",
      },
    },
    {
      name: "log-frontend",
      script: "npm",
      args: "start",
      cwd: "/app/frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_PUBLIC_API_URL: "http://localhost:8000",
      },
    },
  ],
}
