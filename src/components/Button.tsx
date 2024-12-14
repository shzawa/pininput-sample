import styled from "styled-components";

export const Button = styled.button`
  min-width: 100px;
  font-family: inherit;
  appearance: none;
  border: 0;
  border-radius: 5px;
  background: #4676d7;
  color: #fff;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #1d49aa;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #cbd6ee;
  }
`
