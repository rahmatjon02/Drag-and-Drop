import { Toaster } from "react-hot-toast";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import Column from "./components/Column";
import LineLayer from "./components/LineLayer";
import { leftItems, rightItems, correctPairs } from "./data/items";
import { Div, ButtonContainer, ActionButton } from "./styles/styles";

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
  } = useDragAndDrop(leftItems, rightItems, correctPairs);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (draggingItem) setMousePosition({ x: e.clientX, y: e.clientY });
      }}
    >
      <h1 style={{ textAlign: "center" }}>Игра «Соответствие технологий»</h1>
      <p style={{ textAlign: "center" }}>
        Перетаскивайте элементы из одного столбца в другой, чтобы создавать
        связи.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
          />

          <Column
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
      </div>

      <ButtonContainer>
        <ActionButton onClick={saveToLocalStorage}>Сохранить</ActionButton>
        <ActionButton onClick={loadFromLocalStorage}>Восстановить</ActionButton>
        <ActionButton onClick={clearPairs}>Очистить</ActionButton>
        <ActionButton style={{background: "red"}} onClick={clearLocalStorage}>
          Очистить навсегда
        </ActionButton>
      </ButtonContainer>
    </div>
  );
};

export default App;
