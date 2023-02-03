import { Button, Modal } from 'antd'
import { memo } from 'react'
import { ChangePasswordDialog } from './components/changePasswordDialog/changePasswordDialog'
import { useAccountSettings } from './useAccountSettings'
export const AccountSettings = memo(() => {
  const {
    isShowChangePasswordDialog,
    handleCloseChangePasswordDialog,
    handleOpenChangePasswordDialog,
  } = useAccountSettings()
  return (
    <div>
      <h4 className="text-xl">Cài đặt tài khoản</h4>

      <div>
        <Button type="primary" onClick={handleOpenChangePasswordDialog}>
          Đổi mật khẩu
        </Button>
      </div>

      <Modal
        title="Đổi mật khẩu"
        open={isShowChangePasswordDialog}
        onCancel={handleCloseChangePasswordDialog}
        footer={null}
      >
        <ChangePasswordDialog onClose={handleCloseChangePasswordDialog} />
      </Modal>
    </div>
  )
})
