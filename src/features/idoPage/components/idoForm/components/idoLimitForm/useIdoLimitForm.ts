import { Form, message } from 'antd'
import {
  useLazyGetIdoQuery,
  useUpdateIdoMutation,
} from 'features/idoPage/apis/idoApis'
import { UpdateIdoRequest } from 'features/idoPage/apis/models/updateIdo/request'
import { useEffect, useMemo, useState } from 'react'
import { IdoLimitFormProps } from './idoLimitForm'
import dayjs, { Dayjs } from 'dayjs'
import { convertWeiToNumber, getDecimalAmount } from 'utils/formatBalance'
import { getUnixTime } from 'date-fns'
import BigNumber from 'bignumber.js'

type FormValueType = {
  name: string | number | (string | number)[]
  value: string | number | boolean | Dayjs
}

export const useIdoLimitForm = (props: IdoLimitFormProps) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [form] = Form.useForm()

  const [formValuesInit, setFormValuesInit] = useState<FormValueType[]>()

  const [updateIdoMutation] = useUpdateIdoMutation()
  const [lazyGetIdoQuery] = useLazyGetIdoQuery()

  useEffect(() => {
    const initialData = async (id: string) => {
      const result = await lazyGetIdoQuery({ id }).unwrap()
      const ranks = result.ido.ranks
      if (ranks.length > 0) {
        let initFormValues = []
        ranks.forEach((rank, index) => {
          const temp = [
            {
              name: [index, 'startTime'],
              value: dayjs.unix(rank.startTime),
            },
            {
              name: [index, 'endTime'],
              value: dayjs.unix(rank.endTime),
            },
            {
              name: [index, 'minBuy'],
              value: convertWeiToNumber(rank.minBuy),
            },
            {
              name: [index, 'maxBuy'],
              value: convertWeiToNumber(rank.maxBuy),
            },
          ]

          initFormValues = [...initFormValues, ...temp]
        })

        setFormValuesInit(initFormValues)
      }
    }

    if (props.id) {
      initialData(props.id)
    }
  }, [lazyGetIdoQuery, props.id])

  const handleSubmitForm = async (values) => {
    try {
      setPendingTx(true)
      if (props.id) {
        if (form.isFieldsTouched()) {
          const ranks = Object.keys(values).map((key) => {
            return {
              startTime: getUnixTime(new Date(values[key]['startTime'])),
              endTime: getUnixTime(new Date(values[key]['endTime'])),
              minBuy: getDecimalAmount(
                new BigNumber(values[key]['minBuy']),
                18
              ).toString(10),
              maxBuy: getDecimalAmount(
                new BigNumber(values[key]['maxBuy']),
                18
              ).toString(10),
            }
          })

          const payload: UpdateIdoRequest = {
            _id: props.id,
            ranks,
          }

          await updateIdoMutation(payload).unwrap()
        }
      }
      setPendingTx(false)
      props.onNextStep()
    } catch (error) {
      console.log(error)
      setPendingTx(false)
      message.error('Something error')
    }
  }

  const validateRules = useMemo(
    () => ({
      maxAmount: [
        {
          required: true,
          message: 'Please input max token amount!',
        },
      ],
      minAmount: [
        {
          required: true,
          message: 'Please input min token amount!',
        },
      ],
      startTime: [
        {
          required: true,
          message: 'Please input start time to buy IDO!',
        },
      ],
      endTime: [
        {
          required: true,
          message: 'Please input end time to buy IDO!',
        },
      ],
    }),
    []
  )

  return { pendingTx, handleSubmitForm, validateRules, formValuesInit, form }
}
