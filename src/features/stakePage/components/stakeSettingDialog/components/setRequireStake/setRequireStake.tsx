import { memo } from 'react'
import { Form, Input, Button, Col, Row, Divider } from 'antd'
import { useSetRequireStake } from './useSetRequireStake'

export const SetRequireStake = memo(() => {
  const { handleSubmitForm, handleCancel, pendingTx } = useSetRequireStake()

  const getFields = (count: number) => {
    const items = []

    for (let i = 0; i < count; i++) {
      items.push(
        <div>
          <Divider orientation="left" plain>
            {(() => {
              switch (i) {
                case 0:
                  return 'Bronze'
                case 1:
                  return 'Silver'
                case 2:
                  return 'Gold'
                case 3:
                  return 'Platinium'
                case 4:
                  return 'Titanium'
              }
            })()}
          </Divider>
          <Form.Item
            name={`requireStake-${i}`}
            rules={[
              {
                required: true,
                message: 'Please input rank require stake!',
              },
            ]}
          >
            <Input placeholder="Enter min stake" />
          </Form.Item>
        </div>
      )
    }

    return items
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            onFinish={handleSubmitForm}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <>{getFields(5)}</>
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
