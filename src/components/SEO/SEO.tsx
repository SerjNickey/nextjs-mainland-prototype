import React, { useState } from "react";
import * as S from "./SEO.styled";
import arrow from "../../assets/images/PreFooter/arrow.webp";
import { MEDIA_ORIGIN } from "../../config/env";

/** Блок из API: параграф (HTML) или таблица. */
type SeoTextBlock =
  | { type: "paragraph"; value: string; id?: string }
  | {
      type: "table";
      value: {
        data: string[][];
        first_row_is_table_header?: boolean;
        first_col_is_header?: boolean;
      };
      id?: string;
    };

export type SEOData = {
  meta?: {
    seo_text_title?: string;
    seo_text_body?: SeoTextBlock[];
  };
};

interface ISEO {
  lang: string;
  data?: SEOData | null;
}

const DEFAULT_TITLE_EN = "PokerPlanets - Official Poker Room Website";
const DEFAULT_TITLE_RU = "PokerPlanets - Официальный Сайт Покер-Рума!";

/** Подставляет MEDIA_ORIGIN для относительных img src в HTML. */
const fixImageSrc = (html: string): string =>
  html.replace(
    /src="(\/media\/[^"]*)"/g,
    (_, path) => `src="${MEDIA_ORIGIN}${path}"`
  );

const SEO: React.FC<ISEO> = ({ lang, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const title =
    data?.meta?.seo_text_title?.trim() ||
    (lang === "ru" ? DEFAULT_TITLE_RU : DEFAULT_TITLE_EN);
  const body = data?.meta?.seo_text_body;

  return (
    <S.AboutBlock>
      <S.AboutTitle>{title}</S.AboutTitle>
      <S.AboutText $isOpen={isOpen}>
        {body && body.length > 0 ? (
          <S.AboutBody>
            {body.map((block, index) => {
              if (
                block.type === "paragraph" &&
                typeof block.value === "string"
              ) {
                return (
                  <S.AboutParagraph
                    key={block.id ?? `seo-p-${index}`}
                    dangerouslySetInnerHTML={{
                      __html: fixImageSrc(block.value),
                    }}
                  />
                );
              }
              if (block.type === "table" && block.value?.data) {
                const rows = block.value.data;
                const firstRowHeader =
                  block.value.first_row_is_table_header !== false;
                const firstColHeader = block.value.first_col_is_header === true;
                const [headRow, ...bodyRows] = firstRowHeader
                  ? [rows[0], ...rows.slice(1)]
                  : [null, ...rows];
                return (
                  <S.AboutTableWrapper key={block.id ?? `seo-t-${index}`}>
                    <table>
                      {headRow && (
                        <thead>
                          <tr>
                            {headRow.map((cell, ci) => (
                              <th
                                key={ci}
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {bodyRows.map((row, ri) => (
                          <tr key={ri}>
                            {row.map((cell, ci) => {
                              const isHead = firstColHeader && ci === 0;
                              const CellTag = isHead ? "th" : "td";
                              return (
                                <CellTag
                                  key={ci}
                                  dangerouslySetInnerHTML={{ __html: cell }}
                                />
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </S.AboutTableWrapper>
                );
              }
              return null;
            })}
          </S.AboutBody>
        ) : (
          <S.AboutPlaceholder>
            {lang === "ru"
              ? "Описание загружается..."
              : "Description is loading..."}
          </S.AboutPlaceholder>
        )}
      </S.AboutText>
      <S.AboutButton
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        aria-expanded={isOpen}
      >
        <img src={arrow} alt="" />
      </S.AboutButton>
    </S.AboutBlock>
  );
};

export default SEO;
