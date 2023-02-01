import { useAppDispatch } from 'states/hooks'
import { useCallback } from 'react'
import { useLoginMutation } from 'features/app/apis/appApis'
import { message } from 'antd'
import { setToken } from 'features/app/states/appSlice'
import { useNavigate } from 'react-router-dom'

type FormValues = {
  username: string
  password: string
}

export const useAppLoginPage = () => {
  const [loginMutation] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmitForm = useCallback(
    async (values: FormValues) => {
      try {
        const result = await loginMutation({ ...values }).unwrap()
        dispatch(setToken(result.token))
        navigate('/')
      } catch (error) {
        console.log(error)
        message.error('Login failed!')
      }
    },
    [dispatch, loginMutation, navigate]
  )

  return { handleSubmitForm }
}
