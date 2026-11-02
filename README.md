# BookSwap — Campus Resource Exchange

BookSwap is a campus-based resource discovery and exchange frontend designed to help university students find textbooks, course materials, and essential student equipment.

## Problem Statement

University students often need affordable access to textbooks, course outlines, and other learning materials. BookSwap provides a simple interface for discovering available resources and viewing uploader contact information.

## Project Objectives

* Help students discover available academic resources.
* Organise resources by category.
* Allow students to search for specific materials.
* Display resource descriptions and uploader contact information.
* Provide a responsive and accessible user interface.
* Practise reusable React components and asynchronous data loading.

## Current Features

* Welcome section introducing the platform.
* Resource cards displaying available materials.
* Search functionality for finding resources.
* Category filters for organising resources.
* Resource details modal with descriptions and uploader contact information.
* Asynchronous resource loading using the Fetch API.
* Resource data stored in a local JSON file.
* Loading message while resources are being fetched.
* Error message and Retry button when resource loading fails.
* Empty state when no resources match the search or selected category.
* Clear filters option when no search results are found.
* Responsive layout for mobile devices.
* Meaningful path-based navigation and placeholder pages for unfinished routes.
* Keyboard focus styling and modal keyboard support (manual verification is still recommended).

## Navigation and Status Pages

The application uses meaningful path URLs rather than hash links:

- `/discover`: resource discovery.
- `/uploads`: Coming Soon placeholder for the planned My Uploads page.
- `/history`: Coming Soon placeholder for the planned My History page.
- `/unauthorized`: an informational 401-style page for the prototype.
- Unknown paths show a not-found page.

Sign-up stores demo account records in the browser localStorage, and sign-in checks the submitted email and password against those records. The active session is stored in sessionStorage and ends when the browser session is cleared. This is prototype behaviour only: passwords are not securely hashed and browser storage can be inspected or changed. Never use real passwords or sensitive personal information.

The unauthorized page is a frontend demonstration only. BookSwap does not currently have real authentication, protected server routes, or an HTTP 401 response from a backend. Do not treat the placeholder as security enforcement; real authorization requires a backend or authentication provider.

Direct path access is configured for Vercel in `vercel.json`.

## Technologies Used

* React
* JavaScript
* Vite
* HTML
* CSS
* JSON
* Fetch API
* Git and GitHub
* Vercel for deployment

## Data Source

BookSwap currently loads sample resource data from `public/resources.json` using the Fetch API. The data includes resource titles, categories, departments, descriptions, conditions, and sample uploader contact details.

The project does not currently use a backend server or database. The resource data is provided for frontend development and demonstration.

## Getting Started

### Prerequisites

Install Node.js and npm on your computer.

### Installation

1. Clone or download this repository.

2. Open the project folder in your terminal.

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

If PowerShell blocks the npm script, try:

```bash
npm.cmd run dev
```

### Mobile Testing

To test the development version on a phone connected to the same network as your computer, run:

```bash
npm.cmd run dev -- --host 0.0.0.0
```

Then open the Network URL displayed by Vite on your phone.

## Testing

The following checks have been completed during development:

* Confirmed that all six sample resources appear on the Discover page.
* Confirmed that searching for “Microbiology” filters the resources correctly.
* Confirmed that selecting the Equipment category filters the results correctly.
* Confirmed that a search with no matching results displays an empty state and a Clear filters option.
* Tested the resource loading error state and Retry button.
* Confirmed that resources appear again after restoring the correct JSON file path.

## Project Status

BookSwap is a frontend prototype developed as part of BuildLab Stage 1. The current implementation includes resource discovery, search and category filtering, resource details, and asynchronous loading of local JSON data.

Further development may include additional interactions, improved data persistence, and backend integration, depending on the project requirements.

## Project Purpose

This project is being developed as part of a frontend development learning experience with BuildLab.


## Component Map

The Discover page is organised into reusable React components.

* `Discover.jsx`: Main page component. Manages resource loading, search, filtering, selected item, and swap state.
* `Navbar.jsx`: Displays the navigation.
* `WelcomeSection.jsx`: Introduces the BookSwap platform.
* `SearchBar.jsx`: Accepts the user's search input through props.
* `CategoryFilter.jsx`: Allows users to select a resource category.
* `ResourceGrid.jsx`: Displays the filtered resource list.
* `ResourceCard.jsx`: Displays an individual resource.
* `ItemDetailsModal.jsx`: Shows details for the selected resource and manages keyboard focus while open.
* `StatusPage.jsx`: Reusable Coming Soon, unauthorized, and not-found page layouts.
* `Footer.jsx`: Displays the page footer.
* `public/resources.json`: Provides the sample resource data loaded by the Fetch API.

The Discover page passes data and event handlers to child components through props. Resource loading, search, filtering, and modal selection state are managed in the Discover component.


## Author

Gospel Bright Mbaocha
git push origin main
