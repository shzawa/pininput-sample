import { usePinInput } from "@ark-ui/react"
import { useEffect, useMemo, useState } from "react"

export const usePinInputField = ({
  onChange,
  onComplete,
  invalid: _invalid,
  valueLength,
}: {
  onChange: (v: string) => void
  onComplete: () => void
  invalid: boolean
  valueLength: number
}) => {
  const [isValueEverCompleted, setIsValueEverCompleted] = useState(false)
  const pinInput = usePinInput({
    otp: true,
    onValueChange: (e) => onChange(e.valueAsString),
    onValueComplete: () => {
      onComplete()
      if (!isValueEverCompleted) {
        setIsValueEverCompleted(true)
      }
    },
    placeholder: '',
  })
  const { value, clearValue } = pinInput

  useEffect(() => {
    if (_invalid) {
      clearValue()
      onComplete()
    }
  }, [onComplete, _invalid, clearValue])

  const isCompleted = useMemo(() => value.filter(Boolean).length === valueLength, [value, valueLength])
  const invalid = _invalid || (isValueEverCompleted && !isCompleted)

  return {
    invalid,
    isCompleted,
    control: pinInput,
    valueLength,
  }
}
