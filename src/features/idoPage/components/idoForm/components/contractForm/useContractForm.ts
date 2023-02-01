import { useEffect, useMemo, useState } from 'react'
import { ContractFormProps } from './contractForm'
import { Form, message } from 'antd'
import { useTokenInfo } from 'hooks/useTokenInfo'
import {
  useInsertIdoMutation,
  useLazyGetIdoQuery,
  useUpdateIdoMutation,
} from 'features/idoPage/apis/idoApis'
import { convertWeiToNumber, getDecimalAmount } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { getUnixTime } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'

type FormValues = {
  tokenAddress: string
  currency: string
  presaleRate: string
  totalSell: string
  startTime: number
  endTime: number
  levelBuy: number
  tgePercent: number
  tgeTime: number
  feePercent: number
  canRefund: number
  vestingStart: number
  cycleVestingDay: number
  vestingPercent: number
}

type FormValueType = {
  name: string | number
  value: string | number | Dayjs
}

export const useContractForm = (props: ContractFormProps) => {
  const [form] = Form.useForm()

  const [pendingTx, setPendingTx] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>(null)
  const [vestingSchedule, setVestingSchedule] = useState([])
  const [isOnChain, setIsOnChain] = useState(false)

  const navigate = useNavigate()
  const [formValuesInit, setFormValuesInit] = useState<FormValueType[]>([
    { name: 'feePercent', value: 0 },
    { name: 'canRefund', value: 0 },
  ])

  const [insertIdoMutation] = useInsertIdoMutation()
  const [lazyGetIdoQuery] = useLazyGetIdoQuery()
  const [updateIdoMutation] = useUpdateIdoMutation()

  useEffect(() => {
    const initialData = async (id: string) => {
      const result = await lazyGetIdoQuery({ id }).unwrap()

      setIsOnChain(result.ido.isOnchain)
      //init form data
      const initFormValues = [
        {
          name: 'tokenAddress',
          value: result.ido.tokenAddress,
        },
        {
          name: 'currency',
          value: result.ido.currency,
        },
        {
          name: 'presaleRate',
          value: convertWeiToNumber(result.ido.presaleRate),
        },
        {
          name: 'totalSell',
          value: convertWeiToNumber(result.ido.totalSell),
        },
        {
          name: 'startTime',
          value: dayjs.unix(result.ido.startTime),
        },
        {
          name: 'endTime',
          value: dayjs.unix(result.ido.endTime),
        },
        {
          name: 'levelBuy',
          value: result.ido.levelBuy,
        },
        {
          name: 'tgePercent',
          value: result.ido.tgePercent,
        },
        {
          name: 'tgeTime',
          value: dayjs.unix(result.ido.tgeTime),
        },
        {
          name: 'feePercent',
          value: result.ido.feePercent,
        },
        {
          name: 'canRefund',
          value: result.ido.canRefund ? 1 : 0,
        },
        {
          name: 'vestingStart',
          value: dayjs.unix(result.ido.vestingStart),
        },
        {
          name: 'cycleVestingDay',
          value: result.ido.cycleVestingDay / 60,
        },
        {
          name: 'vestingPercent',
          value: result.ido.vestingPercent,
        },
      ]
      setFormValuesInit(initFormValues)
    }

    if (props.id) {
      initialData(props.id)
    }
  }, [lazyGetIdoQuery, props.id])

  useEffect(() => {
    const values = form.getFieldsValue([
      'totalSell',
      'tgePercent',
      'cycleVestingDay',
      'vestingPercent',
      'vestingStart',
    ])

    const totalSell = values?.totalSell
    const tgePercent = values?.tgePercent
    const cycleVestingDay = values?.cycleVestingDay
    const vestingPercent = values?.vestingPercent
    let vestingStart = getUnixTime(new Date(values?.vestingStart))

    if (
      totalSell &&
      tgePercent &&
      cycleVestingDay &&
      vestingPercent &&
      vestingStart
    ) {
      const totalVestingPercent = 100 - tgePercent
      const totalRound = Math.floor(totalVestingPercent / vestingPercent)
      const tempScheduleList = []
      if (totalRound > 0) {
        for (let i = 0; i < totalRound; i++) {
          if (i === 0) {
            tempScheduleList.push({
              vestingStart,
              percent: vestingPercent,
              amount: (vestingPercent * Number(totalSell)) / 100,
            })
          } else {
            vestingStart += cycleVestingDay * 60
            tempScheduleList.push({
              vestingStart,
              percent: vestingPercent,
              amount: (vestingPercent * Number(totalSell)) / 100,
            })
          }
        }

        if (totalRound * vestingPercent < totalVestingPercent) {
          const remainPercent =
            totalVestingPercent - totalRound * vestingPercent
          tempScheduleList.push({
            vestingStart,
            percent: remainPercent,
            amount: (remainPercent * Number(totalSell)) / 100,
          })
        }
      }
      setVestingSchedule(tempScheduleList)
    } else {
      setVestingSchedule([])
    }
  }, [
    formValues?.totalSell,
    formValues?.tgePercent,
    formValues?.cycleVestingDay,
    formValues?.vestingPercent,
    formValues?.vestingStart,
    form,
    formValuesInit,
  ])

  const { name, symbol, decimals } = useTokenInfo(
    formValues && formValues.tokenAddress ? formValues.tokenAddress : ''
  )

  const validateRules = useMemo(
    () => ({
      tokenAddress: [
        {
          required: true,
          message: 'Please input token address!',
        },
      ],
      currency: [
        {
          required: true,
          message: 'Please input currency!',
        },
      ],
      presaleRate: [
        {
          required: true,
          message: 'Please input token presale rate!',
        },
      ],
      totalSell: [
        {
          required: true,
          message: 'Please input total token sell!',
        },
      ],
      startTime: [
        {
          required: true,
          message: 'Please input ido start time!',
        },
      ],
      endTime: [
        {
          required: true,
          message: 'Please input ido end time!',
        },
      ],
      levelBuy: [
        {
          required: true,
          message: 'Please input min level to buy!',
        },
      ],
      tgePercent: [
        {
          required: true,
          message: 'Please input TGE percent!',
        },
      ],
      tgeTime: [
        {
          required: true,
          message: 'Please input TGE time!',
        },
      ],
      vestingStart: [
        {
          required: true,
          message: 'Please input vesting start date!',
        },
      ],
      cycleVestingDay: [
        {
          required: true,
          message: 'Please input cycle vesting day!',
        },
      ],
      vestingPercent: [
        {
          required: true,
          message: 'Please input vesting percent!',
        },
      ],
    }),
    []
  )

  const handleSubmitForm = async (values) => {
    try {
      const payload = {
        tokenAddress: values.tokenAddress,
        currency: values.currency,
        presaleRate: getDecimalAmount(
          new BigNumber(values.presaleRate),
          18
        ).toString(10),
        totalSell: getDecimalAmount(
          new BigNumber(values.totalSell),
          18
        ).toString(10),
        startTime: getUnixTime(new Date(values.startTime)),
        endTime: getUnixTime(new Date(values.endTime)),
        levelBuy: values.levelBuy,
        tgePercent: values.tgePercent,
        tgeTime: getUnixTime(new Date(values.tgeTime)),
        feePercent: values.feePercent,
        canRefund: values.canRefund === 0 ? false : true,
        vestingStart: getUnixTime(new Date(values.vestingStart)),
        cycleVestingDay: values.cycleVestingDay * 60,
        vestingPercent: values.vestingPercent,
      }

      setPendingTx(true)
      if (!props.id) {
        const response = await insertIdoMutation(payload).unwrap()
        navigate(`/ido/edit/${response._id}`)
      } else {
        console.log(form.isFieldsTouched())
        if (form.isFieldsTouched()) {
          //update ido
          await updateIdoMutation({ _id: props.id, ...payload }).unwrap()
        }
      }
      props.onNextStep()
      setPendingTx(false)
    } catch (error) {
      console.log(error)
      setPendingTx(false)
      message.error('Something error')
    }
  }

  return {
    pendingTx,
    validateRules,
    handleSubmitForm,
    name,
    symbol,
    decimals,
    formValuesInit,
    form,
    setFormValues,
    vestingSchedule,
    isOnChain,
  }
}
