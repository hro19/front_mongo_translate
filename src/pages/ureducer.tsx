import React,{useReducer} from 'react'

const ureducer = () => {
    const initialState = { count: 0 };

    const reducer = (state:any, action:any) => {
        switch (action.type) {
            case "increment":
            return { count: state.count + 1 };
            case "decrement":
            return { count: state.count - 1 };
            default:
            throw new Error();
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

export default ureducer;
