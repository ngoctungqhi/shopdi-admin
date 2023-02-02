import moment from 'moment'
import { useEffect, useState } from 'react'
import { useLazyGetOrdersQuery } from './apis/orderApis'

export const useOrders = () => {
  const [lazyGetOrdersQuery, { isLoading }] = useLazyGetOrdersQuery()
  const [orders, setOrders] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getOrders = async () => {
      const response = await lazyGetOrdersQuery({
        pageIndex: page,
        pageSize: 10,
      }).unwrap()
      setOrders(response.data)
      setTotalRecord(response.totalRecord)
    }

    getOrders()
  }, [lazyGetOrdersQuery, page])

  const handlePageChange = (page) => {
    setPage(page)
  }

  const getDepositExpired = (depositExpired: number) => {
    if (depositExpired) {
      return moment(depositExpired).format('DD/MM/YYYY HH:mm:ss')
    }

    return ''
  }

  return { orders, isLoading, totalRecord, handlePageChange, getDepositExpired }
}
