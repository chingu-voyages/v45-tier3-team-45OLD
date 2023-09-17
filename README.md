<!-- Designed for Chingu Voyage 45 09.2023 -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/dc2b6452-3737-4d4c-b925-487738f779cd/deploy-status)](https://app.netlify.com/sites/friendscape-chingu/deploys)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

<div align="center">
 <h1>Friendscape</h1>

<h6>This project is part of the Chingu Voyages initiative, where developers collaborate to build web applications. <br/>Our team has worked diligently to create a responsive and user-friendly web application designed to connect users in a dynamic community platform. Users can create profiles, share posts, interact with others, and stay updated with real-time notifications. Leveraging Firebase's capabilities, the application ensures seamless data synchronization, robust authentication, and a user-friendly experience. Our team has worked diligently to integrate modern technologies and provide a responsive interface suitable for various devices.</h6>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Tech Stack](#tech-stack)
- [Challenges Faced](#challenges-faced)
- [Production Documents](#production-documents)
  - [Live Demo](#live-demo)
  - [Screenshots](#screenshots)
  - [Figma Wireframe](#figma-wireframe)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Features

- User authentication
- Dynamic content rendering
- Interactive UI components
- Mobile-responsive design

## Usage

Hosted at:
[Friendscape](https://friendscape-chingu.netlify.app/)

To use the application, you must create an account or use the test credentials provided below. Visit the sign-up page to create an account.

Test user credentials:
| Email Address | Password |
|--------------------------|--------------- |
| v45tier3team45@gmail.com | chinguVoyage45 |

After creating an account, visit the login page to login.

You can perform any of the following action:

- View your profile
  - Change your avatar
  - Edit your username
  - Edit your about me
- View all posts
  - like a post
  - add a comment
- Add a post
- Edit your posts
- Message other users

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

|     Technology     | Description                                                                                           |
| :----------------: | ----------------------------------------------------------------------------------------------------- |
|      **Vite**      | A build tool that aims to provide a faster and leaner development experience for modern web projects. |
|     **React**      | A JavaScript library for building user interfaces.                                                    |
|     **Redux**      | A predictable state container for JavaScript apps.                                                    |
|  **Tailwind CSS**  | A utility-first CSS framework for rapidly building custom designs.                                    |
|    **Firebase**    | A platform for web and mobile app development.                                                        |
|     **ESLint**     | A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.                 |
|    **Prettier**    | An opinionated code formatter that ensures consistent code style.                                     |
|  **Lint-staged**   | Runs linters on pre-committed files in git to ensure code quality.                                    |
| **GitHub Actions** | Automates, customizes, and executes software development workflows within GitHub.                     |
|     **Husky**      | Simplifies Git hooks setup to ensure code quality checks before commits and pushes.                   |

## Challenges Faced

- **State Management**: Balancing between local component state and global state was challenging. We used Redux to manage global state and React's useState for local states.
- **Responsive Design**: Ensuring the application looked and functioned well on all device sizes required careful planning and testing.
- **Integration with Third-party APIs**: We faced some issues with rate limits and had to implement caching to mitigate them.

## Production Documents

### Live Demo

Check out the live demo of our project [here](https://friendscape-chingu.netlify.app/). Below are some screenshots of our application:

### Screenshots

<div>
  <div align="center">
    <h4>Landing Page</h4>
    <img width="600" alt="landing page for friendscape" src="/public/link-to-landing-page-screenshot.png" />
  </div>
  <div align="center">
    <h4>Dashboard</h4>
    <img width="600" alt="dashboard page for friendscape" src="/public/link-to-dashboard-screenshot.png" />
  </div>
</div>
 <!-- ![Landing Page](/public/link-to-landing-page-screenshot.png) -->
 <!-- ![User Dashboard](/public/link-to-dashboard-screenshot.png) -->

### Figma Wireframe

[FriendScape Wireframe](https://www.figma.com/file/UynqYGitT0uhLwZvnZC8hb/Chingu-Project?type=design&node-id=0%3A1&mode=design&t=JvigJ5KX7OOIZqWm-1)

## Contributors

|     Name     | Link                                                               |
| :----------: | :----------------------------------------------------------------- |
|   TimDeHof   | [https://github.com/timDeHof](https://github.com/timDeHof)         |
| Yi-lin-1234  | [https://github.com/yi-lin-1234](https://github.com/yi-lin-1234)   |
| Bsmith86dev  | [https://github.com/bsmith86dev](https://github.com/bsmith86dev)   |
| Jahedprince  | [https://github.com/jahedprince](https://github.com/jahedprince)   |
| Toxicity1314 | [https://github.com/Toxicity1314](https://github.com/Toxicity1314) |
|   Tyler W    | [https://github.com/tylerwertman](https://github.com/tylerwertman) |

## Acknowledgements

- We're grateful for the comprehensive documentation and community support provided by [React](https://reactjs.org/), [Vite](https://vitejs.dev/) and [Firebase](https://firebase.google.com/).
- Special thanks to the [Chingu](https://chingu.io/) community for providing the platform and support throughout the development process.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
