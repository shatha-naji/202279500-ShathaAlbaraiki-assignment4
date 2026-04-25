# Technical Documentation

## 1. Overview

This project is a responsive personal portfolio website built with HTML, CSS, and JavaScript. Assignment 4 is the final polished version of the web application and extends the previous assignments by adding final user experience improvements, better documentation, and professional presentation preparation.

The main features include:
- dark/light theme toggle with persistence
- portfolio dashboard
- project filtering, sorting, and searching
- contact form validation
- integration with the iTunes Search API
- visitor name storage using `localStorage`
- timer showing time spent on the site
- back-to-top navigation button
- responsive layout and improved visual design

## 2. Project Structure

The project follows an organized structure:
- `index.html` contains the page structure and semantic sections
- `css/styles.css` contains layout, visual styling, transitions, and responsive rules
- `js/script.js` contains all interactive behavior and DOM logic
- `assets/images/` stores project and profile images
- `docs/` stores technical and AI usage documentation
- `presentation/` stores the final slides and demo video

## 3. HTML Structure

The page is divided into the following main sections:
- Header and navigation
- Hero section
- Portfolio Dashboard section
- About section
- Projects section
- Skills section
- Music Explorer section
- Interactive Features section
- Contact section
- Footer
Semantic sectioning improves readability, accessibility, and maintainability.

## 4. CSS Design Approach
The styling uses CSS custom properties in `:root` to define reusable theme variables such as:

- `--bg`
- `--text`
- `--muted`
- `--card`
- `--accent`
- `--border`
- `--success`
- `--error`
- `--shadow`

When the `dark` class is added to the `<body>`, these values change dynamically to support dark mode.

## 5. Dark Mode and localStorage

Dark mode is implemented by toggling a `dark` class on the `<body>` element.

### Logic

1. Check if a theme is stored in `localStorage`
2. Apply the saved theme when the page loads
3. Toggle theme when the button is clicked
4. Save the updated preference in `localStorage`
5. Update the button icon based on the current theme

## 6. Portfolio Dashboard

Assignment 4 adds a dashboard section that summarizes the portfolio.
The dashboard displays:
- number of projects
- skill areas
- external API count
- responsive design status
The project count is updated dynamically using JavaScript based on the number of project cards available in the page.

## 7. Project Filtering

Users can filter projects by category:
- All
- Web
- React
- UI/UX
Each project card includes a `data-category` attribute.

### Filtering Process

1. Detect the clicked filter button
2. Update the active button state
3. Loop through project cards
4. Show cards matching the selected category
5. Hide cards that do not match
6. Display an empty-state message if no projects match

## 8. Project Sorting

Projects can be sorted using a dropdown menu.
Sorting options:
- Default order
- A-Z
- Z-A
- Newest first
- Oldest first

### Sorting Process

1. Read selected sort option
2. Extract project title and date from data attributes
3. Sort project cards based on the selected option
4. Re-render sorted cards inside the project container

## 9. Project Search

Assignment 4 adds project search functionality.
Users can search projects by:
- project title
- project description

### Search Process

1. Read the search input value
2. Convert the search term to lowercase
3. Compare it with each project card title and content
4. Display matching projects
5. Show a helpful message when no projects match

The search works together with filtering and sorting.

## 10. State Management

The application uses `localStorage` to preserve user preferences.
Stored values:
- theme
- visitor name
- selected project filter
- selected project sorting option

### Flow

1. Load stored values on page load
2. Apply them to the UI
3. Update storage when the user interacts with controls

## 11. Visitor Personalization

Users can enter their name to personalize the experience.

### Behavior

- Name is saved in `localStorage`
- A welcome message is displayed
- The value persists after refreshing the page
- Validation ensures the name has at least 2 characters

## 12. Timer Feature

A timer tracks how long a user stays on the site.

### Logic

1. Initialize a counter
2. Increase the counter every second using `setInterval`
3. Convert seconds into minutes and seconds
4. Update the text content in real time

## 13. API Feature – Music Explorer

The Music Explorer uses the iTunes Search API.

### How It Works

1. User enters a search query
2. A `fetch()` request is sent to the iTunes API
3. Results are returned in JSON format
4. Song cards are created dynamically
5. Results are displayed on the page

### User Feedback

The feature handles:
- empty search input
- loading state
- successful results
- no results found
- API or network errors

## 14. Event Handling

All interactions use `addEventListener` instead of inline HTML events.
Benefits:
- better structure
- easier maintenance
- separation of concerns
- cleaner HTML

## 15. Contact Form Validation

The contact form includes custom validation.
It checks:
- required fields
- minimum name length
- valid email format
- minimum message length
- maximum message length

### Validation Flow

1. Prevent default form submission
2. Read and trim input values
3. Validate inputs step-by-step
4. Show a clear error or success message
5. Reset the form after successful validation

## 16. Back-to-Top Button

Assignment 4 adds a back-to-top button.

### Behavior
- The button appears after the user scrolls down
- It disappears near the top of the page
- Clicking it smoothly scrolls the user back to the top
This improves navigation and user experience, especially on long pages.

## 17. User Experience Improvements
Enhancements include:
- clear feedback messages
- hover effects and transitions
- fade-in animations
- empty-state handling
- smooth theme switching
- project search and sorting controls
- responsive dashboard cards
- mobile navigation menu

## 18. Responsive Design
The site adapts to smaller screens using:
- Flexbox
- CSS Grid
- media queries
- flexible card layouts
- mobile navigation menu
The main media query uses:
```css
@media (max-width: 720px)
```
## 19. Performance Improvements
Optimizations include:
lazy loading images using loading="lazy"
clean and reusable CSS/JS
minimized unnecessary code
efficient DOM updates
optimized project rendering
organized file structure

## 20. Limitations
Current limitations:
Contact form does not connect to a backend
Some project links may still be placeholders
Music results depend on the availability of the iTunes API
The website is front-end only

## 21. Future Improvements
Possible future enhancements:
connect contact form to a backend or email service
add real project demo links
improve accessibility further
add more projects
add animations for project cards
add a downloadable resume
add GitHub links for each project

## 22. Conclusion
This final version of the portfolio combines all major concepts learned during the course, including HTML structure, CSS styling, responsive design, JavaScript interactivity, state management, API integration, form validation, documentation, and deployment preparation.