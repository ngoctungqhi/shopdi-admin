import { memo } from 'react'
import { Button, Dropdown, MenuProps } from 'antd'
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useAppHeader } from './useAppHeader'
import { Link } from 'react-router-dom'

export const AppHeader = memo(() => {
  const { handleLogout, loggedInUser } = useAppHeader()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link className="flex gap-x-2 items-center" to="admin/account-settings">
          <SettingOutlined />
          <span>Account settings</span>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex gap-x-2 items-center" onClick={handleLogout}>
          <LogoutOutlined />
          <span>Logout</span>
        </div>
      ),
    },
  ]

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-x-2">
        {loggedInUser && (
          <Dropdown menu={{ items }} placement="bottomLeft">
            <div className="flex items-center gap-x-2 cursor-pointer w-36">
              <span>Hi, {loggedInUser.username}</span> <DownOutlined />
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  )
})
