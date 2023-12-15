import styled from "styled-components"

export const CalendarGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1px;

  border-radius: 10px;
  aspect-ratio: 1.6;
  border: 1px solid var(--gray-5, #e0e0e0);
  border-top: none;
  background-color: #e0e0e0;

  .day {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 8px 4px;
    box-sizing: border-box;
    background-color: #fff;

    span {
      display: flex;
      min-width: 16px;
      border-radius: 50px;
      padding: 4px 4px;
    }

    &:nth-child(36) {
      border-bottom-left-radius: 10px;
    }
    &:nth-child(42) {
      border-bottom-right-radius: 10px;
    }
  }

  .notCurrentMonth {
    color: var(--grey-80, #bdbdbd);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .today {
    color: #fff;
    background-color: #6a994e;
  }

  .dayOfWeek {
		width: 100%;
		text-align: center;
  }

  .events {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    height: clamp(5rem, -2.5rem + 10vw, 7.5rem);
    overflow-y: auto;

    .event {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      border-radius: 8px;
      background: var(--gray-100, #f5f5f5);
      box-sizing: border-box;
      padding: 1px 8px;
      color: var(--neutrals-black, #000);
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      
      .field {
        line-break: anywhere;
        overflow: hidden;
        text-overflow: fade;
      }

      .bar {
        width: 1px;
        height: 14px;
        background-color: #000;
      }
    }
  }
`
