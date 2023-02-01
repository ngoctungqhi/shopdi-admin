import { Form, Input as AntInput } from 'antd'
import { ComponentProps, memo } from 'react'
import type { FormItemProps } from 'antd'

type Props = Omit<
  ComponentProps<typeof AntInput>,
  'ref' | 'name' | 'value' | 'status' | 'onChange' | 'rules'
> & {
  id: string
  requiredmark?: boolean
  label?: string
  name: any
  rules?: FormItemProps['rules']
}

export const TextBoxField = memo((props: Props) => {
  return (
    <div>
      {props.label && (
        <p className="mb-1">
          {props.label}{' '}
          {props.requiredmark && <span className="text-red-600">*</span>}
        </p>
      )}
      <Form.Item name={props.name} rules={props.rules}>
        <AntInput {...props} />
      </Form.Item>
    </div>
  )
})
