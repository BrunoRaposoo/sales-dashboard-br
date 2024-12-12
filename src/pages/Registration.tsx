import styled from 'styled-components'

const RegistrationArea = styled.div`
  background: #666;
`

const RegistrationImage = styled.div`
  background-image: url('/login-img.svg');
  background-size: cover;
  height: 100vh;
  width: 50vw;
`

export default function Registration() {
  return (
    <>
      <RegistrationArea>CADASTRO</RegistrationArea>
      <RegistrationImage />
    </>
  )
}
