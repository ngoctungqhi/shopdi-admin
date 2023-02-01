import { memo } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import { useIdoStatusForm } from './useIdoStatusForm'

type IdoStatusFormProps = {
  poolId: number
}

export const IdoStatusForm = memo((props: IdoStatusFormProps) => {
  const { handleCancel, handleSubmitForm, pendingTx } = useIdoStatusForm(
    props.poolId
  )
  return (
    <>
      <Row>
        <Col span={24}>
          <Form onFinish={handleSubmitForm} layout="vertical">
            <Form.Item
              name="status"
              label="Status"
              rules={[
                { required: true, message: 'Please input ido pool status!' },
              ]}
            >
              <Input placeholder="IDO pool status" />
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
