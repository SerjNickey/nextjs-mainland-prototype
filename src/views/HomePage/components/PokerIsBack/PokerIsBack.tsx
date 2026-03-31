import * as S from "./PokerIsBack.styled";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import RegistrationForm from "../../../../widgets/RegistrationForm/RegistrationForm";

interface IPokerIsBack {
    backSrc: string;
}

const PokerIsBack: React.FC<IPokerIsBack> = ({ backSrc }) => {
    const { yourLang } = useSelector((state: RootState) => state.registration);
    return (
        <S.Wrapper>
            {backSrc ? <img src={backSrc} alt="Poker Is Back" /> : null}
            <S.ButtonWrapper>
                <RegistrationForm
                    btnText={yourLang === "ru" ? "Скачать и играть" : "Download app"}
                />
            </S.ButtonWrapper>
        </S.Wrapper>
    );
};

export default PokerIsBack;
