import styled from "styled-components"

export const ToggleWrapper = styled.div`
  display: flex;
  margin: 0px 12px;
  justify-content: flex-end;
  margin-bottom: 12px;
  border-radius: 8px;
`

export const ToggleItem = styled.div`
  display: flex;
  background: var(--gray-400, #dedede);
	border-radius: 8px;
	`

export const ToggleButton = styled.button`
  padding: 10px;
	border-radius: 8px;
  color: var(--neutrals-black, #000);
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
	background-color: none;
  background: var(--gray-400, #dedede);

	&.active {
		color: var(--neutrals-white, #FFF);
		background: var(--green-primary-400, #6A994E);
	}
`
