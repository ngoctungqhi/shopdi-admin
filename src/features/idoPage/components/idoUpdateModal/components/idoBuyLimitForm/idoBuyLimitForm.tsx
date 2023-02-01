import {
  Button,
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  Switch,
  Divider,
} from 'antd'
import { memo } from 'react'
import { useIdoBuyLimitForm } from './useIdoBuyLimitForm'

type IdoBuyLimitFormProps = {
  poolId: number
}

export const IdoBuyLimitForm = memo((props: IdoBuyLimitFormProps) => {
  const {
    handleCancel,
    handleSubmitForm,
    pendingTx,
    handleChangeSwitch,
    isBuyByRank,
  } = useIdoBuyLimitForm(props.poolId)

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
            name={`startTime-${i}`}
            label="Start time"
            rules={[
              {
                required: true,
                message: 'Please input ido start time!',
              },
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
            name={`endTime-${i}`}
            label="End time"
            rules={[{ required: true, message: 'Please input ido end time!' }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              allowClear={false}
              format="YYYY-MM-DD HH:mm"
              placeholder="Select end time"
            />
          </Form.Item>
          <Form.Item
            name={`minAmount-${i}`}
            label="Min amount"
            rules={[
              {
                required: true,
                message: 'Please input ido min amount!',
              },
            ]}
          >
            <Input placeholder="Enter min amount user can buy" />
          </Form.Item>
          <Form.Item
            name={`maxAmount-${i}`}
            label="Max amount"
            rules={[
              {
                required: true,
                message: 'Please input ido max amount!',
              },
            ]}
          >
            <Input placeholder="Enter max amount user can buy" />
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
          <div className="flex gap-x-2 mb-5">
            <span>Buy by rank</span>
            <Switch
              defaultChecked={isBuyByRank}
              onChange={handleChangeSwitch}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            onFinish={handleSubmitForm}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            {isBuyByRank ? <>{getFields(5)}</> : <>{getFields(1)}</>}
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
