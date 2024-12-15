import "./reset.css"
import "./index.css"
import { PinInput } from "./components/PinInput";
import { Stack } from "./components/Stack";
import { FormProvider } from "./FormProvider";
import { Button } from "./components/Button";

const PIN_INPUT_FIELD_LENGTH = 4

export default function App() {
  return (
    <>
      <div>
        <p>改変版</p>
        <FormProvider pinLength={PIN_INPUT_FIELD_LENGTH}>
          {({ isSubmitButtonDisabled, pinInputFieldProps, onSubmit }) => (
            <form onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}>
              <Stack $justifyContent="center" $alignItems="center" style={{ gap: 8 }}>
                <PinInput
                  {...pinInputFieldProps}
                  onSubmit={onSubmit}
                />
                <Button type="submit" disabled={isSubmitButtonDisabled}>認証</Button>
              </Stack>
            </form>
          )}
        </FormProvider>
      </div>
    </>
  )
}
