import { CardComponent, Header } from '@/components'
import { Container } from '@mui/material'

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent className='warning'>Card</CardComponent>
      </Container>
    </>
  )
}
