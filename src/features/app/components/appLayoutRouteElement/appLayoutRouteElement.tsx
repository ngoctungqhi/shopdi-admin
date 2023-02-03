import React, { FC, memo } from 'react'
import { AppHeader } from 'features/app/components/appHeader/appHeader'
import { useAppLayoutRouteElement } from './useAppLayoutRouteElement'
import { Outlet } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  ShopOutlined,
  GoldOutlined,
  TagOutlined,
  TagsOutlined,
  WalletOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import logoPng from 'assets/logo.svg'
const { Header, Sider, Content } = Layout

export const AppLayoutRouteElement: FC = memo(() => {
  const { collapsed, setCollapsed, handleChaneMenu, selectedMenuItem } =
    useAppLayoutRouteElement()

  return (
    <Layout className="!min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="py-2 text-center mb-5 overflow-hidden">
          <img src={logoPng} className="mx-auto max-w-full" alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={handleChaneMenu}
          items={[
            {
              key: '/admin/users',
              icon: <TeamOutlined />,
              label: 'Người dùng',
            },
            {
              key: '/admin/products',
              icon: <ShopOutlined />,
              label: 'Sản phẩm',
            },
            {
              key: '/admin/orders',
              icon: <GoldOutlined />,
              label: 'Đơn đặt hàng',
            },
            {
              key: '/admin/vouchers',
              icon: <TagOutlined />,
              label: 'Vouchers',
            },
            {
              key: '/admin/voucher-blockchain',
              icon: <TagsOutlined />,
              label: 'Voucher Blockchain',
            },
            {
              key: '/admin/main-wallet',
              icon: <WalletOutlined />,
              label: 'Ví tổng',
            },
            {
              key: '/admin/operation-wallet',
              icon: <WalletOutlined />,
              label: 'Ví con',
            },
            {
              key: '/admin/settings',
              icon: <SettingOutlined />,
              label: 'Cài đặt',
              children: [
                {
                  key: '/admin/settings/banner',
                  label: 'Banner quảng cáo',
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="!px-4 !bg-white flex items-center justify-between">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <AppHeader />
        </Header>
        <Content className="!bg-white !mx-4 !my-6 !p-6">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
})
