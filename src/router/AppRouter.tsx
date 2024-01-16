import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { useAppSelector } from "../store"
import { CheckingAuth } from "../ui"

export const AppRouter = () => {

  const { status } = useAppSelector(state => state.auth);

  if (status == "checking") {
    return <CheckingAuth />
  }

  return (
    <Routes>
      <Route path="/*" element={<JournalRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  )
}
