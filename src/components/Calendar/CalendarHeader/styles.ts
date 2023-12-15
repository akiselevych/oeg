import { styled } from "styled-components"
import { CheckBox, SearchInput } from "styles/global"

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: rgba(243, 255, 242, 1);

  border: 1px solid rgba(228, 228, 228, 1);
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`

export const SearchWrapper = styled.div``

export const Search = styled(SearchInput)`
  background-size: 18px 18px;
  background-position: 16px 8px;
  max-width: 280px;

  &::placeholder {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }
`

export const FiltersWrapper = styled.div`
  display: flex;
  gap: 4px;
`

export const Checkbox = styled(CheckBox)`
  p {
    height: 37.5px;
  }
	input {
		border: none;
		font-family: Montserrat;
      
      &[type="date"]{
        width: 60%;
      }
	}

	.selectWrapper {
		max-height: 300px;
		overflow-y: auto;
	}

  .selectWrapper > input {
    color: rgba(74, 74, 74, 1);

    font-size: 12px;
    font-weight: 400;
    line-height: 20px;

    padding: 4px 0 4px 8px;
    border-bottom: 1px solid rgba(207, 207, 207, 1);
  }

  .dropdown {
    cursor: pointer;
    width: 32px;
    height: 16px;
    &:first-child {
      transform: rotate(90deg);
    }
    &:last-child {
      transform: rotate(270deg);
    }
  }
`

export const DatePickerWrapper = styled.div``
