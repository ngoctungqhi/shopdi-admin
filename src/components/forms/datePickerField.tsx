import {
  Form,
  FormItemProps,
  DatePicker as AntDatePicker,
  DatePickerProps,
} from 'antd'
import { ComponentProps, memo } from 'react'
import type { Dayjs } from 'dayjs'

type PanelMode =
  | 'time'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'decade'
type PickerMode = Exclude<PanelMode, 'datetime' | 'decade'>

type DisabledTimes = {
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
}

type Props = Omit<
  ComponentProps<typeof AntDatePicker>,
  'ref' | 'name' | 'value' | 'status' | 'onBlur' | 'onChange' | 'rules'
> &
  Omit<DatePickerProps, 'name'> & {
    id: string
    requiredmark?: boolean
    label?: string
    name?: any
    rules?: FormItemProps['rules']
    showTime?: {
      format?: string | undefined
      picker?: PickerMode | undefined
      defaultValue?: Dayjs | undefined
      showNow?: boolean | undefined
      showHour?: boolean | undefined
      showMinute?: boolean | undefined
      showSecond?: boolean | undefined
      use12Hours?: boolean | undefined
      hourStep?: number | undefined
      minuteStep?: number | undefined
      secondStep?: number | undefined
      hideDisabledOptions?: boolean | undefined
      disabledHours?: (() => number[]) | undefined
      disabledMinutes?: ((hour: number) => number[]) | undefined
      disabledSeconds?: ((hour: number, minute: number) => number[]) | undefined
      disabledTime?: (date: Dayjs) => DisabledTimes | undefined
    }
    picker?: Exclude<PickerMode, 'date' | 'time'>
  }

export const DatePickerField: React.FC<Props> = memo(({ name, ...props }) => {
  return (
    <div>
      {props.label && (
        <p className="mb-1">
          {props.label}{' '}
          {props.requiredmark && <span className="text-red-600">*</span>}
        </p>
      )}
      <Form.Item name={name} rules={props.rules}>
        <AntDatePicker picker={props.picker} {...props} />
      </Form.Item>
    </div>
  )
})
