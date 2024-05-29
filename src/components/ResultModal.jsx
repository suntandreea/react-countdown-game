import {forwardRef, useImperativeHandle, useRef} from 'react';

const ResultModal = forwardRef(function ({result, targetTime}, ref) {
  const innerDialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        innerDialogRef.current.showModal();
      }
    };
  });

  return <dialog ref={innerDialogRef} className="result-modal">
    <h2>You {result}</h2>
    <p>The target time was <strong>{targetTime} seconds.</strong></p>
    <p>You stopped the tier with <strong>X seconds left.</strong></p>
    <form method="dialog">
      <button>Close</button>
    </form>
  </dialog>
})

export default ResultModal;
