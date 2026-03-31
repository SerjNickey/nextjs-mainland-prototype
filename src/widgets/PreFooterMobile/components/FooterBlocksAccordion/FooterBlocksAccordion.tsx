import { useEffect, useState } from "react";
import Link from "next/link";
import * as S from "./FooterBlocksAccordion.styled";
import type { FooterBlock } from "../../types";
import {
  getBlockKey,
  informationTextToHtml,
  isInternalAppLink,
  urlToInternalPath,
} from "./helpers";

type FooterBlocksAccordionProps = {
  blocks: FooterBlock[];
  pathname: string;
};

const FooterBlocksAccordion = ({
  blocks,
  pathname,
}: FooterBlocksAccordionProps) => {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {}
  );
  const [docModal, setDocModal] = useState<{
    open: boolean;
    title: string;
    html: string;
  }>({ open: false, title: "", html: "" });

  useEffect(() => {
    if (!docModal.open) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [docModal.open]);

  const isAccordionOpen = (key: string): boolean => openAccordions[key] ?? false;
  const toggleAccordion = (key: string) =>
    setOpenAccordions((prev) => ({ ...prev, [key]: !(prev[key] ?? false) }));

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const lines = block.value?.lines ?? [];
        if (!block.value?.title && lines.length === 0) return null;
        const key = getBlockKey(block, blockIndex);
        const opened = isAccordionOpen(key);

        return (
          <S.AccordionCard key={key}>
            <S.AccordionHeader type="button" onClick={() => toggleAccordion(key)}>
              <span>{block.value?.title ?? "Section"}</span>
              <S.AccordionChevron $open={opened} aria-hidden>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </S.AccordionChevron>
            </S.AccordionHeader>
            <S.AccordionBody $open={opened}>
              <S.BlockList>
                {lines.map((line, i) => {
                  const title = String(line.title ?? "").trim();
                  const href = String(line.url ?? "").trim();
                  if (!title) return null;

                  if (block.type === "information") {
                    const html = informationTextToHtml(line.text);
                    if (html) {
                      return (
                        <S.LinkLine
                          as="button"
                          type="button"
                          key={i}
                          onClick={() => setDocModal({ open: true, title, html })}
                        >
                          {title}
                        </S.LinkLine>
                      );
                    }
                  }

                  if (block.type === "common" && href) {
                    if (isInternalAppLink(href)) {
                      const to = urlToInternalPath(href);
                      return (
                        <S.LinkLine
                          key={i}
                          as={Link}
                          href={to}
                          onClick={() => {
                            if (pathname === to) window.scrollTo(0, 0);
                          }}
                        >
                          {title}
                        </S.LinkLine>
                      );
                    }

                    return (
                      <S.LinkLine
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </S.LinkLine>
                    );
                  }

                  if (href) {
                    return (
                      <S.LinkLine
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </S.LinkLine>
                    );
                  }

                  return <S.LinkLine key={i}>{title}</S.LinkLine>;
                })}
              </S.BlockList>
            </S.AccordionBody>
          </S.AccordionCard>
        );
      })}
      <S.ModalOverlay
        $open={docModal.open}
        onClick={(e) =>
          e.target === e.currentTarget &&
          setDocModal({ open: false, title: "", html: "" })
        }
      >
        <S.ModalBox onClick={(e) => e.stopPropagation()}>
          <S.ModalHeader>
            <S.ModalTitle>{docModal.title}</S.ModalTitle>
            <S.ModalClose
              type="button"
              aria-label="Close"
              onClick={() => setDocModal({ open: false, title: "", html: "" })}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </S.ModalClose>
          </S.ModalHeader>
          <S.ModalBody dangerouslySetInnerHTML={{ __html: docModal.html }} />
        </S.ModalBox>
      </S.ModalOverlay>
    </>
  );
};

export default FooterBlocksAccordion;
