import { Row, Col, Form, Button } from 'antd'
import { useIdoLimitForm } from './useIdoLimitForm'
import { TextBoxField } from 'components/forms/textBoxField'
import { DatePickerField } from 'components/forms/datePickerField'
import { LEVEL_LIST } from 'configs/constants/constants'

export type IdoLimitFormProps = {
  currentStep: number
  onNextStep: () => void
  onPrevStep: () => void
  id?: string | undefined
}

export const IdoLimitForm = (props: IdoLimitFormProps) => {
  const { pendingTx, handleSubmitForm, validateRules, formValuesInit, form } =
    useIdoLimitForm(props)

  return (
    <Row>
      <Col span={24}>
        <Form onFinish={handleSubmitForm} fields={formValuesInit} form={form}>
          {LEVEL_LIST.map((level) => {
            return (
              <div
                key={level.value}
                className="relative border border-solid border-[#D0D0D0] rounded-lg px-8 pt-8 pb-5 mb-8"
              >
                <span
                  className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  {level.label}
                </span>
                <Row gutter={16}>
                  <Col span={12}>
                    <DatePickerField
                      id="startTime"
                      name={[level.value, 'startTime']}
                      label="Start time"
                      requiredmark={true}
                      rules={validateRules.startTime}
                      showTime={{ format: 'HH:mm' }}
                      allowClear={false}
                      format="YYYY-MM-DD HH:mm"
                      placeholder="Select start time"
                      className="w-full"
                    />
                  </Col>
                  <Col span={12}>
                    <DatePickerField
                      id="endTime"
                      name={[level.value, 'endTime']}
                      label="End time"
                      requiredmark={true}
                      rules={validateRules.endTime}
                      showTime={{ format: 'HH:mm' }}
                      allowClear={false}
                      format="YYYY-MM-DD HH:mm"
                      placeholder="Select end time"
                      className="w-full"
                    />
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <TextBoxField
                      id="minBuy"
                      name={[level.value, 'minBuy']}
                      label="Min buy"
                      rules={validateRules.minAmount}
                      requiredmark={true}
                      placeholder="Enter min amount user can buy"
                    />
                  </Col>
                  <Col span={12}>
                    <TextBoxField
                      id="maxBuy"
                      name={[level.value, 'maxBuy']}
                      label="Max buy"
                      rules={validateRules.maxAmount}
                      requiredmark={true}
                      placeholder="Enter max amount user can buy"
                    />
                  </Col>
                </Row>
              </div>
            )
          })}
          {/* <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8 mt-5">
            <span
              className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
              style={{ transform: 'translateY(-50%)' }}
            >
              Bronze
            </span>
            <Row gutter={16}>
              <Col span={12}>
                <DatePickerField
                  id="startTime"
                  name={[1, 'startTime']}
                  label="Start time"
                  requiredmark={true}
                  // rules={validateRules.startTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select start time"
                  className="w-full"
                />
              </Col>
              <Col span={12}>
                <DatePickerField
                  id="endTime"
                  name={[1, 'endTime']}
                  label="End time"
                  requiredmark={true}
                  // rules={validateRules.endTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select end time"
                  className="w-full"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <TextBoxField
                  id="minAmount"
                  name={[1, 'minAmount']}
                  label="Min amount"
                  // rules={validateRules.minAmount}
                  requiredmark={true}
                  placeholder="Enter min amount user can buy"
                />
              </Col>
              <Col span={12}>
                <TextBoxField
                  id="maxAmount"
                  name={[1, 'maxAmount']}
                  label="Max amount"
                  // rules={validateRules.maxAmount}
                  requiredmark={true}
                  placeholder="Enter max amount user can buy"
                />
              </Col>
            </Row>
          </div>
          <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8 mt-8">
            <span
              className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
              style={{ transform: 'translateY(-50%)' }}
            >
              Silver
            </span>
            <Row gutter={16}>
              <Col span={12}>
                <DatePickerField
                  id="startTime"
                  name={[2, 'startTime']}
                  label="Start time"
                  requiredmark={true}
                  // rules={validateRules.startTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select start time"
                  className="w-full"
                />
              </Col>
              <Col span={12}>
                <DatePickerField
                  id="endTime"
                  name={[2, 'endTime']}
                  label="End time"
                  requiredmark={true}
                  // rules={validateRules.endTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select end time"
                  className="w-full"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <TextBoxField
                  id="minAmount"
                  name={[2, 'minAmount']}
                  label="Min amount"
                  // rules={validateRules.minAmount}
                  requiredmark={true}
                  placeholder="Enter min amount user can buy"
                />
              </Col>
              <Col span={12}>
                <TextBoxField
                  id="maxAmount"
                  name={[2, 'maxAmount']}
                  label="Max amount"
                  // rules={validateRules.maxAmount}
                  requiredmark={true}
                  placeholder="Enter max amount user can buy"
                />
              </Col>
            </Row>
          </div>
          <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8 mt-8">
            <span
              className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
              style={{ transform: 'translateY(-50%)' }}
            >
              Gold
            </span>
            <Row gutter={16}>
              <Col span={12}>
                <DatePickerField
                  id="startTime"
                  name={[3, 'startTime']}
                  label="Start time"
                  requiredmark={true}
                  // rules={validateRules.startTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select start time"
                  className="w-full"
                />
              </Col>
              <Col span={12}>
                <DatePickerField
                  id="endTime"
                  name={[3, 'endTime']}
                  label="End time"
                  requiredmark={true}
                  // rules={validateRules.endTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select end time"
                  className="w-full"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <TextBoxField
                  id="minAmount"
                  name={[3, 'minAmount']}
                  label="Min amount"
                  // rules={validateRules.minAmount}
                  requiredmark={true}
                  placeholder="Enter min amount user can buy"
                />
              </Col>
              <Col span={12}>
                <TextBoxField
                  id="maxAmount"
                  name={[3, 'maxAmount']}
                  label="Max amount"
                  // rules={validateRules.maxAmount}
                  requiredmark={true}
                  placeholder="Enter max amount user can buy"
                />
              </Col>
            </Row>
          </div>
          <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8 mt-8">
            <span
              className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
              style={{ transform: 'translateY(-50%)' }}
            >
              Platinium
            </span>
            <Row gutter={16}>
              <Col span={12}>
                <DatePickerField
                  id="startTime"
                  name={[4, 'startTime']}
                  label="Start time"
                  requiredmark={true}
                  // rules={validateRules.startTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select start time"
                  className="w-full"
                />
              </Col>
              <Col span={12}>
                <DatePickerField
                  id="endTime"
                  name={[4, 'endTime']}
                  label="End time"
                  requiredmark={true}
                  // rules={validateRules.endTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select end time"
                  className="w-full"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <TextBoxField
                  id="minAmount"
                  name={[4, 'minAmount']}
                  label="Min amount"
                  // rules={validateRules.minAmount}
                  requiredmark={true}
                  placeholder="Enter min amount user can buy"
                />
              </Col>
              <Col span={12}>
                <TextBoxField
                  id="maxAmount"
                  name={[4, 'maxAmount']}
                  label="Max amount"
                  // rules={validateRules.maxAmount}
                  requiredmark={true}
                  placeholder="Enter max amount user can buy"
                />
              </Col>
            </Row>
          </div>
          <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8 mt-8">
            <span
              className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
              style={{ transform: 'translateY(-50%)' }}
            >
              Titanium
            </span>
            <Row gutter={16}>
              <Col span={12}>
                <DatePickerField
                  id="startTime"
                  name={[5, 'startTime']}
                  label="Start time"
                  requiredmark={true}
                  // rules={validateRules.startTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select start time"
                  className="w-full"
                />
              </Col>
              <Col span={12}>
                <DatePickerField
                  id="endTime"
                  name={[5, 'endTime']}
                  label="End time"
                  requiredmark={true}
                  // rules={validateRules.endTime}
                  showTime={{ format: 'HH:mm' }}
                  allowClear={false}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="Select end time"
                  className="w-full"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <TextBoxField
                  id="minAmount"
                  name={[5, 'minAmount']}
                  label="Min amount"
                  // rules={validateRules.minAmount}
                  requiredmark={true}
                  placeholder="Enter min amount user can buy"
                />
              </Col>
              <Col span={12}>
                <TextBoxField
                  id="maxAmount"
                  name={[5, 'maxAmount']}
                  label="Max amount"
                  // rules={validateRules.maxAmount}
                  requiredmark={true}
                  placeholder="Enter max amount user can buy"
                />
              </Col>
            </Row>
          </div> */}
          <div className="flex gap-x-2 justify-end mt-5">
            {props.currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={props.onPrevStep}>
                Previous
              </Button>
            )}
            <Button type="primary" htmlType="submit" loading={pendingTx}>
              Next
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}
