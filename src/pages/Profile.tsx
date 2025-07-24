import { CardComponent, Header, StyledButton } from "@/components"
import { AppThemeContext } from "@/contexts/AppThemeContext"
import { useContext } from "react"

export default function Profile() {
  const themeContext = useContext(AppThemeContext)
  return (
    <>
      <Header />
      <CardComponent>
        <StyledButton className="primary" onClick={themeContext?.toggleTheme}>
          Trocar para tema {themeContext?.appTheme === "light" ? "escuro" : "claro"}
        </StyledButton>
      </CardComponent>
    </>
  )
}
