import { PinInput as ArkUIPinInput, UsePinInputReturn } from '@ark-ui/react/pin-input'
import { Stack } from './Stack'
import { Field, FieldRootProps } from '@ark-ui/react'
import { PinInputField } from './PinInputField'

export const PinInput = ({
  control,
  valueLength,
  invalid,
  onSubmit,
  fieldProps,
  isCompleted,
}: {
  valueLength: number
  invalid: boolean
  onSubmit: () => void
  fieldProps?: Omit<FieldRootProps, 'invalid'>
  isCompleted: boolean
  control: UsePinInputReturn
}) => {
  return (
    <Field.Root {...fieldProps} invalid={invalid}>
      <ArkUIPinInput.RootProvider
        value={control}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isCompleted) {
            onSubmit()
          }
        }}
      >
        <ArkUIPinInput.Label>認証コード</ArkUIPinInput.Label>
        <ArkUIPinInput.Control>
          <Stack $direction='row' style={{ gap: 8 }}>
          {
            Array
              .from({ length: valueLength }, (_, index) => index)
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
