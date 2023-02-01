import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useLazyGetIdosQuery } from './apis/idoApis'

export const useIdoPage = () => {
  const navigate = useNavigate()

  const [lazyGetIdosQuery] = useLazyGetIdosQuery()

  const [idos, setIdos] = useState([])

  useEffect(() => {
    const init = async () => {
      const idos = await lazyGetIdosQuery({}).unwrap()
      setIdos(idos.data)
    }

    init()
  }, [lazyGetIdosQuery])

  const handleOpenCreate = useCallback(() => {
    navigate('/ido/add')
  }, [navigate])

  const handleOpenEditIdo = useCallback(
    (idoId) => {
      navigate(`/ido/edit/${idoId}`)
    },
    [navigate]
  )

  return {
    idos,
    handleOpenCreate,
    handleOpenEditIdo,
  }
}
