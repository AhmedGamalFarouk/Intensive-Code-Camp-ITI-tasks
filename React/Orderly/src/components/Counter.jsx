import { createContext, useContext, useState } from "react";
import { MinusIcon, PlusIcon } from "../assets/icons";
import { setQuantity } from "../features/slices/singlemenu";
import { useDispatch } from "react-redux";
const CounterContext = createContext();

function Counter({ children, ind }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const increment = () => {
    dispatch(setQuantity({ ind: ind, quantity: count + 1 }));
    setCount((count) => count + 1);
  };
  const decrement = () => {
    if (count == 0) return;
    dispatch(setQuantity({ ind: ind, quantity: count - 1 }));
    setCount((count) => count - 1);
  };

  return (
    <CounterContext.Provider value={{ increment, decrement, count }}>
      <div className="flex items-center select-none w-fit rounded-full overflow-hidden border border-base-200">
        {children}
      </div>
    </CounterContext.Provider>
  );
}

function Increment() {
  const { increment } = useContext(CounterContext);
  return (
    <button
      onClick={() => increment()}
      className="bg-primary text-primary-content size-8 flex items-center justify-center cursor-pointer hover:bg-primary-focus transition-colors duration-200"
    >
      <PlusIcon className="w-4 h-4" />
    </button>
  );
}
function Decrement() {
  const { decrement } = useContext(CounterContext);

  return (
    <button
      onClick={() => decrement()}
      className="bg-primary text-primary-content size-8 flex items-center justify-center cursor-pointer hover:bg-primary-focus transition-colors duration-200"
    >
      <MinusIcon className="w-4 h-4" />
    </button>
  );
}
function Count() {
  const { count } = useContext(CounterContext);
  return (
    <div className="bg-base-100 text-base-content font-body text-lg text-center w-10 flex items-center justify-center">
      {count}
    </div>
  );
}
Counter.Increment = Increment;
Counter.Decrement = Decrement;
Counter.Count = Count;

export default Counter;
