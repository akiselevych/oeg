import { styled } from "styled-components"
export const Container = styled.div`
    padding: 32px 0;
    .btnStatus{
             width: 110px;
            };
    .documentsBlock{
        display: flex;
        flex-direction: column;
        gap: 16px;
        .blockTitle{
            font-size: 20px;
            font-weight: 500;
        }
    }
    .documentsList{
        background-color: white;
        border-radius: 12px;
        border: 1px solid #D9D9D9;
        width: 100%;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .document{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name{
                padding: 8px 10px;
                display: flex;
                align-items: center;
                gap:8px;
                border-radius: 12px;
                border: 1px solid rgba(106, 153, 78, 0.40);
                width: 240px;
                text-transform: none;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                .nameValue{
                  overflow: auto;
                white-space: nowrap;
                }
               
            }
            .btnContainer{
                display: flex;
                gap:8px;
            }
        }
    }

    .statisticBlock{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .statisticCards {
        display: flex;
        justify-content: space-between;
        gap: 16px
    }
    .blockTitle {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 36px;
            padding: 8px 0;
            border-bottom: 1px solid #C2C2C2;
    }
    .card {
        padding: 20px 12px;
        border-radius: 10px;
        border: 1px solid #D9D9D9;
        box-sizing: border-box;
        width: 242px;
        display: flex;
        justify-content: space-between;
        background-color: white;
    }
    .textBlock {
        display: flex;
        flex-direction: column;
    }
    .name {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: none;
    }
    .revenue {
        color: #084D9F;
    }
    .expenditures{
        color: #CA0202;
    }
    .profit{
        color: #42821C;
    }
    .total {
        color: #7E7E7E;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .value {
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

`