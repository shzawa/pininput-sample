import "./reset.css"
import "./index.css"
import { Manual } from "./components/Manual";
import { FormEvent, useState } from "react";

export default function App() {
  const [pin, setPin] = useState('')
  const [invalid, setInvalid] = useState(false)

  const submit = () => {
    setInvalid(true)  // 検証のため絶対失敗させてる
    console.log(pin)
  }
  const handleFormSubmit = (e: FormEvent<Element>) => {
    e.preventDefault()
    submit()
  }
  const handlePinInputSubmit = () => {
    submit()
  }

  return (
      <>
        <form onSubmit={handleFormSubmit}>
          <Manual
            onSubmit={handlePinInputSubmit}
            onChange={setPin}
            invalid={invalid}
            onComplete={() => {
              if (invalid) setInvalid(false)
            }}
          />
          <button type="submit">登録</button>
        </form>
      </>
  )
}
