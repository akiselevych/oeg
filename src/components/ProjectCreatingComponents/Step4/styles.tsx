import { styled } from "styled-components"
import { PrimaryButton } from "styles/global";
export const Container = styled.div`
    .tableBlock {
        padding: 32px 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
        .tableTitle {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
        .btnStatus{
             width: 110px;
            };
    .invoiceBlock {
        display: flex;
        align-items: center;
        gap:16px;
        .invoice {
            width: 208px;
            border-radius: 12px;
            border: 1px solid rgba(106, 153, 78, 0.40);
            background: #FFF;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            .nameValue{
                  overflow: auto;
                white-space: nowrap;
                }
        }
        .btnGroup {
            display: flex;
            gap: 8px;

        }
    }
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EventButton = styled(PrimaryButton)`
`;