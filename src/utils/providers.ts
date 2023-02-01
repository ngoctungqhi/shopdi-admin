import { ethers } from 'ethers'
const RPC_URL = process.env.REACT_APP_NODE_1

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(
  RPC_URL
)
