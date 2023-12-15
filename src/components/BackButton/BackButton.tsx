import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "styles/global";


const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <PrimaryButton onClick={goBack}>
            Zurückgehen
        </PrimaryButton>
    );
};

export default BackButton;
