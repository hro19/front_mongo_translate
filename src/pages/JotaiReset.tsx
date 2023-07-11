import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

const count1Atom = atom(1);
const count2Atom = atomWithReset(10);

const Counter = () => {
  const [count2, setCount2] = useAtom(count2Atom);
  const resetCount2 = useResetAtom(count2Atom);

  return (
    <div>
      <div>count1: {useAtomValue(count1Atom)}</div>
      <div>count2: {count2}</div>
      <button className="btn btn-primary" onClick={() => setCount2((c) => c + 1)}>
        +1
      </button>
      <button className="btn btn-secondary" onClick={resetCount2}>
        reset
      </button>
    </div>
  );
};

export default Counter;