import { FC } from "react"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./purpleTheme"

type IProps = {
    children: JSX.Element
}

export const AppTheme:FC<IProps> = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}
