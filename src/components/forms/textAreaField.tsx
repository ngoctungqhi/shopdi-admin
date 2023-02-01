import { Form, Input as AntInput } from 'antd'
import { ComponentProps, memo } from 'react'
import type { FormItemProps } from 'antd'
const { TextArea } = AntInput

type Props = Omit<
  ComponentProps<typeof TextArea>,
  'ref' | 'name' | 'value' | 'status' | 'onBlur' | 'onChange' | 'rules'
> & {
  id: string
  requiredmark?: boolean
  label?: string
  name: any
  rules?: FormItemProps['rules']
}

export const TextAreaField = memo((props: Props) => {
  return (
    <div>
      {props.label && (
        <p className="mb-1">
          {props.label}{' '}
          {props.requiredmark && <span className="text-red-600">*</span>}
        </p>
      )}
      <Form.Item name={props.name} rules={props.rules}>
        <TextArea {...props} />
      </Form.Item>
    </div>
  )
})
