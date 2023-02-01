import { memo } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import { useIdoCycleDayForm } from './useIdoCycleDayForm'

type IdoCycleDayFormProps = {
  poolId: number
}

export const IdoCycleDayForm = memo((props: IdoCycleDayFormProps) => {
  const { handleCancel, handleSubmitForm, pendingTx } = useIdoCycleDayForm(
    props.poolId
  )
  return (
    <>
      <Row>
        <Col span={24}>
          <Form onFinish={handleSubmitForm} layout="vertical">
            <Form.Item
              name="cycleDay"
              label="Cycle days"
              rules={[
                { required: true, message: 'Please input ido pool cycle day!' },
              ]}
            >
              <Input placeholder="IDO pool cycle" />
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
