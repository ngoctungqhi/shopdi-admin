import { memo } from 'react'
import { Form, Input, Button, Col, Row, Checkbox, DatePicker } from 'antd'
import { useIdoEntryModal } from './useIdoEntryModal'

export const IdoEntryModal = memo(() => {
  const { handleCancel, handleSubmitForm, pendingTx } = useIdoEntryModal()

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            onFinish={handleSubmitForm}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item
              name="idoToken"
              label="IDO token"
              rules={[
                { required: true, message: 'Please input ido token address!' },
              ]}
            >
              <Input placeholder="IDO token address" />
            </Form.Item>
            <Form.Item
              name="idoToken2Buy"
              label="Swap token"
              rules={[
                {
                  required: true,
                  message: 'Please input your swap token address!',
                },
              ]}
            >
              <Input placeholder="Swap token address" />
            </Form.Item>
            <Form.Item
              name="tokenBuy2IDOtoken"
              label="Amount"
              rules={[
                { required: true, message: 'Please input token amount!' },
              ]}
            >
              <Input placeholder="Amount" />
            </Form.Item>
            <Form.Item
              name="totalAmount"
              label="Total amount"
              rules={[
                { required: true, message: 'Please input token total amount!' },
              ]}
            >
              <Input placeholder="Total amount" />
            </Form.Item>
            <Form.Item
              name="startTime"
              label="Start time"
              rules={[
                { required: true, message: 'Please input ido start time!' },
              ]}
            >
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                allowClear={false}
                format="YYYY-MM-DD HH:mm"
                placeholder="Select start time"
              />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="End time"
              rules={[
                { required: true, message: 'Please input ido end time!' },
              ]}
            >
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                allowClear={false}
                format="YYYY-MM-DD HH:mm"
                placeholder="Select end time"
              />
            </Form.Item>
            <Form.Item
              name="vestingPercent"
              label="Vesting percent"
              rules={[
                {
                  required: true,
                  message: 'Please input ido vesting percent!',
                },
              ]}
            >
              <Input placeholder="Enter vesting percent per round" />
            </Form.Item>
            <Form.Item
              name="level"
              label="Level"
              rules={[
                {
                  required: true,
                  message: 'Please input ido level!',
                },
              ]}
            >
              <Input placeholder="Enter min user level buy IDO" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: 'Please input ido status!',
                },
              ]}
            >
              <Input placeholder="0: Upcoming, 1: Inprogress, 4: Release" />
            </Form.Item>
            <Form.Item name="isWL" label="Whitelist" valuePropName="checked">
              <Checkbox />
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
