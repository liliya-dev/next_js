import  { forwardRef, useRef, useImperativeHandle } from 'react';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
export const Child = forwardRef((props, ref) => {

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    getAlert() {
      console.log("getAlert from Child");
    }

  }));

  return <h1>Hi</h1>;
});