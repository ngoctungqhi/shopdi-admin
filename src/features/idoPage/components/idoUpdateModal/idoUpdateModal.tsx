import { memo } from 'react'
import { Col, Row, Tabs } from 'antd'
import { IdoStatusForm } from './components/idoStatusForm/idoStatusForm'
import { IdoCycleDayForm } from './components/idoCycleDayForm/idoCycleDayForm'
import { IdoFirstDateClaimForm } from './components/idoFirstDateClaimForm/idoFirstDateClaimForm'
import { IdoBuyLimitForm } from './components/idoBuyLimitForm/idoBuyLimitForm'

type IdoUpdateModalProps = {
  poolId: number
}

export const IdoUpdateModal = memo((props: IdoUpdateModalProps) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Set buy limit" key="1">
              <IdoBuyLimitForm poolId={props.poolId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Set IDO status" key="2">
              <IdoStatusForm poolId={props.poolId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Set cycle day" key="3">
              <IdoCycleDayForm poolId={props.poolId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Set first date claim" key="4">
              <IdoFirstDateClaimForm poolId={props.poolId} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  )
})
