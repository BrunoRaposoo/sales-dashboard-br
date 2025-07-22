import { AvatarList, CardComponent, CustomChart, Header } from '@/components'
import CustomTable from '@/components/CustomTable'
import { currencyConverter } from '@/utils'
import { Container } from '@mui/material'

export default function Home() {
  const mockListData = [
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 1',
      subtitle: currencyConverter(1234.54),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 2',
      subtitle: currencyConverter(6587.25),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 3',
      subtitle: currencyConverter(9687.12),
    },
  ]

  const mockTableData = {
    headers: ['Name', 'Email', 'Actions'],
    rows: [
      [
        <span>John Doe</span>,
        <span>john@example.com</span>,
        <button>Delete</button>,
      ],
      [
        <span>Jane Smith</span>,
        <span>jane@example.com</span>,
        <button>Delete</button>,
      ],
      [
        <span>Sam Green</span>,
        <span>sam@example.com</span>,
        <button>Delete</button>,
      ],
    ],
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>Card</CardComponent>
        <CardComponent>
          <AvatarList listData={mockListData} />
        </CardComponent>
        <CardComponent>
          <CustomTable
            headers={mockTableData.headers}
            rows={mockTableData.rows}
          />
        </CardComponent>
        <CardComponent>
          <CustomChart
            labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai']}
            data={[1000.12, 2456.54, 986.32, 654.89, 798.55, 312,47]}
            type='line'
          />
        </CardComponent>
      </Container>
    </>
  )
}
