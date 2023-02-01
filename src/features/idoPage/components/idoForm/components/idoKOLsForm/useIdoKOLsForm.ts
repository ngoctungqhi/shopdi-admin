import { Form, message } from 'antd'
import BigNumber from 'bignumber.js'
import {
  useLazyGetIdoQuery,
  useUpdateIdoMutation,
} from 'features/idoPage/apis/idoApis'
import { UpdateIdoRequest } from 'features/idoPage/apis/models/updateIdo/request'
import { useEffect, useState } from 'react'
import { convertWeiToNumber, getDecimalAmount } from 'utils/formatBalance'
import { IdoKOLsFormProps } from './idoKOLsForm'

type FormValueType = {
  name: string | number
  value: string | number | boolean
}

export const useIdoKOLsForm = (props: IdoKOLsFormProps) => {
  const [whitelist, setWhitelist] = useState([])
  const [address, setAddress] = useState('')
  const [maxBuy, setMaxBuy] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [formValuesInit, setFormValuesInit] = useState<FormValueType[]>()
  const [form] = Form.useForm()

  const [updateIdoMutation] = useUpdateIdoMutation()
  const [lazyGetIdoQuery] = useLazyGetIdoQuery()

  useEffect(() => {
    const initialData = async (id: string) => {
      const result = await lazyGetIdoQuery({ id }).unwrap()
      if (result.ido.kols) {
        const initFormValues = [
          {
            name: 'totalSell',
            value: convertWeiToNumber(result.ido.kols.totalSell),
          },
        ]
        setFormValuesInit(initFormValues)
        const slots = result.ido.kols.slots.map((slot) => {
          return {
            address: slot.address,
            maxBuy: convertWeiToNumber(slot.maxBuy),
          }
        })
        setWhitelist(slots)
      }
    }

    if (props.id) {
      initialData(props.id)
    }
  }, [lazyGetIdoQuery, props.id])

  const handleInputAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleInputMaxBuyChange = (e) => {
    setMaxBuy(e.target.value)
  }

  const handleAddKOLsToWhitelist = () => {
    const newWhitelist = {
      address,
      maxBuy,
    }

    if (!whitelist.some((item) => item.address === address)) {
      setWhitelist((currentWhitelist) => [...currentWhitelist, newWhitelist])
    }
    setAddress('')
    setMaxBuy('')
  }

  const handleSubmitForm = async (values) => {
    try {
      setPendingTx(true)
      if (props.id) {
        if (form.isFieldsTouched()) {
          const totalSell = getDecimalAmount(
            new BigNumber(values.totalSell),
            18
          ).toString(10)

          const payload: UpdateIdoRequest = {
            _id: props.id,
            kols: {
              totalSell,
              slots: whitelist.map((item) => {
                return {
                  address: item.address,
                  maxBuy: getDecimalAmount(
                    new BigNumber(item.maxBuy),
                    18
                  ).toString(10),
                }
              }),
            },
          }

          await updateIdoMutation(payload).unwrap()
        }

        props.onNextStep()
      }
      setPendingTx(false)
      props.onNextStep()
    } catch (error) {
      console.log(error)
      setPendingTx(false)
      message.error('Something error')
    }
  }

  const handleRemoveItemWhitelist = (address: string) => {
    const currentWhitelist = whitelist.filter((item) => {
      return item.address !== address
    })

    setWhitelist(currentWhitelist)
  }

  return {
    handleAddKOLsToWhitelist,
    handleInputAddressChange,
    handleInputMaxBuyChange,
    address,
    maxBuy,
    whitelist,
    pendingTx,
    handleSubmitForm,
    formValuesInit,
    handleRemoveItemWhitelist,
    form,
  }
}
