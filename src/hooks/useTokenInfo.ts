import { useEffect, useState } from 'react'
import { getBep20Contract } from 'utils/contractHelpers'

export const useTokenInfo = (tokenAddress: string | undefined) => {
  const [name, setName] = useState(null)
  const [symbol, setSymbol] = useState(null)
  const [decimals, setDecimals] = useState(null)

  useEffect(() => {
    const getTokenInfo = async () => {
      try {
        const contract = getBep20Contract(tokenAddress)
        const [name, symbol, decimals] = await Promise.all([
          contract.name(),
          contract.symbol(),
          contract.decimals(),
        ])

        setName(name)
        setSymbol(symbol)
        setDecimals(decimals)
      } catch (err) {
        console.log(err)
      }
    }

    if (tokenAddress) {
      getTokenInfo()
    }
  }, [tokenAddress])

  return { name, symbol, decimals }
}
