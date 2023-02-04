import { useEffect, useState } from 'react'
import { useLazyGetUsersQuery } from './apis/userApis'

export const useUsers = () => {
  const [lazyGetUsersQuery, { isLoading }] = useLazyGetUsersQuery()
  const [users, setUsers] = useState([])
  const [totalRecord, setTotalRecord] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getUsers = async () => {
      const response = await lazyGetUsersQuery({}).unwrap()
      setUsers(response.data)
      setTotalRecord(response.totalRecord)
    }

    getUsers()
  }, [lazyGetUsersQuery, page])

  const getSex = (gender: number) => {
    if (gender === 2) {
      return 'Nữ'
    }

    if (gender === 1) {
      return 'Nam'
    }

    return 'Khác'
  }

  const handlePageChange = (page) => {
    setPage(page)
  }

  return { users, isLoading, getSex, totalRecord, handlePageChange }
}
