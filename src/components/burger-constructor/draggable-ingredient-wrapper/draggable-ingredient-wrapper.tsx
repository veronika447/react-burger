import styles from "./draggable-ingredient-wrapper.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { sortIngredients } from "../../../services/burger-constructor-slice";
import type { XYCoord } from "react-dnd";
import type { FC, ReactNode } from "react";
import { useAppDispatch } from "../../app/hooks";

type Props = {
  id: string;
  index: number;
  children: ReactNode;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

export const DraggableIngredientWrapper: FC<Props> = ({
  children,
  id,
  index,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "sortElement",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop<DragItem>({
    accept: "sortElement",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(
        sortIngredients({ dragIndex: dragIndex, hoverIndex: hoverIndex })
      );
      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li
      className={styles.listFillingItem}
      style={{ opacity: opacity }}
      ref={ref}
      draggable
    >
      {children}
    </li>
  );
};
