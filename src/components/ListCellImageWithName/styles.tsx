import styled from 'styled-components';

export const Container = styled.div`
    height: 21px;
    position: relative;
    .imageWrapper{
      position: relative;
      width: 21px;
        height: 21px;
        border-radius: 50%;
    }
    .image{
        width: 21px;
        height: 21px;
        border-radius: 50%;
        object-fit: cover;
    }
    .name{
        display: none;
        position: absolute;
        bottom: 100%;
        z-index: 100;
        background-color: #fff;
        padding: 4px;
        border-radius: 4px;
        font-weight: 400;
        border: 1px solid #000;
    }
    &:hover .name{
        display: block;
    }
`