import { PinInput, usePinInput } from '@ark-ui/react/pin-input'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const PIN_INPUT_FIELD_LENGTH = 4

export const Manual = ({
  onChange,
  invalid: parentInvalid,
  onSubmit,
  onComplete,
}: {
  onChange: (v: string) => void
  invalid: boolean  // 親側で認証に失敗したときとかに使う
  onSubmit: () => void
  onComplete: () => void  // 親側でのinvalidを解除したりする用
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
    placeholder: ''
  })
  const { value, clearValue } = pinInput

  useEffect(() => {
    if (parentInvalid) {
      clearValue()
      onComplete()
    }
  }, [onComplete, parentInvalid, clearValue])

  // React v19以降でも壊れないことを検証するためuseMemoで囲っとく
  const invalid = useMemo(() =>
    parentInvalid ||
    // 一度でも全フィールドが入力された後、いずれかのフィールドが1つでも空になったらinvalid扱い
    (isValueEverCompleted && value.filter(Boolean).length < PIN_INPUT_FIELD_LENGTH)
  , [parentInvalid, isValueEverCompleted, value])

  return (
    <PinInput.RootProvider
      value={pinInput}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSubmit()
        }
      }}
    >
      <PinInput.Label>認証コード</PinInput.Label>
      <PinInput.Control>
        {
          Array
            .from({ length: PIN_INPUT_FIELD_LENGTH }, (_, index) => index)
            .map((id, index) => (
              <StyledPinInput $invalid={invalid} key={id} index={index} />
            ))
        }
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.RootProvider>
  )
}


const StyledPinInput = styled(PinInput.Input)<{ $invalid: boolean }>`
  border: 1px solid
    ${({ $invalid }) =>
      $invalid ? 'red' : 'gray'};
  border-radius: 3px;
  font-size: 16px;
  text-align: center;
`
