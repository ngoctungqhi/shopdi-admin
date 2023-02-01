import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'

// ABI
import bep20Abi from 'configs/abi/erc20Abi.json'

const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(bep20Abi, address, signer)
}
