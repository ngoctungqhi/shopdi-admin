import { Form, Input as AntInput } from 'antd'
import { ComponentProps, memo } from 'react'
import type { FormItemProps } from 'antd'
import ReactQuill, { ReactQuillProps } from 'react-quill'

type Props = Omit<
  ComponentProps<typeof AntInput>,
  'ref' | 'name' | 'value' | 'status' | 'onBlur' | 'onChange' | 'rules'
> & {
  id: string
  requiredmark?: boolean
  label?: string
  name: any
  rules?: FormItemProps['rules']
} & ReactQuillProps

export const HtmlEditorField = memo((props: Props) => {
  return (
    <div>
      {props.label && (
        <p className="mb-1">
          {props.label}{' '}
          {props.requiredmark && <span className="text-red-600">*</span>}
        </p>
      )}
      <Form.Item name={props.name} rules={props.rules}>
        <ReactQuill {...props} />
      </Form.Item>
    </div>
  )
})
