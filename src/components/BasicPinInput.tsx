import { PinInput } from '@ark-ui/react/pin-input'
import { Stack } from './Stack'
import { Field, FieldRootProps } from '@ark-ui/react'
import { PinInputField } from './PinInputField'

// 公式サンプルほぼそのまま
// https://ark-ui.com/react/docs/components/pin-input#examples

export const BasicPinInput = ({
  valueLength,
  onChange,
  invalid: parentInvalid,
  fieldProps,
}: {
  valueLength: number
  onChange: (v: string) => void
  invalid: boolean
  fieldProps?: Omit<FieldRootProps, 'invalid'>
}) => {
  return (
    <Field.Root {...fieldProps} invalid={parentInvalid}>
      <PinInput.Root onValueComplete={(e) => onChange(e.valueAsString)} placeholder='' otp>
        <PinInput.Label>認証コード</PinInput.Label>
        <PinInput.Control>
          <Stack $direction='row' style={{ gap: 8 }}>
            {
              Array
                .from({ length: valueLength }, (_, index) => index)
                .map((id, index) => (
                  <PinInputField $invalid={parentInvalid} key={id} index={index} />
                ))
            }
          </Stack>
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.Root>
      <Field.ErrorText>認証コードが正しくないです</Field.ErrorText>
    </Field.Root>
  )
}
