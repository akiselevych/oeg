import { Container } from "./styles"
import BackButton from "components/BackButton/BackButton"
import errorImage from 'assets/images/044image.jpg'
import Header from "components/Header/Header"

const ErrorPage = () => {
    return (
        <>
            <Header />
            <Container>
                <img src={errorImage} alt="044 error" />
                <div className="textwrapp">
                    <p className="title">Ups, da ist etwas schief gelaufen!</p>
                    <p className="descr">Wir schlagen vor, dass Sie zum Dashboard zurückkehren, während wir das Problem beheben.</p>
                </div>
                <BackButton />
            </Container></>
    )
}

export default ErrorPage