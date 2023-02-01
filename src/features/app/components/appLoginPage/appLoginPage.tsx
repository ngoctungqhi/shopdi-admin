import { memo } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppLoginPage } from './useAppLoginPage'

export const AppLoginPage = memo(() => {
  const { handleSubmitForm } = useAppLoginPage()

  return (
    <>
      <div className="relative w-screen h-screen">
        <div
          className="absolute top-1/2 left-1/2 w-1/4 bg-blue-300 p-8 rounded-md"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <Row>
            <Col span={24}>
              <Form onFinish={handleSubmitForm}>
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
                >
                  <Input
                    prefix={
                      <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input
                    prefix={
                      <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
})
