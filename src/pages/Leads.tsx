import {
  CardComponent,
  FormComponent,
  Header,
  StyledButton,
  StyledH2,
  StyledP,
  StyledSpan,
} from '@/components'
import CustomTable from '@/components/CustomTable'
import { useDelete, useGet, usePost, userFormValidation } from '@/hooks'
import { InputProps, LeadsData, LeadsPostData, MessageProps } from '@/types'
import { Container, Grid2 } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

export default function Leads() {
  const inputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]
  const { formValues, formValid, handleChange } = userFormValidation(inputs)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createLeadsPostData({
      name: String(formValues[0]),
      email: String(formValues[1]),
      phone: String(formValues[2]),
    })
  }

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir seu lead?')) {
      try {
        await leadsDeleteData({ params: { id: id } })
        alert('Leads deletados com sucesso!')
        getLeads()
      } catch (e) {
        alert(
          'Não foi possível realizar a operação. Entre em contato com nosso suporte'
        )
      }
    }
  }

  const {
    data: createLeadsData,
    loading: createLeadsLoading,
    error: createLeadsError,
    postData: createLeadsPostData,
  } = usePost<LeadsData, LeadsPostData>('leads/create', true)

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
    getData: getLeads,
  } = useGet<LeadsData[]>('leads')

  const { deleteData: leadsDeleteData, loading: leadsDeleteLoading } =
    useDelete('leads/delete')

  const [createMessage, setCreateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })

  const clearMessage = () => {
    setTimeout(() => {
      setCreateMessage({
        type: 'success',
        msg: '',
      })
    }, 3000)
  }

  useEffect(() => {
    if (createLeadsData?.id) {
      setCreateMessage({
        type: 'success',
        msg: 'Lead criado com sucesso',
      })
      getLeads()
      clearMessage()
    } else if (createLeadsError) {
      setCreateMessage({
        type: 'error',
        msg: 'Não foi possível criar o lead',
      })
    }
    clearMessage()
  }, [createLeadsData, createLeadsError])

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 7 }}>
            <CardComponent
              className={
                leadsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
              }
            >
              {!leadsError && !leadsLoading && (
                <>
                  <StyledH2 className="mb-1" id="leads-title">
                    Meus Leads
                  </StyledH2>
                  {leadsData?.length ? (
                    <CustomTable
                      headers={['Nome', 'Email', 'Telefone', '']}
                      rows={leadsData.map((lead) => [
                        <StyledP>{lead.name}</StyledP>,
                        <StyledP>{lead.email}</StyledP>,
                        <StyledP>{lead.phone}</StyledP>,
                        <StyledButton
                          className="borderless-alert"
                          onClick={() => handleDelete(lead.id)}
                          disabled={leadsDeleteLoading}
                        >
                          Excluir
                        </StyledButton>,
                      ])}
                    />
                  ) : (
                    <StyledSpan>Sem leads cadastrados</StyledSpan>
                  )}
                </>
              )}
            </CardComponent>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 5 }}>
            <CardComponent>
              <StyledH2 className="mb-1">Cadastrar Leads</StyledH2>
              <FormComponent
                inputs={inputs.map((input, index) => ({
                  ...input,
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index] || '',
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, (e.target as HTMLInputElement).value),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled:
                      !formValid || createLeadsLoading || leadsDeleteLoading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: 'Cadastrar Leads',
                  },
                ]}
                message={createMessage}
              />
            </CardComponent>
          </Grid2>
        </Grid2>
      </Container>
    </>
  )
}
