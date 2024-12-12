import styled from 'styled-components'

const LoginArea = styled.div`
  background: #666;
`

const LoginImage = styled.div`
  background-image: url('/login-img.svg');
  background-size: cover;
  height: 100vh;
  width: 50vw;
`

export default function Login() {
  return (
    <>
      <LoginArea>LOGIN</LoginArea>
      <LoginImage />
    </>
  )
}
