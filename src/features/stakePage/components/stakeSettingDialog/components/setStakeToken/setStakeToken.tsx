import { memo } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import { useSetStakeToken } from './useSetStakeToken'

export const SetStakeToken = memo(() => {
  const { handleSubmitForm, handleCancel, pendingTx } = useSetStakeToken()

  return (
    <>
      <Row>
        <Col span={24}>
          <Form onFinish={handleSubmitForm} layout="vertical">
            <Form.Item
              name="stakeTokenAddress"
              label="Stake token address"
              rules={[
                {
                  required: true,
                  message: 'Please input stake token address!',
                },
              ]}
            >
              <Input placeholder="Stake token address" />
            </Form.Item>
            <div className="flex gap-x-2 justify-end">
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={pendingTx}>
                Add
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
})
