
# NirogGyan Healthcare Frontend

This is the frontend for the NirogGyan Healthcare Appointment System, built with React and Vite. It provides a modern, responsive user interface for booking doctor appointments, viewing doctors, and managing appointments.

---

## Tools/Libraries Used
 
- **React (JavaScript)**: UI library for building interactive user interfaces
- **Vite**: Fast build tool and development server
- **Material UI (MUI)**: Component library for modern, accessible UI
- **Axios**: Promise-based HTTP client for API requests
- **React Router DOM**: Routing and navigation
- **Node.js/Express (Backend API)**: For API endpoints (see backend repo)

---

## Improvements with More Time

- Add user authentication (login/signup, JWT, role-based access)
- Implement appointment reminders via email/SMS
- Add doctor profile images and richer doctor bios
- Improve accessibility (ARIA, keyboard navigation)
- Add admin dashboard for managing doctors and appointments
- Enable appointment rescheduling and cancellation
- Add internationalization (i18n) support
- Enhance mobile UI/UX
- Further polish and modernize the UI/UX design (animations, theming, branding)
- Add a dedicated failure/error view for network/API errors and empty states
- Extend backend to support doctor working hours and appointment slot validation
- Add more robust form validation and user feedback

---

## Challenges Faced and Solutions

- **Confirmation Overlay Timing:**
  - Challenge: Ensuring the appointment confirmation modal was reliably visible for 3 seconds, not hidden by spinners or unmounted by parent navigation.
  - Solution: Managed overlay state and parent navigation timing so the modal always displays for the intended duration before redirecting or resetting the form.

- **Responsive Layout and Card Centering:**
  - Challenge: Achieving perfect centering and alignment of cards and overlays on both mobile and desktop.
  - Solution: Used Material UI's responsive utilities, custom CSS, and flexbox to ensure consistent layout across breakpoints.

- **Error Handling and User Feedback:**
  - Challenge: Providing clear error messages for booking conflicts and API failures.
  - Solution: Implemented robust error handling with user-friendly alerts and status overlays.

---

## Getting Started

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. The app will be available at `http://localhost:5173/` (or as shown in your terminal)

---

---

## Backend API

This project is powered by a custom backend built with Node.js and Express.

- **Backend Repository:** [healthcare_backend](https://github.com/Angapparajk/healthcare_backend)
- **Deployed API:** [https://niroggyan-healthcare.onrender.com](https://niroggyan-healthcare.onrender.com)


### Main API Endpoints

- **Doctors List:** `GET https://niroggyan-healthcare.onrender.com/api/doctors`
- **Single Doctor:** `GET https://niroggyan-healthcare.onrender.com/api/doctors/:id`
- **Appointments List:** `GET https://niroggyan-healthcare.onrender.com/api/appointments`
- **Book Appointment:** `POST https://niroggyan-healthcare.onrender.com/api/appointments`

All appointment and doctor data is managed via this backend. See the backend repo for API documentation and implementation details.
