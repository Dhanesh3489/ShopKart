# ShopKart

A sample e-commerce application with ASP.NET Core backend and Angular frontend.

## Prerequisites
- .NET 8 SDK
- Node.js (16+)
- npm (or yarn)

## Backend (API)
From repository root:

```bash
cd backend
dotnet restore
dotnet build
dotnet run --urls "http://localhost:5000"
```

The API runs on http://localhost:5000 by default.

## Frontend (Angular)
From repository root:

```bash
cd frontend
npm install
npm start
# or to build
npm run build
```

The frontend dev server typically runs on http://localhost:4200 and proxies API requests to the backend.

## Development workflow
- Update code in `backend/` and `frontend/`
- Commit changes and push to GitHub

## Repository
Remote: https://github.com/Dhanesh3489/ShopKart.git

## License
Add a license if you plan to publish this project.