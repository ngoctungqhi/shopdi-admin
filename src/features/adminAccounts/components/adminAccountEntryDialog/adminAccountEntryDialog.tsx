import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import { memo } from 'react'

export type AdminAccountEntryDialogProps = {
  onClose: () => void
}

export const AdminAccountEntryDialog = memo(
  (props: AdminAccountEntryDialogProps) => {
    return (
      <Row>
        <Col span={24}>
          <Form className="mt-5" layout="vertical" onFinish={() => {}}>
            <Form.Item
              name="username"
              label="Tên tài khoản"
              requiredMark={true}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên tài khoản',
                },
              ]}
              hasFeedback
            >
              <Input className="h-10" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              requiredMark={true}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                className="h-10"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              requiredMark={true}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email',
                },
              ]}
              hasFeedback
            >
              <Input className="h-10" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              requiredMark={true}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại',
                },
              ]}
              hasFeedback
            >
              <Input className="h-10" />
            </Form.Item>
            <Form.Item name="role" label="Quyền" hasFeedback>
              <Select
                defaultValue="admin"
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'marketing', label: 'Marketing' },
                  { value: 'sale', label: 'Sale' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button className="w-full mt-5" type="primary" htmlType="submit">
                Thêm tài khoản
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    )
  }
)
