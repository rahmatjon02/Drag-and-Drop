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
}>`
  width: 220px;
  padding: 12px 16px;
  border: 2px solid
    ${({ $isCorrect }) =>
      $isCorrect === true
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
  cursor: grab;
  user-select: none;
  font-weight: 500;
  font-size: 16px;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease;

  &:hover {
    transform: scale(1.05);
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
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
`;

export const DragLine = styled.path`
  stroke: #007bff;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #5a54e8, #0062cc);
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
`;
