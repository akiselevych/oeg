import { styled } from "styled-components";

export const Container = styled.div`
display: flex;
align-items: center;
&:hover .submit{
    display: block;
}
input{
    width: 80%;
}
.submit{
    display: none;
    background-color: #6A994E;
    color:#fff;
    padding: 1px 4px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
}
`