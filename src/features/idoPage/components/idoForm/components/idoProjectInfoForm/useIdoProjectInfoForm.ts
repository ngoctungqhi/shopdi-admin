import { Form, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { IdoProjectInfoFormProps } from './idoProjectInfoForm'
import {
  useUpdateIdoMutation,
  useLazyGetIdoQuery,
} from 'features/idoPage/apis/idoApis'
import { UpdateIdoRequest } from 'features/idoPage/apis/models/updateIdo/request'

type FormValueType = {
  name: string | number
  value: string | number | boolean
}

export const useIdoProjectInfoForm = (props: IdoProjectInfoFormProps) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [formValuesInit, setFormValuesInit] = useState<FormValueType[]>()
  const [form] = Form.useForm()

  const [updateIdoMutation] = useUpdateIdoMutation()
  const [lazyGetIdoQuery] = useLazyGetIdoQuery()

  useEffect(() => {
    const initialData = async (id: string) => {
      const result = await lazyGetIdoQuery({ id }).unwrap()
      const initFormValues = [
        {
          name: 'website',
          value: result.ido.website,
        },
        {
          name: 'logo',
          value: result.ido.logo,
        },
        {
          name: 'banner',
          value: result.ido.banner,
        },
        {
          name: 'facebook',
          value: result.ido.facebook,
        },
        {
          name: 'telegramChannel',
          value: result.ido.telegramChannel,
        },
        {
          name: 'telegramGroup',
          value: result.ido.telegramGroup,
        },
        {
          name: 'twitter',
          value: result.ido.twitter,
        },
        {
          name: 'instagram',
          value: result.ido.instagram,
        },
        {
          name: 'youtube',
          value: result.ido.youtube,
        },
        {
          name: 'tiktok',
          value: result.ido.tiktok,
        },
        {
          name: 'isAudit',
          value: result.ido.isAudit,
        },
        {
          name: 'isKYC',
          value: result.ido.isKYC,
        },
        {
          name: 'certificate',
          value: result.ido.certificate,
        },
        {
          name: 'shortDescription',
          value: result.ido.shortDescription,
        },
        {
          name: 'info',
          value: result.ido.info,
        },
        {
          name: 'team',
          value: result.ido.team,
        },
      ]
      setFormValuesInit(initFormValues)
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
          const payload: UpdateIdoRequest = {
            _id: props.id,
            website: values.website,
            logo: values.logo,
            banner: values.banner,
            facebook: values.facebook,
            telegramChannel: values.telegramChannel,
            telegramGroup: values.telegramGroup,
            twitter: values.twitter,
            instagram: values.instagram,
            youtube: values.youtube,
            tiktok: values.tiktok,
            isAudit: values.isAudit,
            isKYC: values.isKYC,
            certificate: values.certificate,
            shortDescription: values.shortDescription,
            info: values.info,
            team: values.team,
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
      website: [
        {
          required: true,
          message: 'Please input website url!',
        },
      ],
      telegramChannel: [
        {
          required: true,
          message: 'Please input telegram channel url!',
        },
      ],
      telegramGroup: [
        {
          required: true,
          message: 'Please input telegram group url!',
        },
      ],
      twitter: [
        {
          required: true,
          message: 'Please input twitter url!',
        },
      ],
    }),
    []
  )

  return { pendingTx, handleSubmitForm, validateRules, formValuesInit, form }
}
