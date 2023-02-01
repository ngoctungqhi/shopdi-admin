import { CloseOutlined } from '@ant-design/icons'
import { Row, Col, Form, Input, Button } from 'antd'
import { TextBoxField } from 'components/forms/textBoxField'
import { useIdoKOLsForm } from './useIdoKOLsForm'
export type IdoKOLsFormProps = {
  currentStep: number
  onNextStep: () => void
  onPrevStep: () => void
  id?: string | undefined
}

export const IdoKOLsForm = (props: IdoKOLsFormProps) => {
  const {
    handleAddKOLsToWhitelist,
    handleInputAddressChange,
    handleInputMaxBuyChange,
    address,
    maxBuy,
    whitelist,
    pendingTx,
    handleSubmitForm,
    formValuesInit,
    handleRemoveItemWhitelist,
    form,
  } = useIdoKOLsForm(props)
  return (
    <Row>
      <Col span={24}>
        <Form onFinish={handleSubmitForm} fields={formValuesInit} form={form}>
          <Row>
            <Col span={24}>
              <TextBoxField
                id="totalSell"
                name="totalSell"
                label="Total sell"
                placeholder="Total token sell for KOLs"
              />
            </Col>
          </Row>
          <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8">
            <span
              className="absolute top-0 font-semibold left-0 bg-white py-1 px-3"
              style={{ transform: 'translateY(-50%)' }}
            >
              Whitelist
            </span>
            <Row gutter={16}>
              <Col span={10}>
                <div className="flex flex-col gap-y-1">
                  <span>Address</span>
                  <Input
                    placeholder="Enter KOLs address"
                    onChange={handleInputAddressChange}
                    value={address}
                  />
                </div>
              </Col>
              <Col span={10}>
                <div className="flex flex-col gap-y-1">
                  <span>Max buy</span>
                  <Input
                    placeholder="Enter max buy"
                    onChange={handleInputMaxBuyChange}
                    value={maxBuy}
                  />
                </div>
              </Col>
              <Col span={4}>
                <div className="flex items-end h-full">
                  <Button type="primary" onClick={handleAddKOLsToWhitelist}>
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col span={24}>
                <h6 className="text-sm text-[#4F4F4F]">List</h6>
                <div>
                  <div className="bg-[#F3F4FC] px-4 py-5 grid grid-cols-2">
                    <span>Address</span>
                    <span>Max buy</span>
                  </div>
                  {whitelist.map((item) => {
                    return (
                      <div className="relative px-4 py-5 grid grid-cols-2 border-0 border-b border-[#e9e9e9] border-solid hover:bg-[#F3F4FC] group">
                        <span>{item.address}</span>
                        <span>{item.maxBuy}</span>
                        <CloseOutlined
                          className="absolute top-1/2 right-5 hidden group-hover:inline-block"
                          style={{ transform: 'translateY(-50%)' }}
                          onClick={() =>
                            handleRemoveItemWhitelist(item.address)
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              </Col>
            </Row>
          </div>
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
