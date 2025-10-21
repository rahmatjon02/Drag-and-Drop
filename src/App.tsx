import { Toaster } from "react-hot-toast";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import Column from "./components/Column";
import LineLayer from "./components/LineLayer";
import { leftItems, rightItems, correctPairs } from "./data/items";
import {
  Div,
  ButtonContainer,
  ActionButton,
  SpanMobile,
  SpanDesktop,
  Title,
  Description,
  CenteredDiv,
} from "./styles/styles";
import { Download, RotateCcw, Save, Trash2 } from "lucide-react";

const App = () => {
  const {
    draggingItem,
    hoverItem,
    mousePosition,
    pairs,
    leftRefs,
    rightRefs,
    setHoverItem,
    setMousePosition,
    handleDragStart,
    handleDrop,
    resetDrag,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    clearPairs,
    removePair,
  } = useDragAndDrop(leftItems, rightItems, correctPairs);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (draggingItem) setMousePosition({ x: e.clientX, y: e.clientY });
      }}
    >
      <Title>Игра «Соответствие технологий»</Title>
      <Description>
        Перетаскивайте элементы из одного столбца в другой, чтобы создавать
        связи.
      </Description>
      <CenteredDiv>
        <Div>
          <Toaster position="top-right" />
          <LineLayer
            pairs={pairs}
            leftItems={leftItems}
            rightItems={rightItems}
            leftRefs={leftRefs}
            rightRefs={rightRefs}
            draggingItem={draggingItem}
            mousePosition={mousePosition}
            removePair={removePair}
          />

          <Column
            draggingItem={draggingItem}
            items={leftItems}
            hoverItem={hoverItem}
            onDragStart={handleDragStart}
            onDragEnd={resetDrag}
            onDrop={handleDrop}
            onDragEnter={setHoverItem}
            onDragLeave={() => setHoverItem(null)}
            refs={leftRefs}
            pairs={pairs}
          />

          <Column
            draggingItem={draggingItem}
            items={rightItems}
            hoverItem={hoverItem}
            onDragStart={handleDragStart}
            onDragEnd={resetDrag}
            onDrop={handleDrop}
            onDragEnter={setHoverItem}
            onDragLeave={() => setHoverItem(null)}
            refs={rightRefs}
            pairs={pairs}
          />
        </Div>
      </CenteredDiv>

      <ButtonContainer>
        <ActionButton onClick={saveToLocalStorage}>
          <Save />
          <SpanMobile>Сохранить</SpanMobile>
          <SpanDesktop>Сохранить в память</SpanDesktop>
        </ActionButton>

        <ActionButton onClick={loadFromLocalStorage}>
          <Download />
          <SpanMobile>Восстановить</SpanMobile>
          <SpanDesktop>Восстановить из память</SpanDesktop>
        </ActionButton>

        <ActionButton onClick={clearPairs}>
          <RotateCcw />
          <SpanMobile>Cбросить</SpanMobile>
          <SpanDesktop>Cбросить</SpanDesktop>
        </ActionButton>

        <ActionButton style={{ background: "red" }} onClick={clearLocalStorage}>
          <Trash2 />
          <SpanMobile>Очистить</SpanMobile>
          <SpanDesktop>Очистить из память</SpanDesktop>
        </ActionButton>
      </ButtonContainer>
    </div>
  );
};

export default App;
