import { BIG_TEN } from 'utils/bigNumber'

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:3001/'

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)

export const LEVEL_LIST = [
  { value: 0, label: 'Starter' },
  { value: 1, label: 'Bronze' },
  { value: 2, label: 'Silver' },
  { value: 3, label: 'Gold' },
  { value: 4, label: 'Platinium' },
  { value: 5, label: 'Titanium' },
]

export const STATUSES = [
  { value: 0, label: 'Upcoming' },
  { value: 1, label: 'Inprogress' },
  { value: 2, label: 'Completed' },
  { value: 3, label: 'Refund' },
  { value: 4, label: 'Release' },
]

export const CERTIFICATE = [
  { value: 'incubate', label: 'Incubate' },
  { value: 'potential', label: 'Potential' },
  { value: 'experiment', label: 'Experiment' },
]

export const CURRENCY_LIST = [
  { value: '0x2fa52D0693dA32DaF8d24B52d20d12E4fe577f7D', label: 'BNB' },
  { value: '0x2fa52D0693dA32DaF8d24B52d20d12E4fe577f7E', label: 'BUSD' },
  { value: '0x2fa52D0693dA32DaF8d24B52d20d12E4fe577f7F', label: 'USDT' },
]

export const FEE_OPTIONS = [
  { value: 0, label: '0%' },
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
]

export const REFUND_OPTIONS = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' },
]
