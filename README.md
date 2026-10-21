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
* `ItemDetailsModal.jsx`: Shows details for the selected resource.
* `Footer.jsx`: Displays the page footer.
* `public/resources.json`: Provides the sample resource data loaded by the Fetch API.

The Discover page passes data and event handlers to child components through props. Resource loading, search, filtering, and modal selection state are managed in the Discover component.


## Author

Gospel Bright Mbaocha
git push origin main
