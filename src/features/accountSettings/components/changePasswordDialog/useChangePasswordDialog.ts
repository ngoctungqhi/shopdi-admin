import { message } from 'antd'
import { useCallback, useState } from 'react'
import { useUpdatePasswordMutation } from 'features/accountSettings/apis/accountSettingApis'
import { ChangePasswordDialogProps } from './changePasswordDialog'

type FormValues = {
  oldPassword: string
  newPassword: string
}
export const useChangePasswordDialog = (props: ChangePasswordDialogProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const [updatePasswordMutation] = useUpdatePasswordMutation()

  const handleSubmitForm = useCallback(
    async (values: FormValues) => {
      try {
        setIsLoading(true)
        await updatePasswordMutation({ ...values }).unwrap()
        setIsLoading(false)
        message.success('Change password successfully!')
        props.onClose()
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        message.error('Change password failed!')
      }
    },
    [props, updatePasswordMutation]
  )
  return { handleSubmitForm, isLoading }
}
