import { PinInput } from "@ark-ui/react";
import styled from "styled-components";

export const PinInputField = styled(PinInput.Input)<{ $invalid: boolean }>`
  width: 48px;
  padding: 10px 8px;
  border: 1px solid ${({ $invalid }) => $invalid ? 'red' : 'gray'};
  border-radius: 6px;
  text-align: center;
`
