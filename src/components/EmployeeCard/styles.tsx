import { styled } from "styled-components";

export const Container = styled.div`
    width: 268px;
    height: 276px;
    overflow: hidden;
    padding:24px ;
    border-radius: 12px;
    border: 1px solid #E1E1E1;
    background: #FFF;
    box-shadow: 0px 2px 23px 0px rgba(116, 120, 215, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: relative;
    .imageWrapper{
      width: 72px;
        height: 72px;
        background-color: grey;
        border-radius: 50%;
        position: relative;
    }
    .img {
        width: 72px;
        height: 72px;
        background-color: grey;
        border-radius: 50%;
        object-fit: cover;
    }
    .role {
        color: #606060;
        font-size: 14px;
        font-weight: 400;
    }
    .nameWrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:4px;
    }
    .name {
        width: 100%;
        overflow: hidden;
        &:hover{
            overflow: auto;
        }
        white-space: nowrap;
        font-size: 20px;
        font-weight: 500;
    }
    .additionalDataWrapper {
        width: 100%;
       display: flex;
       justify-content: center;
       gap:16px;
       align-items: center;
    }
    .additionalDataItem {
        display: flex;
        align-items: center;
        gap:7px;
    }
    .iconWrapper {
        padding: 4px;
        background-color: #E0FBCA;
        border-radius: 4px;
        border: 1px solid #9ABE85;
    }
    .jobType, .wage {
        color:  #528435;
        font-size: 12px;
        font-weight: 500;
    }
    .bottomContainer{
        display: flex;
        flex-direction: column;
        gap:12px;
        width: 220px;
    }
    .phoneWrapper {
        display: flex;
        align-items: center;
        gap:9px;
        width: 220px;
    }
    .phone, .email{
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        overflow: hidden;
        &:hover{
            overflow: auto;
        }
        white-space: nowrap;
    }
    .edit{
        position: absolute;
        top: 10px;
        right: 10px;
        width: max-content;
        padding: 4px 8px;
        border-radius: 16px;
        border: 1px solid #6A994E;
        color: #6A994E;
        cursor: pointer;
    }

`