import { Component, ErrorInfo, ReactNode } from "react";
import { Container } from "./styles";
import errorPicture from 'assets/icons/errorPicture.svg'

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <Container>
                <img src={errorPicture} alt="error" />
                <div className="textBlock">
                    <div className="errorTitle">Oops, something gone wrong!</div>
                    <div className="errorText">Please reload the page or try again later.</div>
                </div>
            </Container>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
