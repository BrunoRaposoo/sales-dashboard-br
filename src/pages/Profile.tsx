import {
  CardComponent,
  FormComponent,
  Header,
  StyledButton,
  StyledH2,
} from '@/components'
import { AppThemeContext } from '@/contexts/AppThemeContext'
import { useDelete, useGet, usePut, userFormValidation } from '@/hooks'
import { logout } from '@/services'
import {
  InputProps,
  MessageProps,
  ProfileData,
  ProfileEditableData,
} from '@/types'
import { Container, Grid2 } from '@mui/material'
import Cookies from 'js-cookie'
import { ChangeEvent, useContext, useEffect, useState } from 'react'

export default function Profile() {
  const themeContext = useContext(AppThemeContext)

  const [updateMessage, setUpdateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })

  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({
        type: 'success',
        msg: '',
      })
    }, 3000)
  }

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useGet<ProfileData>('profile')

  const {
    data: profileUpdateData,
    putData: profilePutData,
    loading: profileUpdateLoading,
    error: profileUpdateError,
  } = usePut<ProfileEditableData>('profile/update')

  const { deleteData: profileDeleteData, loading: profileDeleteLoading } =
    useDelete('profile/delete')

  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name)
      handleChange(1, profileData.email)
      handleChange(2, profileData.phone)
    }
  }, [profileData])

  const inputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', disabled: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const { formValues, formValid, handleChange } = userFormValidation(inputs)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await profilePutData({
      name: String(formValues[0]),
      phone: String(formValues[2]),
    })
  }

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir sua conta ? Se sim, certifique-se de deletar os seus leads')) {
      try {
        await profileDeleteData()
        alert('Perfil deletado com sucesso')
        Cookies.remove('Authorization')
        window.location.href = '/'
      } catch (e) {
        alert('Não foi possível deletar o perfil. Contate nosso suporte.')
      }
    }
  }

  useEffect(() => {
    if (profileUpdateData !== null) {
      setUpdateMessage({
        type: 'success',
        msg: 'Perfil Atualizado',
      })
    } else if (profileUpdateError) {
      setUpdateMessage({
        type: 'error',
        msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte',
      })
    }
    clearMessage()
  }, [profileUpdateData, profileUpdateError])

  return (
    <>
      <Header />
      <Container>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            {!profileError && (
              <CardComponent
                className={
                  profileLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
                }
              >
                {!profileLoading && profileData && (
                  <>
                    <StyledH2 className="mb-1">Seus dados</StyledH2>
                    <FormComponent
                      inputs={inputs.map((input, index) => ({
                        ...input,
                        type: input.type,
                        placeholder: input.placeholder,
                        value: formValues[index] || '',
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(
                            index,
                            (e.target as HTMLInputElement).value
                          ),
                      }))}
                      buttons={[
                        {
                          className: 'primary',
                          disabled: !formValid || profileUpdateLoading,
                          type: 'submit',
                          onClick: handleSubmit,
                          children: profileUpdateLoading ? 'Aguarde...' : 'Atualizar meu Perfil',
                        },
                        {
                          className: 'alert',
                          disabled: profileDeleteLoading,
                          type: 'submit',
                          onClick: handleDelete,
                          children: profileDeleteLoading ? 'Aguarde...' : 'Excluir miha conta',
                        },
                      ]}
                      message={updateMessage}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <CardComponent>
              <StyledH2 className="mb-1">Definições de conta</StyledH2>
              <StyledButton
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema{' '}
                {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
              </StyledButton>
              <StyledButton className="alert" onClick={logout}>
                Logout
              </StyledButton>
            </CardComponent>
          </Grid2>
        </Grid2>
      </Container>
    </>
  )
}
