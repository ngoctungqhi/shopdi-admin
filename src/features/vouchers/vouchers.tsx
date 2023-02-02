import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Dropdown, Row, Statistic, Table } from 'antd'
import { memo } from 'react'
import { useVouchers } from './useVouchers'
export const Vouchers = memo(() => {
  const { vouchers, isLoading, totalRecord, handlePageChange } = useVouchers()

  const columns = [
    {
      key: 'name',
      title: 'Tên chiến dịch',
      dataIndex: 'name',
    },
    {
      key: 'createdDate',
      dataIndex: 'createdDate',
      title: 'Ngày phát hành',
    },
    {
      key: 'expireDate',
      dataIndex: 'expireDate',
      title: 'Ngày hiệu lực',
    },
    {
      key: 'amountExpect',
      title: 'Giá trị(Xu)',
      dataIndex: 'amountExpect',
    },
    {
      key: 'descriptions',
      title: 'Mô tả',
      dataIndex: 'descriptions',
    },
    {
      key: 'action',
      title: 'Hành động',
      render: (): any => {
        return (
          <Dropdown placement="bottomRight">
            <MoreOutlined />
          </Dropdown>
        )
      },
    },
  ]
  return (
    <div>
      <div className="pl-22">
        <Row gutter={[24, 24]}>
          <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
            <Card style={{ borderRadius: '10px' }}>
              <p style={{ fontSize: '20px', fontWeight: '600' }}>
                Chiến dịch Marketing
              </p>
              <div className="flex justify-between">
                <Button
                  style={{
                    height: '40px',
                    fontSize: '16px',
                    background: '#FDD116',
                    color: '#333',
                    fontWeight: 600,
                  }}
                >
                  <PlusOutlined />
                  Tạo chiến dịch
                </Button>
                <div className="flex">
                  <Button style={{ height: '40px', fontSize: '16px' }}>
                    Export Excel
                  </Button>
                  <Button
                    style={{
                      height: '40px',
                      fontSize: '16px',
                      background: '#000',
                      color: '#fff',
                      marginLeft: '20px',
                    }}
                  >
                    <PlusOutlined />
                    Tạo Voucher
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
            <Card style={{ borderRadius: '10px' }}>
              <Row gutter={[24, 24]}>
                <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
                  <Statistic title="Tổng voucher phát hành" value="100" />
                </Col>
                <Col span={24} lg={{ span: 12 }} md={{ span: 12 }}>
                  <Statistic title="Tổng voucher đã sử dụng" value="10" />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <Card className="rounded-[10px] mt-5">
        <p className="text-xl font-semibold">Danh sách voucher</p>
        <Table
          rowKey="id"
          dataSource={vouchers}
          columns={columns}
          loading={isLoading}
          pagination={{
            total: totalRecord,
            showSizeChanger: false,
            pageSize: 10,
            onChange: (page) => handlePageChange(page),
          }}
        />
      </Card>
    </div>
  )
})
