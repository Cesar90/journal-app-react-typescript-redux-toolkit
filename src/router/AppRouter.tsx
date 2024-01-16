import { Navigate, Route, Routes } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { useAppDispatch, useAppSelector } from "../store"
import { CheckingAuth } from "../ui"
import { useEffect } from "react"
import { login, logout } from "../store/auth"

export const AppRouter = () => {

  const { status } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      console.log(user)
      if (!user) return dispatch(logout({}))
      const { uid, email, displayName, photoURL } = user
      const userInfo = {
        uid,
        email: email?.toString(),
        displayName: displayName?.toString(),
        photoURL: photoURL?.toString()
      }
      dispatch(login(userInfo))
    })
  }, [])

  if (status == "checking") {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        (status === "authenticated")
          ? <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
