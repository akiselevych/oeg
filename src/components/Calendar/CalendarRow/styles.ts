import { styled } from "styled-components"

export const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  background-color: rgba(245, 245, 245, 1);
  overflow: hidden;
  overflow-y: auto;
	height: 580px;
`

export const DayEventsWrapper = styled.div<{ $additionalHeight: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  height: calc(580px + ${({ $additionalHeight }) => $additionalHeight}px - 62px);
  margin-right: 10px;
  margin-left: 10px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: calc(50% - 0.5px);
    width: 1px;
    height: 100%;
    background-color: rgba(197, 197, 197, 1);
    z-index: 0;
  }
`

export const DayEvent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 80px;

	&:hover {
		z-index: 11;
	}

  position: absolute;
  top: 20px;
`

export const Day = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  background-color: transparent;

  .day-wrapper {
    text-align: center;
    background-color: white;
    padding: 12px;
  }

  span {
    cursor: default;
    border-radius: 12px;
    text-align: center;

    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  .today {
    background: rgba(106, 153, 78, 1);
    color: #fff;
    padding: 8px 12px;
  }
`
