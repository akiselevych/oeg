import { styled } from "styled-components";

export const Ul = styled.ul<{ $listType: string }>`
    width: max-content;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: auto;
    background-color: #fff;
    border: ${({ $listType }) =>
        $listType === "Upcoming events" ? "none" : "1px solid #ccc"};
    .empty {
        width: 100%;
        padding: 30px 0;
        text-align: center;
        font-size: 24px;
        color: #dedede;
    }
    .addInventory {
        margin: 0 auto;
        width: 300px;
        padding: 30px 30px;
        text-align: center;
        span {
            font-weight: 800;
        }
        .link {
            color: #6a994e;
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 20px;
            text-decoration-line: underline;
        }
    }
`;
export const TitleLi = styled.li<{ $listType: string }>`
    display: flex;
    color: #0d0d0d;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid #cccccc;
    border-radius: 12px 12px 0 0;
    background-color: ${({ $listType }) => {
        switch ($listType) {
            case "Upcoming events":
                return "#F5F5F5";
            case "project:products":
                return "#F5F5F5";
            case "project:Materials delivery plan":
                return "#F5F5F5";
            case "clients":
                return "#F3FFF2";
            case "ProjectEventsTable":
                return "#F3FFF2";
            case "suppliers":
                return "#F3FFF2";
            case "projects":
                return "#F3FFF2";
            case "ProjectСonstructionTable":
                return "#F3FFF2";
            case "ProjectInternalExpensesTable":
                return "#F3FFF2";
            case "inventory":
                return "#F3FFF2";
            case "monthlyOverview":
                return "#F3FFF2";
            case "transactions":
                return "#F3FFF2";
            case "internalExpenses":
                return "#F3FFF2";
            case "acrossProjects":
                return "#F3FFF2";
            case "invoices":
                return "#F3FFF2";
            case "PickArticleTable":
                return "#F3FFF2";
            case "projectInvoices":
                return "#F3FFF2";
            case "WorkersProjectTimeOverviewTable":
                return "#F3FFF2";
            default:
                return "#fff";
        }
    }};
`;
export const Li = styled.li<{ $bg?: boolean }>`
    display: flex;
    border-bottom: 1px solid #cccccc;
    background-color: ${({ $bg }) => ($bg ? "#F3FFF2" : "#fff")};
`;
