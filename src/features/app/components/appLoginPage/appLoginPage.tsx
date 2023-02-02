import { memo } from 'react'
import { Form, Input, Button, Col, Row, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppLoginPage } from './useAppLoginPage'
import logoSvg from 'assets/logo.svg'
import lineSvg from 'assets/line.svg'

export const AppLoginPage = memo(() => {
  const { handleSubmitForm, isLoading } = useAppLoginPage()

  return (
    <>
      <div className="relative w-screen h-screen">
        <Row gutter={[0, 0]} className="h-full">
          <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
            <div className="bg-[#374756] h-full flex flex-col items-center justify-center">
              <div className="Login-text flex flex-col items-center justify-center">
                <img src={logoSvg} className="w-[200px] h-auto" alt="" />
                <h2 className="font-semibold text-2xl mb-2 text-white mt-[10px]">
                  SHOPDI ECOMMERCE ADMIN
                </h2>
                <p className="text-lg text-white">
                  Sàn thương mại điện tử thế hệ mới
                </p>
              </div>
              <div className="absolute bottom-0 left-0">
                <img src={lineSvg} alt="" />
              </div>
            </div>
          </Col>
          <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
            <div className="pt-[250px] flex flex-col justify-center items-center">
              <div>
                <h1 className="mb-0 text-3xl font-semibold">Đăng nhập</h1>
                <h5 className="text-[rgba(0,0,0,0.45)] text-sm">
                  Shopdi chào mừng bạn đã quay lại!
                </h5>
                <Form onFinish={handleSubmitForm} className="mt-10 max-w-sm">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      prefix={<UserOutlined />}
                      className="h-10"
                      placeholder="Tên đăng nhập"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu' },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined />}
                      className="h-10"
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                    <span className="text-[#1890ff] float-right cursor-pointer">
                      Quên mật khẩu?
                    </span>
                    <Button
                      className="w-full mt-10 bg-black text-base text-white h-10 hover:bg-[#fdc500] hover:border-none hover:outline-none"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
})
