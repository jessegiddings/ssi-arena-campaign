import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SSIArenaRedesigned from './SSIArenaRedesigned.jsx'
import CommunityBenefits from './CommunityBenefits.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SSIArenaRedesigned />} />
        <Route path="/community-benefits" element={<CommunityBenefits />} />
      </Routes>
    </Router>
  )
}

export default App