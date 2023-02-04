import { memo } from 'react'
import defaultAvatar from 'assets/images/avatar.png'
import { Button, Modal, Table } from 'antd'
import { useAdminAccounts } from './useAdminAccounts'
import { AdminAccountEntryDialog } from './components/adminAccountEntryDialog/adminAccountEntryDialog'

export const AdminAccounts = memo(() => {
  const {
    accounts,
    isShowAdminAccountDialog,
    handleOpenAdminAccountEntryDialog,
    handleCloseAdminAccountEntryDialog,
  } = useAdminAccounts()
  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: 'Hình ảnh',
      render: (avatar: string) => {
        return (
          <img
            src={avatar || defaultAvatar}
            className="w-[40px] h-[40px] rounded-full"
            alt=""
          />
        )
      },
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Họ tên',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Vai trò',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: 'Số điện thoại',
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-xl">Danh sách tài khoản quản trị</h4>
        <Button type="primary" onClick={handleOpenAdminAccountEntryDialog}>
          Thêm tài khoản
        </Button>
      </div>
      <div className="mt-5">
        <Table columns={columns} dataSource={accounts} />
      </div>

      <Modal
        title="Tạo tài khoản quản trị"
        open={isShowAdminAccountDialog}
        onCancel={handleCloseAdminAccountEntryDialog}
        footer={null}
      >
        <AdminAccountEntryDialog onClose={handleCloseAdminAccountEntryDialog} />
      </Modal>
    </div>
  )
})
