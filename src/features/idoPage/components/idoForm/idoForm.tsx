import { Steps } from 'antd'
import { useIdoForm } from './useIdoForm'
import { ContractForm } from './components/contractForm/contractForm'
import { IdoProjectInfoForm } from './components/idoProjectInfoForm/idoProjectInfoForm'
import { IdoLimitForm } from './components/idoLimitForm/idoLimitForm'
import { IdoKOLsForm } from './components/idoKOLsForm/idoKOLsForm'
import { IdoConfirmPage } from './components/idoConfirmPage/idoConfirmPage'
import { UpdateContract } from './components/updateContract/updateContract'

export const IdoForm = () => {
  const { currentStep, handleNextStep, handlePrevStep, id } = useIdoForm()
  const steps = [
    {
      title: 'Contract',
      content: <ContractForm onNextStep={handleNextStep} id={id} />,
    },
    {
      title: 'Info',
      content: (
        <IdoProjectInfoForm
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          id={id}
        />
      ),
    },
    {
      title: 'Limit',
      content: (
        <IdoLimitForm
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          id={id}
        />
      ),
    },
    {
      title: 'KOLs',
      content: (
        <IdoKOLsForm
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          id={id}
        />
      ),
    },
    {
      title: 'Confirm',
      content: (
        <IdoConfirmPage
          currentStep={currentStep}
          onPrevStep={handlePrevStep}
          id={id}
        />
      ),
    },
    {
      title: 'Update contract',
      content: (
        <UpdateContract
          currentStep={currentStep}
          onPrevStep={handlePrevStep}
          id={id}
        />
      ),
    },
  ]

  const items = steps.map((item) => ({ key: item.title, title: item.title }))
  return (
    <div>
      <h1>Add new IDO</h1>
      <div className="mt-5">
        <Steps current={currentStep} items={items} />
        <div className="steps-content mt-5">{steps[currentStep].content}</div>
      </div>
    </div>
  )
}
