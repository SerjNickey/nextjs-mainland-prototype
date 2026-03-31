import styled from "styled-components";

export const Wrapper = styled.nav`
  width: auto;
  margin: 15px auto 0 auto;
  background: rgba(28, 28, 28, 0.45);
  border: 1px solid rgba(251, 251, 251, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  display: inline-flex;
  justify-content: center;
  padding: 0 9px;
`;

export const NavInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  flex-wrap: wrap;
  justify-content: center;
`;
