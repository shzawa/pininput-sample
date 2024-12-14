import { PinInput } from '@ark-ui/react/pin-input'

export const Basic = () => {
  // const pininput = usePinInput()
  // pininput.valueAsString
  return (
    <PinInput.Root>
      <PinInput.Label>Label</PinInput.Label>
      <PinInput.Control>
        {[0, 1, 2].map((id, index) => (
          <PinInput.Input key={id} index={index} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput.Root>
  )
}
