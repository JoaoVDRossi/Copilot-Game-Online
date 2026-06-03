import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RoundSelection from './components/rounds/RoundSelection'
import VillainIntro from './components/rounds/VillainIntro'
import GameBoard from './components/game/GameBoard'
import AnswerKey from './components/game/AnswerKey'
import MyMatches from './components/player/MyMatches'
import AdminDashboard from './components/admin/AdminDashboard'
import GameMasterDashboard from './components/admin/GameMasterDashboard'
import DebugDashboard from './components/admin/DebugDashboard'
import TeamLogin from './components/auth/TeamLogin'
import AdminLogin from './components/auth/AdminLogin'
import GameMasterLogin from './components/auth/GameMasterLogin'
import DirectJoinRoom from './components/auth/DirectJoinRoom'
import ValidatorAccess from './components/auth/ValidatorAccess'
import ValidatorDashboard from './components/admin/ValidatorDashboard'
import { isAdmin, isGameMaster } from './utils/authManager'

// Protected Route Component for Team
function ProtectedTeamRoute({ children }: { children: React.ReactNode }) {
  const teamData = localStorage.getItem('current-team')
  
  if (!teamData) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

// Protected Route Component for Admin
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  if (!isAdmin()) {
    return <Navigate to="/admin/login" replace />
  }
  
  return <>{children}</>
}

// Protected Route Component for Game Master
function ProtectedGameMasterRoute({ children }: { children: React.ReactNode }) {
  if (!isGameMaster()) {
    return <Navigate to="/gamemaster" replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<TeamLogin />} />
        <Route path="/sala/:code" element={<DirectJoinRoom />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/gamemaster" element={<GameMasterLogin />} />
        
        {/* Protected Team Routes */}
        <Route
          path="/rounds"
          element={
            <ProtectedTeamRoute>
              <RoundSelection />
            </ProtectedTeamRoute>
          }
        />
        <Route
          path="/round/:roundId/intro"
          element={
            <ProtectedTeamRoute>
              <VillainIntro />
            </ProtectedTeamRoute>
          }
        />
        <Route
          path="/round/:roundId/play"
          element={
            <ProtectedTeamRoute>
              <GameBoard />
            </ProtectedTeamRoute>
          }
        />
        <Route
          path="/gabarito"
          element={
            <ProtectedTeamRoute>
              <AnswerKey />
            </ProtectedTeamRoute>
          }
        />
        <Route
          path="/my-matches"
          element={
            <ProtectedTeamRoute>
              <MyMatches />
            </ProtectedTeamRoute>
          }
        />
        
        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        
        {/* Debug Dashboard - Accessible to admins */}
        <Route
          path="/debug"
          element={
            <ProtectedAdminRoute>
              <DebugDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* Protected Game Master Route */}
        <Route
          path="/gamemaster/dashboard"
          element={
            <ProtectedGameMasterRoute>
              <GameMasterDashboard />
            </ProtectedGameMasterRoute>
          }
        />

        {/* Validator Routes */}
        <Route path="/validador/:token" element={<ValidatorAccess />} />
        <Route path="/validador-dashboard" element={<ValidatorDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
