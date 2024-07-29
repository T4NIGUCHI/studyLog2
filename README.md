![Study Record App Banner](./studyLog2_banner.jpg)

# Study Record App

This app is a simple React application for recording and managing study content and the time spent on it. It uses Supabase as the backend and allows adding, displaying, and deleting study records.

## Features

- Record study content and time
- Display list of records
- Delete records
- Display total study time

## Technologies Used

<img src="https://img.shields.io/badge/-React-blue.svg?logo=react&style=for the budge&logoColor=white">
<img src="https://img.shields.io/badge/-vite-yellow.svg?logo=vite&style=for the budge&logoColor=white">
<img src="https://img.shields.io/badge/-Supabase-green.svg?logo=supabase&style=for the budge&logoColor=white">
<img src="https://img.shields.io/badge/-Firebase-red.svg?logo=fireBase&style=for the budge&logoColor=white">

## Demo

https://deploytest-cb257.web.app/

## Installation and Setup

1. Clone the repository.

    ```sh
    git clone https://github.com/T4NIGUCHI/studyLog2.git
    cd study-record-app
    ```

2. Install the required dependencies.

    ```sh
    npm install
    ```

3. Set up Supabase.

    - Create a Supabase project and a table named `study-record`.
    - Create a `.env` file and set your Supabase URL and public API key.

    ```env
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_KEY=your-supabase-public-key
    ```

4. Start the development server.

    ```sh
    npm run dev
    ```

5. Open the app in your browser.

    ```
    http://localhost:XXXX
    ```

## Deploy to Firebase

1. Install the Firebase CLI.

    ```sh
    npm install -g firebase-tools
    ```

2. Log in to Firebase.

    ```sh
    firebase login
    ```

3. Initialize Firebase in your project.

    ```sh
    firebase init
    ```

    - Select Hosting and choose your existing project.
    - Set the public directory to `dist`.
    - Enable single-page app settings (rewrite all URLs to `/index.html`).

4. Build the project.

    ```sh
    npm run build
    ```

5. Deploy to Firebase.

    ```sh
    firebase deploy
    ```

## Usage

1. Enter study content and time, then click the "Register" button.
2. The added study record will be displayed in the list.
3. Click the "Delete" button next to each record to delete it.
4. The total study time will be displayed.

## Project Structure

```plaintext
.
├── src
│   ├── App.js
│   ├── firebase.js
│   ├── index.js
│   ├── supabase.js
│   └── styles.css
├── .env
├── package.json
├── README.md
├── .firebaserc
├── firebase.json
├── Makefile
├── viteconfig.js
└── index.html

