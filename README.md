# ChannelplayDesk MailService

A Node.js/Express-based mail service that integrates with Supabase for email storage and management. This project is designed to be production-ready, featuring a health check endpoint and environment-based configuration.

## Features
- RESTful API for email operations
- Supabase integration for database storage
- Health check endpoint for monitoring
- Environment variable support via `.env`
- Modular code structure

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- Supabase account (for database access)

### Installation
1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd ChannelplayDesk_mailService
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and fill in your actual Supabase credentials and desired port (if needed).
   - **Never commit your real `.env` file to version control.**

### Running the Server
```sh
node index.js
```

The server will start on the port specified in your `.env` file (default: 3000). On AWS or other cloud platforms, the `PORT` may be set automatically by the environment—check your platform documentation.

### API Endpoints
- `GET /health` — Health check endpoint
- `POST /api/incoming-email` — Save a new email

## Project Structure
```
ChannelplayDesk_mailService/
├── index.js
├── models/
│   └── emailModel.js
├── routes/
│   └── emailRoutes.js
├── controllers/
│   └── emailController.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Health Check
The `/health` endpoint returns a JSON object indicating the status and uptime of the server. Use this for monitoring and orchestration.

## Deployment
1. **Clone the repository and install dependencies** (see above).
2. **Copy `.env.example` to `.env` and fill in the real values.**
   - For AWS or other cloud platforms, ensure the `PORT` variable matches the platform's requirements (it may be set automatically).
3. **Set `NODE_ENV=production`** for production deployments.
4. **Start the server:**
   ```sh
   node index.js
   # or use a process manager like PM2
   pm2 start index.js
   # or use Docker if a Dockerfile is present
   ```
5. **Do not commit or share your real `.env` file.**

## License
ISC
