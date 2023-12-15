import { styled } from "styled-components"
export const Container = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    min-width: 780px;
    .spiner{
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
    .tableWrapper{
        display: flex;
        flex-direction: column;
        gap:16px;
        .download{
            align-self: flex-end;
        }
    }
    .projectPicker {
        width: 318px;
        padding: 12px 24px;;
        border-radius: 12px;
        border: 1px solid #DEDEDE;
        background: #FFF;
    }
    .header {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .titleWrapper {
        display: flex;
        justify-content: space-between;
    }
    .projectPickerTitle {
        font-size: 24px;
        font-weight: 600;
        line-height: 28px; 
    }
    .projectSearch{
        border-radius: 10px;
        border: 1px solid  #E9E9E9;
        background:  #F5F5F5;
        padding: 10px 16px;
    }
    .main{
        display: flex;
        flex-direction: column;
    }
    .project{
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap:8px;
        border-bottom: 1px solid #DEDEDE;
    }
    .nameAndStatus{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap:8px;
    }
    .projectName{
        font-size: 16px;
        font-weight: 500;
        line-height: 20px;
    }
`
export const Span = styled.span<{ $name?: string }>`
        background-color: ${({ $name }) => {
        switch ($name) {
            case "Unpaid":
                return "#FFE5E6";
            case "Paid":
                return "#E0FBCA";
            case "Partly paid":
                return "#FFFDCB";
            default:
                return "none";
        }
    }};
    color: ${({ $name }) => {
        switch ($name) {
            case "Unpaid":
                return "#CA0202";
            case "Paid":
                return "#386641";
            case "Partly paid":
                return "#C1B909";
            default:
                return "none";
        }
    }};
    border-radius: ${({ $name }) => $name ? "16px" : "none"};
    padding: ${({ $name }) => $name ? "4px 8px" : "none"};

`