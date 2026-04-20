import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import PracticePage from './pages/PracticePage'
import ChallengePage from './pages/ChallengePage'

function Header() {
  const navigate = useNavigate()
  return (
    <header className="app-header">
      <span className="app-header-logo" onClick={() => navigate('/')}>AlgoViz</span>
      <span className="app-header-sub">アルゴリズム可視化学習ツール</span>
    </header>
  )
}

function Footer() {
  return (
    <footer className="app-footer">
      <a
        href="https://forms.gle/ZBYFApBTJyE5HkLx6"
        target="_blank"
        rel="noopener noreferrer"
        className="app-footer-link"
      >
        💬 フィードバックを送る
      </a>
    </footer>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn/:algorithmId" element={<LearnPage />} />
          <Route path="/practice/:algorithmId" element={<PracticePage />} />
          <Route path="/challenge/:algorithmId" element={<ChallengePage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
