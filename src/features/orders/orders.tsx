import { memo } from 'react'
import { useOrders } from './useOrders'
import { Table } from 'antd'

export const Orders = memo(() => {
  const {
    orders,
    isLoading,
    totalRecord,
    handlePageChange,
    getDepositExpired,
  } = useOrders()

  const columns = [
    {
      key: 'sku',
      dataIndex: 'sku',
      title: 'SKU',
    },
    {
      key: 'productName',
      dataIndex: 'productName',
      title: 'Tên sản phẩm',
    },
    {
      key: 'startingPrice',
      dataIndex: 'startingPrice',
      title: 'Giá mở bán',
    },
    {
      key: 'soldPrice',
      dataIndex: 'soldPrice',
      title: 'Giá chốt phiên',
    },
    {
      key: 'depositPrice',
      dataIndex: 'depositPrice',
      title: 'Số tiền cọc',
      render: (depositPrice: number) => getDepositExpired(depositPrice),
    },
    {
      key: 'depositExpired',
      dataIndex: 'depositExpired',
      title: 'Hết hạn',
    },
    {
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      title: 'Số điện thoại',
    },
  ]
  return (
    <div>
      <h4 className="text-xl">Danh sách người dùng</h4>
      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={orders}
          loading={isLoading}
          pagination={{
            total: totalRecord,
            showSizeChanger: false,
            pageSize: 10,
            onChange: (page) => handlePageChange(page),
          }}
        />
      </div>
    </div>
  )
})
