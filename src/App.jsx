import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SSIArenaRedesigned from './SSIArenaRedesigned.jsx'
import CommunityBenefits from './CommunityBenefits.jsx'
import Petition from './Petition.jsx'
import Privacy from './Privacy.jsx'
import FAQ from './FAQ.jsx'
import MoreThanHockey from './MoreThanHockey.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SSIArenaRedesigned />} />
        <Route path="/community-benefits" element={<CommunityBenefits />} />
        <Route path="/petition" element={<Petition />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/more-than-hockey" element={<MoreThanHockey />} />
      </Routes>
    </Router>
  )
}

export default App