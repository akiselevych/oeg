import React from 'react'
import { Container } from './styles';
import errorPicture from 'assets/icons/errorPicture.svg'


const ErrorMessage = () => {
    return (
        <Container>
            <img src={errorPicture} alt="error" />
            <div className="textBlock">
                <div className="errorTitle">Oops, something gone wrong!</div>
                <div className="errorText">Please reload the page or try again later.</div>
            </div>
        </Container>)
}

export default ErrorMessage