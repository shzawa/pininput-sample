import "./reset.css"
import "./index.css"
import { PinInput } from "./components/PinInput";
import { Stack } from "./components/Stack";
import { BasicPinInput } from "./components/BasicPinInput";
import { FormProvider } from "./FormProvider";
import { Button } from "./components/Button";

export default function App() {
  return (
    <>
      <div>
        <p>サンプルほぼそのまま</p>
        <FormProvider>
          {({ invalid, onChange, onFormSubmit }) => (
            <form onSubmit={onFormSubmit}>
              <Stack $justifyContent="center" $alignItems="center" style={{ gap: 8 }}>
                <BasicPinInput onChange={onChange} invalid={invalid} />
                <Button type="submit">認証</Button>
              </Stack>
            </form>
          )}
        </FormProvider>
      </div>
      <div>
        <p>改変版</p>
        <FormProvider>
          {({ invalid, onChange, onComplete, onFormSubmit, onPinInputSubmit }) => (
            <form onSubmit={onFormSubmit}>
              <Stack $justifyContent="center" $alignItems="center" style={{ gap: 8 }}>
                <PinInput
                  onSubmit={onPinInputSubmit}
                  onChange={onChange}
                  invalid={invalid}
                  onComplete={onComplete}
                  />
                <Button type="submit" disabled={invalid}>認証</Button>
              </Stack>
            </form>
          )}
        </FormProvider>
      </div>
    </>
  )
}
