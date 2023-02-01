import { Col, Row, Tabs } from 'antd'
import { memo } from 'react'
import { SetStakeToken } from './components/setStakeToken/setStakeToken'
import { SetMinStake } from './components/setMinStake/setMinStake'
import { SetLockTime } from './components/setLockTime/setLockTime'
import { SetRequireStake } from './components/setRequireStake/setRequireStake'

export const StakeSettingDialog = memo(() => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Set stake token" key="1">
              <SetStakeToken />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Set min stake" key="2">
              <SetMinStake />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Set lock time" key="3">
              <SetLockTime />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Set require stake" key="4">
              <SetRequireStake />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
})
