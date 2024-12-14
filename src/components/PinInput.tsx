import { PinInput as ArkUIPinInput, usePinInput } from '@ark-ui/react/pin-input'
import { useEffect, useMemo, useState } from 'react'
import { Stack } from './Stack'
import { Field, FieldRootProps } from '@ark-ui/react'
import { PinInputField } from './PinInputField'

const PIN_INPUT_FIELD_LENGTH = 4

export const PinInput = ({
  onChange,
  invalid: parentInvalid,
  onSubmit,
  onComplete,
  fieldProps,
}: {
  onChange: (v: string) => void
  invalid: boolean  // 親側で認証に失敗したときとかに使う
  onSubmit: () => void
  onComplete: () => void  // 親側でのinvalidを解除したりする用
  fieldProps?: Omit<FieldRootProps, 'invalid'>
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
  const invalid = useMemo(() => (
    parentInvalid ||
    // 一度でも全フィールドが入力されていて、いずれかのフィールドが空になったらinvalid扱い
    (isValueEverCompleted && value.filter(Boolean).length < PIN_INPUT_FIELD_LENGTH)
  ), [parentInvalid, isValueEverCompleted, value])

  return (
    <Field.Root {...fieldProps} invalid={invalid}>
      <ArkUIPinInput.RootProvider
        value={pinInput}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !invalid) {
            onSubmit()
          }
        }}
      >
        <ArkUIPinInput.Label>認証コード</ArkUIPinInput.Label>
        <ArkUIPinInput.Control>
          <Stack $direction='row' style={{ gap: 8 }}>
          {
            Array
              .from({ length: PIN_INPUT_FIELD_LENGTH }, (_, index) => index)
              .map((id, index) => (
                <PinInputField $invalid={invalid} key={id} index={index} />
              ))
          }
          </Stack>
        </ArkUIPinInput.Control>
        <ArkUIPinInput.HiddenInput />
      </ArkUIPinInput.RootProvider>
      <Field.ErrorText>認証コードが正しくないです</Field.ErrorText>
    </Field.Root>
  )
}
