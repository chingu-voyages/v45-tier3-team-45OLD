# Friendscape

This project is part of the Chingu Voyages initiative, where developers collaborate to build web applications. Our team has worked diligently to create a responsive and user-friendly web application designed to connect users in a dynamic community platform. Users can create profiles, share posts, interact with others, and stay updated with real-time notifications. Leveraging Firebase's capabilities, the application ensures seamless data synchronization, robust authentication, and a user-friendly experience. Our team has worked diligently to integrate modern technologies and provide a responsive interface suitable for various devices.

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/dc2b6452-3737-4d4c-b925-487738f779cd/deploy-status)](https://app.netlify.com/sites/friendscape-chingu/deploys)

## Table of Contents

- [Friendscape](#friendscape)
  - [Badges](#badges)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Tech Stack](#tech-stack)
  - [Challenges Faced](#challenges-faced)
  - [Demo](#demo)
  - [Contributors](#contributors)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Features

- User authentication
- Dynamic content rendering
- Interactive UI components
- Mobile-responsive design

## Installation

```bash
git clone https://github.com/chingu-voyages/v45-tier3-team-45OLD.git
cd v45-tier3-team-45OLD
npm install
npm run dev
```

## Environment Variables

To run this project, you will need create a copy of the `.env.template` and rename it `.env`. Create a firebase project and setup authorization and firestore.

```bash
VITE_apiKey=[firebase_API_key]
VITE_authDomain=[firebase_Auth_domain]
VITE_projectId=[firebase_project_id]
VITE_storageBucket=[firebase_storage_bucket]
VITE_messagingSenderId=[firebase_app_sender_id]
VITE_appId=[Firebase_app_id]
VITE_TALKJS_APPID=[TalkJS_APPID]
```

## Tech Stack

- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Firebase**: A platform for web and mobile app development.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Prettier**: An opinionated code formatter that ensures consistent code style.
- **Lint-staged**: Runs linters on pre-committed files in git to ensure code quality.
- **GitHub Actions**: Automates, customizes, and executes software development workflows within GitHub.
- **Husky**: Simplifies Git hooks setup to ensure code quality checks before commits and pushes.

## Challenges Faced

- **State Management**: Balancing between local component state and global state was challenging. We used Redux to manage global state and React's useState for local states.
- **Responsive Design**: Ensuring the application looked and functioned well on all device sizes required careful planning and testing.
- **Integration with Third-party APIs**: We faced some issues with rate limits and had to implement caching to mitigate them.

## Demo

Check out the live demo of our project [here](https://friendscape-chingu.netlify.app/). Below are some screenshots of our application:

![Landing Page](/public/link-to-landing-page-screenshot.png)
![User Dashboard](/public/link-to-dashboard-screenshot.png)

## Contributors

- [TimDeHof](https://github.com/timDeHof)
- [Yi-lin-1234](https://github.com/yi-lin-1234)
- [Bsmith86dev](https://github.com/bsmith86dev)
- [Jahedprince](https://github.com/jahedprince)
- [Toxicity1314](https://github.com/Toxicity1314)
- [Tyler W](https://github.com/tylerwertman)

## Acknowledgements

- We're grateful for the comprehensive documentation and community support provided by [React](https://reactjs.org/), [Vite](https://vitejs.dev/) and [Firebase](https://firebase.google.com/).
- Special thanks to the [Chingu](https://chingu.io/) community for providing the platform and support throughout the development process.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
