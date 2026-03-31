import Marquee from "react-fast-marquee";
import * as S from "./RunningLineBlock.styled";
import type { RunningLineItem } from "../../types";
import { normalizeUrl } from "./helpers";

type RunningLineBlockProps = {
  items: Array<RunningLineItem & { _displayKey?: string }>;
};

const RunningLineBlock = ({ items }: RunningLineBlockProps) => {
  if (items.length === 0) return null;

  return (
    <S.RunningLineSection>
      <Marquee speed={60} gradient={false} pauseOnHover={false}>
        {items.map((item) => (
          <S.RunningLineItem
            key={"_displayKey" in item && item._displayKey ? item._displayKey : item.id}
          >
            {item.type === "running_line_image" && item.value?.file && (
              <S.RunningLineImage src={normalizeUrl(item.value.file)} alt="" />
            )}
            {item.type === "running_line_text" && (
              <S.RunningLineText>{String(item.value)}</S.RunningLineText>
            )}
          </S.RunningLineItem>
        ))}
      </Marquee>
    </S.RunningLineSection>
  );
};

export default RunningLineBlock;
