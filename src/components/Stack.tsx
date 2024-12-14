import styled from "styled-components";

export const Stack = styled.div<{
  $direction?: 'row' | 'column';
  $alignItems?: string;
  $justifyContent?: string;
}>`
  display: flex;
  flex-direction: ${props => props.$direction || 'column'};
  align-items: ${props => props.$alignItems || 'flex-start'};
  justify-content: ${props => props.$justifyContent || 'flex-start'};
`;
