import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 50px;
  position: relative;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemWrapper = styled.div<{
  $isHover: boolean;
  $isCorrect?: boolean | null;
  $isDragging?: boolean;
}>`
  width: 220px;
  padding: 12px 16px;
  border: 2px solid
    ${({ $isDragging, $isCorrect }) =>
      $isDragging
        ? "#28a745"
        : $isCorrect === true
        ? "#28a745"
        : $isCorrect === false
        ? "#dc3545"
        : "#333"};
  background: ${({ $isHover, $isCorrect }) =>
    $isCorrect === true
      ? "rgba(40, 167, 69, 0.15)"
      : $isCorrect === false
      ? "rgba(220, 53, 69, 0.15)"
      : $isHover
      ? "rgba(0,123,255,0.1)"
      : "white"};
  border-radius: 12px;
  user-select: none;
  font-weight: 500;
  font-size: 16px;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const SvgLayer = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const PathLine = styled.path<{ $isCorrect?: boolean | null }>`
  stroke: ${({ $isCorrect }) =>
    $isCorrect === true
      ? "#28a745"
      : $isCorrect === false
      ? "#dc3545"
      : "#6c757d"};
  stroke-width: 3;
  fill: none;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
  
  animation: drawLine 1s forwards;
  
  cursor: pointer;
  pointer-events: stroke;
  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

export const LineDot = styled.circle<{ $isCorrect?: boolean | null }>`
  fill: ${({ $isCorrect }) =>
    $isCorrect === true
      ? "#28a745"
      : $isCorrect === false
      ? "#dc3545"
      : "#6c757d"};
  stroke: white;
  stroke-width: 2;
  transition: fill 0.3s ease;
  cursor: pointer;
  pointer-events: all;
`;

export const DragLine = styled.path`
  stroke: green;
  stroke-width: 3;
  stroke-dasharray: 6, 6;
  fill: none;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 10px 18px;
  border: none;
  background: linear-gradient(135deg, #6c63ff, #007bff);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #5a54e8, #0062cc);
  }
`;

export const SpanMobile = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const SpanDesktop = styled.span`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Div = styled.div`
  display: flex;
  gap: 60px;
  position: relative;
  padding: 50px;
  background: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 30px;
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
  font-family: Rubik;
  font-weight: 900;
`;

export const Description = styled.p`
  font-family: Rubik;
  text-align: center;
  margin-bottom: 20px;
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`;
