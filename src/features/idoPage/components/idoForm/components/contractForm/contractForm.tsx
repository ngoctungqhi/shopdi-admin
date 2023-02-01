import { Row, Col, Form, Button } from 'antd'
import { TextBoxField } from 'components/forms/textBoxField'
import { DatePickerField } from 'components/forms/datePickerField'
import { useContractForm } from './useContractForm'
import { SelectBoxField } from 'components/forms/selectBoxField'
import { CloseOutlined } from '@ant-design/icons'
import { RadioGroupField } from 'components/forms/radioGroupField'
import {
  LEVEL_LIST,
  CURRENCY_LIST,
  FEE_OPTIONS,
  REFUND_OPTIONS,
} from 'configs/constants/constants'
import { formatNumber } from 'utils/formatBalance'
import { format } from 'date-fns'

export type ContractFormProps = {
  onNextStep: () => void
  id?: string | undefined
}
export const ContractForm = (props: ContractFormProps) => {
  const {
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
  } = useContractForm(props)
  return (
    <Row>
      <Col span={24}>
        <Form
          onFinish={handleSubmitForm}
          form={form}
          onValuesChange={(values) => setFormValues(values)}
          fields={formValuesInit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <div className="flex justify-between mb-1">
                <p className="m-0">
                  Token address <span className="text-red-600">*</span>
                </p>
                {name && symbol && decimals && (
                  <div className="flex gap-x-5">
                    <p className="m-0">
                      Name: <span className="font-bold">{name}</span>
                    </p>
                    <p className="m-0">
                      Symbol: <span className="font-bold">{symbol}</span>
                    </p>
                    <p className="m-0">
                      Decimals: <span className="font-bold">{decimals}</span>
                    </p>
                  </div>
                )}
              </div>
              <TextBoxField
                id="tokenAddress"
                name="tokenAddress"
                rules={validateRules.tokenAddress}
                placeholder="Ex: 0x3edc5984A29b1D360304e3e8786E6FD37498xxxx"
                disabled={isOnChain}
              />
            </Col>
            <Col span={12}>
              <SelectBoxField
                id="currency"
                name="currency"
                label="Currency"
                placeholder="Select currency to buy"
                options={CURRENCY_LIST}
                rules={validateRules.currency}
                requiredmark={true}
                disabled={isOnChain}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Row gutter={16}>
                <Col span={12}>
                  <TextBoxField
                    id="presaleRate"
                    name="presaleRate"
                    label="Presale rate"
                    rules={validateRules.presaleRate}
                    placeholder="Ex: 0.075"
                    requiredmark={true}
                    disabled={isOnChain}
                  />
                </Col>
                <Col span={12}>
                  <TextBoxField
                    id="totalSell"
                    name="totalSell"
                    label="Total sell"
                    rules={validateRules.totalSell}
                    placeholder="Ex: 100000"
                    requiredmark={true}
                    disabled={isOnChain}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row gutter={16}>
                <Col span={12}>
                  <DatePickerField
                    id="startTime"
                    name="startTime"
                    label="Start time"
                    rules={validateRules.startTime}
                    placeholder="Select start time"
                    format="YYYY-MM-DD HH:mm"
                    showTime={{ format: 'HH:mm' }}
                    allowClear={false}
                    requiredmark={true}
                    className="w-full"
                    disabled={isOnChain}
                  />
                </Col>
                <Col span={12}>
                  <DatePickerField
                    id="endTime"
                    name="endTime"
                    label="End time"
                    rules={validateRules.endTime}
                    placeholder="Select end time"
                    format="YYYY-MM-DD HH:mm"
                    showTime={{ format: 'HH:mm' }}
                    allowClear={false}
                    requiredmark={true}
                    className="w-full"
                    disabled={isOnChain}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <SelectBoxField
                id="levelBuy"
                name="levelBuy"
                label="Level buy"
                placeholder="Select min level to buy"
                options={LEVEL_LIST}
                rules={validateRules.levelBuy}
                requiredmark={true}
                disabled={isOnChain}
              />
            </Col>
            <Col span={6}>
              <TextBoxField
                id="tgePercent"
                name="tgePercent"
                label="TGE(%)"
                placeholder="Ex: 10"
                requiredmark={true}
                rules={validateRules.tgePercent}
                disabled={isOnChain}
              />
            </Col>
            <Col span={6}>
              <DatePickerField
                id="tgeTime"
                name="tgeTime"
                label="TGE time"
                rules={validateRules.tgeTime}
                placeholder="Select TGE time"
                format="YYYY-MM-DD HH:mm"
                showTime={{ format: 'HH:mm' }}
                allowClear={false}
                requiredmark={true}
                className="w-full"
                disabled={isOnChain}
              />
            </Col>
          </Row>
          <Row gutter={16} className="mb-4">
            <Col span={12}>
              <RadioGroupField
                id="feePercent"
                name="feePercent"
                label="Fee options"
                options={FEE_OPTIONS}
                disabled={isOnChain}
              />
            </Col>
            <Col span={12}>
              <RadioGroupField
                id="canRefund"
                name="canRefund"
                label="Refund"
                options={REFUND_OPTIONS}
                disabled={isOnChain}
              />
            </Col>
          </Row>
          <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8 mt-10">
            <span
              className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
              style={{ transform: 'translateY(-50%)' }}
            >
              Vesting schedule
            </span>
            <Row gutter={16}>
              <Col span={6}>
                <DatePickerField
                  id="vestingStart"
                  name="vestingStart"
                  label="Vesting start"
                  rules={validateRules.vestingStart}
                  placeholder="Select vesting start date"
                  format="YYYY-MM-DD HH:mm"
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  requiredmark={true}
                  className="w-full"
                  disabled={isOnChain}
                />
              </Col>
              <Col span={6}>
                <TextBoxField
                  id="cycleVestingDay"
                  name="cycleVestingDay"
                  label="Cycle vesting days (minutes)"
                  rules={validateRules.cycleVestingDay}
                  placeholder="Ex: 3600"
                  requiredmark={true}
                />
              </Col>
              <Col span={6}>
                <TextBoxField
                  id="vestingPercent"
                  name="vestingPercent"
                  label="Vesting percent(%)"
                  rules={validateRules.vestingPercent}
                  placeholder="Ex: 10"
                  requiredmark={true}
                  disabled={isOnChain}
                />
              </Col>
            </Row>
            <Row>
              <Col span={18}>
                <div className="flex bg-gray-200 p-3">
                  <div className="w-1/2 font-semibold">Time</div>
                  <div className="w-1/4 font-semibold">Percent</div>
                  <div className="w-1/4 font-semibold">
                    Amount{symbol && <span>({symbol})</span>}
                  </div>
                </div>
                {vestingSchedule.length > 0 &&
                  vestingSchedule.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex p-3 border-0 border-b border-solid border-gray-300 cursor-pointer relative hover:bg-gray-100"
                      >
                        <div className="w-1/2">
                          {format(
                            item.vestingStart * 1000,
                            'ccc, HH:mm yyyy/MM/dd'
                          )}
                        </div>
                        <div className="w-1/4">{item.percent}%</div>
                        <div className="w-1/4">{formatNumber(item.amount)}</div>
                      </div>
                    )
                  })}
              </Col>
            </Row>
          </div>
          <div className="flex gap-x-2 justify-end mt-5">
            <Button type="primary" htmlType="submit" loading={pendingTx}>
              Next
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}
