//libs
import moment from "moment"
import { FC, useState } from "react"
import { AppDispatch, EventType } from "types"
//styles
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { fetchEventByID, setIsEdit } from "reduxFolder/slices/EventsSlice"


export const eventIndicatorColor = {
  geplant: "var(--blue-400, #21879F)",
  abgeschlossen: " var(--yellow-200, #EDE52B)",
  inarbeit: "var(--green-primary-400, #6A994E)",
}
const eventBGColor = {
  geplant: "var(--blue-100, #CAF2FB)",
  abgeschlossen: "var(--yellow-100, #FFFDCB)",
  inarbeit: "var(--green-200, #E0FBCA)",
}
const eventColor = {
  geplant: "var(--blue-500, #084D9F)",
  abgeschlossen: "var(--yellow-300, #C1B909)",
  inarbeit: "var(--green-600, #386641)",
}

type PropsType = EventType & { topPosition: number; status: string }

const CalendarEvent: FC<PropsType> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const dateDifference =
    moment(props.end_date).diff(moment(props.start_date), "days") + 1

  const [isHover, setIsHover] = useState(false)

  function handleHover(isEnter: boolean) {
    if (dateDifference > 1) return

    if (isEnter) {
      setIsHover(true)
    } else {
      setIsHover(false)
    }
  }

  return (
    <>
      <EventWrapper
        className="qq"
        $Width={dateDifference}
        $Top={props.topPosition}
        onClick={() => {
          dispatch(setIsEdit(true))
          dispatch(fetchEventByID(props.id))
        }}
        onMouseEnter={() => handleHover(true)}
      >
        <Indicator
          $BGColor={
            eventIndicatorColor[
            props.status
              .toLocaleLowerCase()
              .replace(/\s+/g, "") as keyof typeof eventIndicatorColor
            ]
          }
        />
        <Content>
          <Title>{props.name}</Title>
          <AdditionalInfo>
            <Status
              $BGColor={
                eventBGColor[
                props.status
                  .toLocaleLowerCase()
                  .replace(/\s+/g, "") as keyof typeof eventColor
                ]
              }
              $Color={
                eventColor[
                props.status
                  .toLocaleLowerCase()
                  .replace(/\s+/g, "") as keyof typeof eventColor
                ]
              }
            >
              {props.status}
            </Status>
            <Date>
              {`${moment(props.start_date)
                .format("MMM D")
                .replace(".", "")} - ${moment(props.end_date)
                  .format("MMM D")
                  .replace(".", "")}`}
            </Date>
          </AdditionalInfo>
        </Content>
      </EventWrapper>

      {isHover && (
        <HoverEventWrapper
          className="qq"
          $Width={2}
          $Top={props.topPosition}
          onClick={() => {
            dispatch(setIsEdit(true))
            dispatch(fetchEventByID(props.id))
          }}
          onMouseLeave={() => handleHover(false)}
        >
          <Indicator
            $BGColor={
              eventIndicatorColor[
              props.status
                .toLocaleLowerCase()
                .replace(/\s+/g, "") as keyof typeof eventIndicatorColor
              ]
            }
          />
          <Content>
            <Title>{props.name}</Title>
            <AdditionalInfo>
              <Status
                $BGColor={
                  eventBGColor[
                  props.status
                    .toLocaleLowerCase()
                    .replace(/\s+/g, "") as keyof typeof eventColor
                  ]
                }
                $Color={
                  eventColor[
                  props.status
                    .toLocaleLowerCase()
                    .replace(/\s+/g, "") as keyof typeof eventColor
                  ]
                }
              >
                {props.status}
              </Status>
              <Date>
                {`${moment(props.start_date)
                  .format("MMM D")
                  .replace(".", "")} - ${moment(props.end_date)
                    .format("MMM D")
                    .replace(".", "")}`}
              </Date>
            </AdditionalInfo>
          </Content>
        </HoverEventWrapper>
      )}
    </>
  )
}

export default CalendarEvent

const EventWrapper = styled.div<{ $Width: number; $Top: number }>`
  --clampValue: clamp(5.063rem, -2.625rem + 10.25vw, 10.188rem);

  position: absolute;
  top: ${({ $Top }) => $Top}px;
  min-width: var(--clampValue);
  width: calc(
    (var(--clampValue) * ${({ $Width }) => $Width}) +
      ${({ $Width }) => ($Width - 1) * 20}px
  );
  display: flex;
  gap: 8px;

  padding: 16px 20px 16px 8px;
  border-radius: 12px;
  background: var(--neutrals-white, #fff);
  overflow: hidden;
  z-index: 10;
	border: 1px solid;
	border-color: transparent;
`
const HoverEventWrapper = styled(EventWrapper)`
  z-index: 20;
	border-color: #000;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`
const Indicator = styled.div<{ $BGColor: string }>`
  width: 4px;
  height: 61px;
  border-radius: 32px;
  flex-shrink: 0;
  background-color: ${({ $BGColor }) => $BGColor || "var(--neutrals-black, #000)"};
`

const Title = styled.h2`
  width: 100%;
  color: var(--neutrals-black, #000);
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  white-space: nowrap;
`
const AdditionalInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`
const Status = styled.div<{ $BGColor: string; $Color: string }>`
  color: ${({ $Color }) => $Color};
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 4px 8px;
  border-radius: 16px;
  background-color: ${({ $BGColor }) => $BGColor};
  white-space: nowrap;
`
const Date = styled.div`
  color: var(--gray-500, #acacac);
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  padding: 4px 0px;
`
