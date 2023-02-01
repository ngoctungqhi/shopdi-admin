import { Form, Select as AntSelect } from 'antd'
import { ComponentProps, memo } from 'react'
import type { FormItemProps } from 'antd'

type Props = Omit<
  ComponentProps<typeof AntSelect>,
  'ref' | 'name' | 'value' | 'status' | 'onBlur' | 'onChange' | 'rules'
> & {
  id: string
  requiredmark?: boolean
  label?: string
  name: any
  rules?: FormItemProps['rules']
}

export const SelectBoxField = memo((props: Props) => {
  return (
    <div>
      {props.label && (
        <p className="mb-1">
          {props.label}{' '}
          {props.requiredmark && <span className="text-red-600">*</span>}
        </p>
      )}
      <Form.Item name={props.name} rules={props.rules}>
        <AntSelect {...props} />
      </Form.Item>
    </div>
  )
})
