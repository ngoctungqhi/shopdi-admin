import React, { FC, memo } from 'react'
import { AppHeader } from 'features/app/components/appHeader/appHeader'
import { WalletModal } from '../../../../components/walletModal/walletModal'
import { useAppLayoutRouteElement } from './useAppLayoutRouteElement'
import { Outlet } from 'react-router-dom'
import { Layout, Menu, Modal } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  DatabaseOutlined,
  TeamOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import logoPng from 'assets/logo.png'
const { Header, Sider, Content } = Layout

export const AppLayoutRouteElement: FC = memo(() => {
  const {
    isOpenSelectWalletModal,
    handleCancel,
    collapsed,
    setCollapsed,
    handleChaneMenu,
    selectedMenuItem,
  } = useAppLayoutRouteElement()

  return (
    <Layout className="!min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="py-2 text-center">
          <img src={logoPng} className="mx-auto max-w-full" alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={handleChaneMenu}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: 'Dashboard',
            },
            {
              key: '/ido',
              icon: <UnorderedListOutlined />,
              label: 'IDO',
            },
            {
              key: '/stake',
              icon: <DatabaseOutlined />,
              label: 'Stake',
            },
            {
              key: '/ekyc',
              icon: <TeamOutlined />,
              label: 'EKYC',
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

      <Modal
        title="Select wallet"
        open={isOpenSelectWalletModal}
        onCancel={handleCancel}
        footer={null}
      >
        <WalletModal />
      </Modal>
    </Layout>
  )
})