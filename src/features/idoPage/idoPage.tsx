import { memo } from 'react'
import { useIdoPage } from './useIdoPage'
import { Table, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Ido } from './apis/models/getIdo/response'
import { formatWeiNumber } from 'utils/formatBalance'
import { useTokenInfo } from 'hooks/useTokenInfo'

export const RenderTokenName = (props) => {
  const { name, symbol } = useTokenInfo(props.tokenAddress)

  return (
    <span>
      {name} ({symbol})
    </span>
  )
}

export const IdoPage = memo(() => {
  const { idos, handleOpenCreate, handleOpenEditIdo } = useIdoPage()

  const columns: ColumnsType<Ido> = [
    {
      title: 'Token',
      dataIndex: 'tokenAddress',
      key: 'tokenAddress',
      render: (text) => <RenderTokenName tokenAddress={text} />,
    },
    {
      title: 'Presale rate',
      dataIndex: 'presaleRate',
      key: 'presaleRate',
      render: (value) => <span>{formatWeiNumber(value, 5)}</span>,
    },
    {
      title: 'Total sell',
      key: 'totalSell',
      dataIndex: 'totalSell',
      render: (value) => <span>{formatWeiNumber(value, 5)}</span>,
    },
    {
      title: 'Start time',
      key: 'startTime',
      dataIndex: 'startTime',
      render: (value) => <span>{format(value * 1000, 'Pp')} (UTC)</span>,
    },
    {
      title: 'End time',
      key: 'endTime',
      dataIndex: 'endTime',
      render: (value) => <span>{format(value * 1000, 'Pp')} (UTC)</span>,
    },
    {
      title: 'Level buy',
      key: 'levelBuy',
      dataIndex: 'levelBuy',
      render: (value) => (
        <>
          {(() => {
            switch (value) {
              case 0:
                return <span>Starter</span>
              case 1:
                return <span>Bronze</span>
              case 2:
                return <span>Silver</span>
              case 3:
                return <span>Gold</span>
              case 4:
                return <span>Platinium</span>
              case 5:
                return <span>Titanium</span>
            }
          })()}
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (value) => <span className="capitalize">{value}</span>,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleOpenEditIdo(record._id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span>IDO list</span>
        <Button type="primary" onClick={handleOpenCreate}>
          Add Ido
        </Button>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={idos}
        pagination={false}
      />
    </>
  )
})
