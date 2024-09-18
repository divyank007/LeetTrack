
# LeetTrack

LeetTrack is a tool designed to help users manage and track important LeetCode problems. It allows users to save problems they find important and review them later. The project consists of a web application and a Chrome extension for seamless integration with LeetCode.

## Features

- Save Important Problems: Mark and save important LeetCode problems directly from the website.
- View Saved Problems: Access and review saved problems through the web application.
- Google OAuth Integration: Secure authentication using Google OAuth.
- Chrome Extension: Easily mark problems as important while browsing LeetCode.


## Project Structure
The project is divided into three main components:

**Frontend**: A web interface built using React (or Vite) that allows users to interact with the application.

**Backend**: A server-side application built with Node.js and Express, responsible for handling data and interacting with the MongoDB database.

**Extension**: A Chrome extension that integrates with LeetCode, allowing users to save problems directly from the browser.
## Installation

**Frontend**

1.Navigate to the frontend directory:

```bash
  cd frontend
```
2.Install dependencies:

```bash
npm install
```
3.Start the development server:
```bash
npm start
```

**Backend**

1.Navigate to the backend directory:
```bash
cd backend
```
2.Install dependencies:

```bash
npm install
```
3.Start the server:
```bash
npm start
```

**Extension**
- Open Chrome and go to chrome://extensions/.
- Enable "Developer mode".
- Click "Load unpacked" and select the extension directory.
    
## Configuration

Create a .env file in the backend directory with the following variables:

```bash
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
```
Replace placeholders with your actual values.
## Usage

- Open the web application in your browser. 
- You can log in using Google OAuth.
- Use the Chrome extension to mark LeetCode problems as important.
- View and manage your saved problems through the web interface.
