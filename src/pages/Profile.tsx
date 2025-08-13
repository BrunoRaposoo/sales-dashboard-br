import { CardComponent, Header, StyledButton, StyledH2 } from '@/components'
import { AppThemeContext } from '@/contexts/AppThemeContext'
import { logout } from '@/services'
import { Container, Grid2 } from '@mui/material'
import { useContext } from 'react'

export default function Profile() {
  const themeContext = useContext(AppThemeContext)
  return (
    <>
      <Header />
      <Container>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <CardComponent>Seus dados...</CardComponent>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <CardComponent>
              <StyledH2 className='mb-1'>Definições de conta</StyledH2>
              <StyledButton
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema{' '}
                {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
              </StyledButton>
              <StyledButton className="alert" onClick={logout}>Logout</StyledButton>
            </CardComponent>
          </Grid2>
        </Grid2>
      </Container>
    </>
  )
}
