import { memo } from 'react'
import { Form, Button, Col, Row, DatePicker } from 'antd'
import { useIdoFirstDateClaimForm } from './useIdoFirstDateClaimForm'

type IdoFirstDateClaimFormProps = {
  poolId: number
}

export const IdoFirstDateClaimForm = memo(
  (props: IdoFirstDateClaimFormProps) => {
    const { handleCancel, handleSubmitForm, pendingTx } =
      useIdoFirstDateClaimForm(props.poolId)
    return (
      <>
        <Row>
          <Col span={24}>
            <Form onFinish={handleSubmitForm} layout="vertical">
              <Form.Item
                name="claimDate"
                label="First claim date"
                rules={[
                  {
                    required: true,
                    message: 'Please input ido pool first claim date!',
                  },
                ]}
              >
                <DatePicker
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select first claim date"
                />
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
  }
)
