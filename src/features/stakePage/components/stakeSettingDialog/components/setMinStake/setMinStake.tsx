import { memo } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import { useSetMinStake } from './useSetMinStake'

export const SetMinStake = memo(() => {
  const { handleSubmitForm, handleCancel, pendingTx } = useSetMinStake()

  return (
    <>
      <Row>
        <Col span={24}>
          <Form onFinish={handleSubmitForm} layout="vertical">
            <Form.Item
              name="minStake"
              label="Min stake"
              rules={[
                {
                  required: true,
                  message: 'Please input min stake token!',
                },
              ]}
            >
              <Input placeholder="Enter min stake" />
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
