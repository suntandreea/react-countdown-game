import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from 'react-dom';

const ResultModal = forwardRef(function ({targetTime, remainingTime, handleReset}, ref) {
  const innerDialogRef = useRef();

  const userLost = remainingTime <= 0;
  const formattedTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        innerDialogRef.current.showModal();
      }
    };
  });

  return createPortal(
    <dialog ref={innerDialogRef} className="result-modal" onClose={handleReset}>
      {userLost ? <h2>You lost!</h2> : <h2>Your score: {score}</h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the tier with <strong>{formattedTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={handleReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
})

export default ResultModal;
