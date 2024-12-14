import { FC, FormEvent, ReactNode, useState } from "react"

type Props = {
  children: (props: {
    invalid: boolean
    onFormSubmit: (e: FormEvent<Element>) => void
    onPinInputSubmit: () => void
    onChange: (v: string) => void
    onComplete: () => void
  }) => ReactNode
}
export const FormProvider: FC<Props> = ({ children }) => {
  const [pin, setPin] = useState('')
  const [invalid, setInvalid] = useState(false)

  const submit = () => {
    setInvalid(true)  // 検証のため絶対失敗させてる
    console.log(pin)
  }
  const onFormSubmit = (e: FormEvent<Element>) => {
    e.preventDefault()
    submit()
  }
  const onPinInputSubmit = () => {
    submit()
  }
  const onChange = (value: string) => {
    setPin(value)
  }
  const onComplete = () => {
    if (invalid) setInvalid(false)
  }

  return children({
    invalid,
    onFormSubmit,
    onPinInputSubmit,
    onChange,
    onComplete
  })
}
