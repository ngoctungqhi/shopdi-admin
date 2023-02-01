import { Form, Row, Col, Button } from 'antd'
import 'react-quill/dist/quill.snow.css'
import { useIdoProjectInfoForm } from './useIdoProjectInfoForm'
import { TextBoxField } from 'components/forms/textBoxField'
import { SwitchField } from 'components/forms/switchField'
import { RadioGroupField } from 'components/forms/radioGroupField'
import { TextAreaField } from 'components/forms/textAreaField'
import { HtmlEditorField } from 'components/forms/htmlEditorField'
import { CERTIFICATE } from 'configs/constants/constants'

export type IdoProjectInfoFormProps = {
  currentStep: number
  onNextStep: () => void
  onPrevStep: () => void
  id?: string | undefined
}

export const IdoProjectInfoForm = (props: IdoProjectInfoFormProps) => {
  const { pendingTx, handleSubmitForm, validateRules, formValuesInit, form } =
    useIdoProjectInfoForm(props)

  return (
    <div>
      <Form onFinish={handleSubmitForm} fields={formValuesInit} form={form}>
        <div className="relative border border-solid border-[#D0D0D0] rounded-lg p-8">
          <span
            className="absolute font-semibold left-0 top-0 bg-white py-1 px-3"
            style={{ transform: 'translateY(-50%)' }}
          >
            Social
          </span>
          <Row gutter={16}>
            <Col span={12}>
              <TextBoxField
                id="website"
                name="website"
                label="Website"
                placeholder="Enter project website url"
                requiredmark={true}
                rules={validateRules.website}
              />
            </Col>
            <Col span={12}>
              <TextBoxField
                id="facebook"
                name="facebook"
                label="Facebook"
                placeholder="Enter project facebook url"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextBoxField
                id="telegramChannel"
                name="telegramChannel"
                label="Telegram Channel"
                placeholder="Enter project telegram channel url"
                requiredmark={true}
                rules={validateRules.telegramChannel}
              />
            </Col>
            <Col span={12}>
              <TextBoxField
                id="telegramGroup"
                name="telegramGroup"
                label="Telegram Group"
                placeholder="Enter project telegram group url"
                requiredmark={true}
                rules={validateRules.telegramGroup}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextBoxField
                id="twitter"
                name="twitter"
                label="Twitter"
                placeholder="Enter project twitter url"
                requiredmark={true}
                rules={validateRules.twitter}
              />
            </Col>
            <Col span={12}>
              <TextBoxField
                id="instagram"
                name="instagram"
                label="Instagram"
                placeholder="Enter project instagram url"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <TextBoxField
                id="youtube"
                name="youtube"
                label="Youtube"
                placeholder="Enter project youtube url"
              />
            </Col>
            <Col span={12}>
              <TextBoxField
                id="tiktok"
                name="tiktok"
                label="Tiktok"
                placeholder="Enter project tiktok url"
              />
            </Col>
          </Row>
        </div>
        <Row className="mt-3" gutter={16}>
          <Col span={12}>
            <TextBoxField
              id="logo"
              name="logo"
              label="Logo"
              placeholder="Logo url image"
            />
          </Col>
          <Col span={12}>
            <TextBoxField
              id="banner"
              name="banner"
              label="Banner"
              placeholder="Banner url image"
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col span={4}>
            <SwitchField
              id="audit"
              name="isAudit"
              label="Audit"
              defaultChecked
            />
          </Col>
          <Col span={4}>
            <SwitchField id="kyc" name="isKYC" label="KYC" defaultChecked />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col span={12}>
            <RadioGroupField
              id="certificate"
              name="certificate"
              label="Certificate"
              options={CERTIFICATE}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col span={24}>
            <TextAreaField
              id="description"
              name="shortDescription"
              label="Description"
              showCount
              maxLength={300}
              allowClear
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col span={24}>
            <HtmlEditorField
              id="info"
              name="info"
              label="Info"
              theme="snow"
              className="min-h-[96px]"
              placeholder="Project information"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <HtmlEditorField
              id="team"
              name="team"
              label="Team"
              theme="snow"
              className="min-h-[96px]"
              placeholder="Team information"
            />
          </Col>
        </Row>
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
    </div>
  )
}
