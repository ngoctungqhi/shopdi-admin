import { CheckboxOptionType, Form, Radio } from 'antd'
import { ComponentProps, memo } from 'react'
import type { FormItemProps } from 'antd'

type Props = Omit<
  ComponentProps<typeof Radio>,
  'ref' | 'name' | 'value' | 'status' | 'onChange' | 'rules'
> & {
  id: string
  requiredmark?: boolean
  label?: string
  name: any
  rules?: FormItemProps['rules']
  options?: Array<CheckboxOptionType | string | number>
}

export const RadioGroupField = memo((props: Props) => {
  return (
    <div className="flex items-center gap-x-14">
      {props.label && (
        <p className="mb-0">
          {props.label}{' '}
          {props.requiredmark && <span className="text-red-600">*</span>}
        </p>
      )}
      <Form.Item name={props.name} rules={props.rules} className="mb-0">
        <Radio.Group {...props} options={props.options} />
      </Form.Item>
    </div>
  )
})
