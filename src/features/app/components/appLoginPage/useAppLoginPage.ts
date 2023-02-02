import { useAppDispatch } from 'states/hooks'
import { useCallback, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmitForm = useCallback(
    async (values: FormValues) => {
      try {
        setIsLoading(true)
        const result = await loginMutation({ ...values }).unwrap()
        setIsLoading(false)
        dispatch(setToken(result.data.token))
        navigate('/admin/users')
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        message.error('Login failed!')
      }
    },
    [dispatch, loginMutation, navigate]
  )

  return { handleSubmitForm, isLoading }
}
