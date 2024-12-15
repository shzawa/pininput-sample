import { FC, ReactNode, useState } from "react"
import { usePinInputField } from "./usePinInputField"

type Props = {
  children: (props: {
    onSubmit: () => void
    pinInputFieldProps: ReturnType<typeof usePinInputField>
    isSubmitButtonDisabled: boolean
  }) => ReactNode
  pinLength: number
}
export const FormProvider: FC<Props> = ({ children, pinLength }) => {
  const [pin, setPin] = useState('')
  const [isPinInvalid, setIsPinInvalid] = useState(false)

  const onSubmit = () => {
    setIsPinInvalid(true)  // 検証のため絶対失敗させてる
    console.log(pin)
  }
  const onChange = (value: string) => {
    setPin(value)
  }
  const onComplete = () => {
    if (isPinInvalid) {
      setIsPinInvalid(false)
    }
  }

  const pinInputFieldProps = usePinInputField({
    invalid: isPinInvalid,
    onChange,
    onComplete,
    valueLength: pinLength
  })
  const isSubmitButtonDisabled = isPinInvalid || !pinInputFieldProps.isCompleted

  return children({
    onSubmit,
    pinInputFieldProps,
    isSubmitButtonDisabled,
  })
}
