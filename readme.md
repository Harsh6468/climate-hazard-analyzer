# Climate Hazard Trend Analyzer

A web application to analyze and visualize trends in climate hazards, focusing on heatwaves.  
Users can select geographic regions (city, state, or custom latitude-longitude bounding box), specify a time range from 1990 to 2020, and explore interactive charts and maps.  
Supports data export to CSV and PDF formats for further analysis.

---

## Features

- **Region Selection:** Choose from predefined cities/states or define a custom latitude-longitude bounding box.
- **Default Hazard Type:** Heatwave analysis selected by default.
- **Time Range:** Select a year range between 1990 and 2020.
- **Interactive Visualizations:** Time-series charts and maps showing hazard frequency and intensity.
- **Summary Insights:** Displays statistics like “Heatwaves have increased by 40% in this region since 1990.”
- **Export Options:** Download reports as CSV or PDF.
- **Leaflet Map Integration:** Visual region selector with bounding box highlighting.
- **Input Validation & Error Handling:** Secure API access with validation of user inputs.

---

## Folder Structure

```
/backend
├── app.py                 # Flask backend API
├── models.py              # Data models and database schema
├── db                     # Database files (if any)
├── utils.py               # Utility functions and helpers

/frontend
├── src
│   ├── components
│   │   ├── RegionSelector.jsx
│   │   ├── Chart.jsx
│   │   ├── ExportButtons.jsx
│   │   └── MapSelector.jsx
│   ├── App.jsx
│   ├── index.js
│   ├── styles.css
├── public
└── package.json
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
```

3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask server:

```bash
flask run
```

Backend API will be available at `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
# or
yarn install
```

3. Start the React development server:

```bash
npm start
# or
yarn start
```

Frontend will be available at `http://localhost:3000`.

---

## Usage

* Select a location via dropdown or enter a custom bounding box with latitude and longitude.
* Adjust the time range slider (1990 to 2020).
* View heatwave hazard summaries, interactive charts, and map.
* Export data and summaries as CSV or PDF using the buttons.

---

## Technologies Used

* **Backend:** Flask, Pandas, NoSQL database (e.g., MongoDB)
* **Frontend:** React, React Leaflet, Chart.js, jsPDF
* **Styling:** CSS Flexbox, React Icons
* **Map Tiles:** OpenStreetMap

---

## Security & Validation

* Validates all user inputs (coordinates, years) to prevent invalid data submission.
* Handles API errors gracefully.
* Caches and rate-limits external API calls for performance and safety.

---

## Future Enhancements

* Integrate autocomplete and search for location input.
* Support more climate hazard types (drought, heavy rainfall, etc.).
* User login and personalized data storage.
* Responsive UI and mobile support.

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or feedback, please contact: [harsh.bhumca21@gmail.com](mailto:your.email@example.com)

---

Thank you for exploring the Climate Hazard Trend Analyzer!