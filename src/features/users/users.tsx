import { memo } from 'react'
import { useUsers } from './useUsers'
import defaultAvatar from 'assets/images/avatar.png'
import { Table } from 'antd'

export const Users = memo(() => {
  const { users, isLoading, getSex, totalRecord, handlePageChange } = useUsers()

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
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: 'Số điện thoại',
    },
    {
      key: 'gender',
      dataIndex: 'gender',
      title: 'Giới tính',
      render: (gender: number) => getSex(gender),
    },
    {
      key: 'birthDay',
      dataIndex: 'birthDay',
      title: 'Ngày sinh',
    },
    {
      key: 'point',
      dataIndex: 'point',
      title: 'Số xu',
    },
    {
      key: 'walletCode',
      dataIndex: 'walletCode',
      title: 'Ví',
    },
    {
      key: 'userId',
      title: 'Mã',
      dataIndex: 'userId',
    },
  ]
  return (
    <div>
      <h4 className="text-xl">Danh sách người dùng</h4>
      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          pagination={{
            total: totalRecord,
            showSizeChanger: false,
            pageSize: 10,
            onChange: (page) => handlePageChange(page),
          }}
        />
      </div>
    </div>
  )
})
