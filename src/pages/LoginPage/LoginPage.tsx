//libs
import {FC} from "react";
//components
import LoginForm from "components/LoginFormComp/LoginFormComp";
//styles
import {Container, LeftSide, LoginFormWrapper, LogoText, LogoWrapper, RightSide} from "pages/LoginPage/styles";
//images
import {ReactComponent as LaptopIcon2} from 'assets/icons/laptop2.svg';
import {ReactComponent as SunIcon} from 'assets/icons/sun.svg';
import {ReactComponent as LinesIcon} from 'assets/icons/lines.svg';
import logo from "assets/icons/logo.svg";
const LoginPage: FC = () => {
  return(
      <Container>
          <LeftSide>
              <LogoWrapper>
                  <img src={logo} alt="dropdown" />
                  <LogoText>
                      <span className="bold">Ökumenische</span> <br/> Energiegenossenschaft
                  </LogoText>
              </LogoWrapper>
              <LoginFormWrapper>
                  <LoginForm/>
              </LoginFormWrapper>
          </LeftSide>
          <RightSide>
              <LaptopIcon2 className="laptop"/>
              <SunIcon className="sun"/>
              <LinesIcon className="lines"/>
          </RightSide>
      </Container>
  )
}

export default LoginPage;