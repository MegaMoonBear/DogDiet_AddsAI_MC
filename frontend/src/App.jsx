// File location: frontend/src/App.jsx - Main React component for WhiskerWorthy app
// This component serves as the landing page and main interface

// React hooks import - useState manages component state
import { useState } from 'react'

// Asset imports - images from src/assets/ folder
import doggyLogo from './assets/doggy.jpeg'  // WhiskerWorthy dog logo

// CSS import - component-specific styling from src/App.css
import './App.css'

// Main App component - exported for use in main.jsx (entry point)
function App() {
  // State management for form data - useState hook creates reactive state variables
  const [formData, setFormData] = useState({
    breed_name_AKC: '',
    age_years_preReg: '',
    status_dietRelat_preReg: []  // Array to hold multiple checkbox selections
  })

  // Handle text and number input changes - updates formData state
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle checkbox changes - manages multiple selections for health status
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    setFormData(prev => ({
      ...prev,
      status_dietRelat_preReg: checked 
        ? [...prev.status_dietRelat_preReg, value]  // Add if checked
        : prev.status_dietRelat_preReg.filter(item => item !== value)  // Remove if unchecked
    }))
  }

  // Form submission handler - sends data to backend API endpoint
  const handleSubmit = async (e) => {
    e.preventDefault()  // Prevent default form submission behavior
    
    try {
      // POST request to FastAPI backend at /api/submit-dog-info endpoint (backend/main.py)
      const response = await fetch('/api/submit-dog-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)  // Convert form data to JSON
      })
      
      const result = await response.json()
      
      if (response.ok) {
        alert(`Success! ${result.message}`)
        // Reset form after successful submission
        setFormData({ breed_name_AKC: '', age_years_preReg: '', status_dietRelat_preReg: [] })
      } else {
        alert(`Error: ${result.detail}`)
      }
    } catch (error) {
      alert('Failed to submit form. Please check your connection.')
      console.error('Submission error:', error)
    }
  }

  return (
    <>
      {/* Header section with logo and branding */}
      <header>
        <img src={doggyLogo} alt="WhiskerWorthy logo" className="header-logo" />
        <h1>WhiskerWorthy</h1>
        <p className="intro-text">
          WhiskerWorthy helps you consider factors to choose foods for your dog and discuss with your veterinarian. 
          Answer 3 quick questions to prepare nutritional questions for your next vet visit and join a community of 
          dog owners who care about proper feeding. In a few years, the information you share will help us collaborate 
          with researchers. We may also use emerging tech to provide smarter sets of food recommendations for most dogs.
        </p>
      </header>

      {/* Main questionnaire form - submits to backend API */}
      <form id="dogQuestionnaireForm" onSubmit={handleSubmit}>
        
        {/* Breed Name Field - maps to breed_name_AKC in database table questions_dog_initial3 */}
        <label htmlFor="breed_name">Breed Name:</label>
        <input 
          type="text" 
          id="breed_name" 
          name="breed_name_AKC" 
          value={formData.breed_name_AKC}
          onChange={handleInputChange}
          required 
          placeholder="Choose the AKC breed name or the catch-all group at the bottom"
        />
        <div className="helper-text">Enter the official American Kennel Club breed name</div>

        {/* Dog's Age Field - maps to age_years_preReg in database */}
        <label htmlFor="age_years">Dog's Age (in years):</label>
        <input 
          type="number" 
          id="age_years" 
          name="age_years_preReg" 
          value={formData.age_years_preReg}
          onChange={handleInputChange}
          step="0.1" 
          min="0" 
          max="30" 
          required 
          placeholder="e.g., 3.5 for 3 and a half years"
        />
        <div className="helper-text">You can enter 1 decimal (e.g., 3.5 for 3½ years old)</div>

        {/* Diet-Related Health Status - maps to status_dietRelat_preReg (array) in database */}
        <fieldset>
          <legend>Diet-Related Health Status:</legend>
          <div className="helper-text" style={{marginTop: 0}}>Mark all that apply. If none apply, mark "None".</div>
          
          <div className="checkbox-group">
            {/* Each checkbox value matches database expected values */}
            {[
              { id: 'status_none', value: 'none', label: 'None - No special dietary needs or health issues' },
              { id: 'status_puppy', value: 'puppy', label: 'Puppy - Growing dog (usually under 1 year)' },
              { id: 'status_elderly', value: 'elderly', label: 'Elderly/Senior - Older dog with age-related needs' },
              { id: 'status_pregnant', value: 'pregnant', label: 'Pregnant - Expecting mother dog' },
              { id: 'status_allergy', value: 'allergy', label: 'Allergy - Food or environmental allergies' },
              { id: 'status_other', value: 'other_health', label: 'Other Health Issues - Other medical conditions' }
            ].map(option => (
              <div className="checkbox-item" key={option.id}>
                <input 
                  type="checkbox" 
                  id={option.id} 
                  value={option.value}
                  checked={formData.status_dietRelat_preReg.includes(option.value)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Submit Button - triggers form submission to backend via handleSubmit */}
        <button type="submit">Submit Dog Information</button>
      </form>
    </>
  )
}

// Export component for import in main.jsx
export default App

