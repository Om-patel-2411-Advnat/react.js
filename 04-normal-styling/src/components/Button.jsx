import { styled } from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border-radius: 6px;
  border: none;

  &:hover {
  background-color: #f0920e;
  }
`
// if you add space after the ( & ) in hover effect then the styling will be applied to the children and if you nat give space as we did above than styling will be applied on the button

export default Button;