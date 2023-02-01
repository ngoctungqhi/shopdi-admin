import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const useIdoForm = () => {
  const [currentStep, setCurrentStep] = useState(5)
  const { id } = useParams()

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  return { currentStep, handleNextStep, handlePrevStep, id }
}
