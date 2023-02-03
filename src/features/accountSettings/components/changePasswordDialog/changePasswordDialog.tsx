import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Col, Form, Input, Row } from 'antd'
import { memo, useState } from 'react'
import { useChangePasswordDialog } from './useChangePasswordDialog'

export type ChangePasswordDialogProps = {
  onClose: () => void
}

export const ChangePasswordDialog = memo((props: ChangePasswordDialogProps) => {
  const { handleSubmitForm, isLoading } = useChangePasswordDialog(props)
  return (
    <div>
      <Row>
        <Col span={24}>
          <Form className="mt-5" layout="vertical" onFinish={handleSubmitForm}>
            <Form.Item
              name="oldPassword"
              label="Mật khẩu cũ"
              requiredMark={true}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu cũ',
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
              name="newPassword"
              label="Mật khẩu mới"
              requiredMark={true}
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              ]}
            >
              <Input.Password
                className="h-10"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full mt-5"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
})
