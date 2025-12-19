# Frontend Documentation - DogDiet + AI

This directory contains the frontend code for the **WhiskerWorthy** application (DogDiet + AI version).

## Overview
The frontend is a simple, responsive web interface designed to collect dog information and display AI-generated veterinary questions. It interacts with the FastAPI backend to submit data and retrieve recommendations.

## Key Changes & Design Decisions

### 1. Visual Identity & Color Palette
To distinguish this "AI-enhanced" version from the original DogDiet repository, the color scheme has been updated to a warmer, more organic palette:

*   **Background:** Blanched Almond (`#FFEBCD`) - Provides a softer, paper-like reading experience.
*   **Primary Accent:** Dark Cranberry (`#6b0f1a`) - Used for headings and key emphasis.
*   **Secondary Accent:** Deep Green (`#0b3d2e`) - Used for buttons and interactive elements.
*   **Card Background:** Very Light Tan (`#fbf6f0`) - Creates subtle separation for content blocks.
*   **Typography:** Georgia / Times New Roman (Serif) - Chosen for a more editorial, trustworthy, and "classic" feel compared to standard sans-serif web fonts.

### 2. Imagery
*   **Header Image:** Uses `Banner_origami_habitat.png` (located in `public/assets/`). This origami-style banner reinforces the "crafted" and thoughtful nature of the application, moving away from generic stock photos.

### 3. AI Integration Features
The UI has been specifically adapted to accommodate the AI-generated content:

*   **Dynamic Results Section:** A dedicated container (`#aiQuestionsResult`) was added to the DOM.
*   **Loading State:** When the form is submitted, the UI provides immediate feedback ("Submitted — generating vet questions...") to manage user expectations while the LLM processes the request.
*   **Response Formatting:** The JavaScript logic (`main.js`) parses the AI's text response. It handles both list-based and newline-separated text to ensure the "3 Questions" are displayed as a clean, ordered list (`<ol>`) for easy reading.
*   **Disclaimer:** A prominent disclaimer ("informational only — not medical advice") is automatically injected alongside the AI results to ensure safety and clarity.

## File Structure
*   `index.html`: The main entry point and structure of the page.
*   `public/style.css`: Contains all custom styling and CSS variables.
*   `public/main.js`: Handles form submission, API calls to the backend, and DOM manipulation for displaying results.
*   `public/assets/`: Stores static images like the banner.
