import {useRef, useState} from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const outerDialog = useRef();

  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

  const hasStarted = (remainingTime > 0) && (remainingTime < targetTime * 1000);

  if(remainingTime <= 0) {
    handleStop();
  }

  function handleReset() {
    setRemainingTime(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime(prev => prev - 10);
    }, 10);
  }

  function handleStop() {
    clearTimeout(timer.current);
    outerDialog.current.open();
  }

  return <>
    <ResultModal ref={outerDialog} targetTime={targetTime} remainingTime={remainingTime} handleReset={handleReset}/>
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime + ' second' + (targetTime > 1 ? 's' : '')}
      </p>
      <p>
        {hasStarted
          ? <button onClick={handleStop}>Stop Challenge</button>
          : <button onClick={handleStart}>Start Challenge</button>
        }
      </p>
      {hasStarted
        ? <p className="active">Time is running...</p>
        : <p>Timer inactive.</p>
      }
    </section>
  </>
}
