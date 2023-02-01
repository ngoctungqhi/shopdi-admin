import { Form, Switch as AntSwitch } from 'antd'
import { ComponentProps, memo } from 'react'

type Props = Omit<
  ComponentProps<typeof AntSwitch>,
  'ref' | 'name' | 'value' | 'status' | 'onChange'
> & {
  id: string
  label?: string
  name: any
}

export const SwitchField = memo((props: Props) => {
  return (
    <div className="flex items-center gap-x-5">
      {props.label && <p className="mb-0">{props.label}</p>}
      <Form.Item name={props.name} className="mb-0">
        <AntSwitch {...props} />
      </Form.Item>
    </div>
  )
})
