import React from "react"
import { Routes, Route } from "react-router-dom"
import "shared/helpers/load-icons"
import { Header } from "staff-app/components/header/header.component"
import { HomeBoardPage } from "staff-app/daily-care/home-board.page"
import { ActivityPage } from "staff-app/platform/activity.page"
import { StaffAppContextProvider } from "./store/StaffAppContext"

function App() {
  return (
    <>
      <StaffAppContextProvider>
        <Header />
        <Routes>
          <Route path="daily-care" element={<HomeBoardPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="*" element={<div>No Match</div>} />
        </Routes>
      </StaffAppContextProvider>
    </>
  )
}

export default App
