import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    width: 210px;
    padding: 64px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
export const MenuItem = styled.div<{ $isActive: boolean }>`
    width: 168px;
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    gap: 8px;
    align-items: center;
    background-color: ${(props) => (props.$isActive ? "#6a994e" : "#fff")};

    .menu-item-icon svg {
        fill: ${(props) => (props.$isActive ? "#fff" : "#6a994e")};
    }

    .menu-item-name {
        color: ${(props) => (props.$isActive ? "#fff" : "#6a994e")};
    }
`;
export const SubMenu = styled.div<{ $isActive: boolean }>`
    margin: 16px 16px 0px 38px;
    border-left: 1px solid #6a994e;
    padding-left: 8px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
export const MenuSubItem = styled.div<{ $isActive: boolean }>`
    width: max-content;
    padding: 10px 20px;
    border-radius: 10px;
    color: #528435;
    font-size: 16px;
    background-color: ${(props) => (props.$isActive ? "#E8F4E1" : "#fff")};
    font-weight: ${(props) => (props.$isActive ? 500 : 400)};
`;
