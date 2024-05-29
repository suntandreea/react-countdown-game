import {useRef, useState} from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const outerDialog= useRef();
  const [hasStarted, setHasStarted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  function handleStart() {
    setHasStarted(true);
    timer.current = setTimeout(() => {
      setIsExpired(true);
      setHasStarted(false);
      outerDialog.current.open();
    }, targetTime * 1000);
  }

  function handleStop() {
    setHasStarted(false);
    clearTimeout(timer.current);
  }

  return <>
    <ResultModal ref={outerDialog} targetTime={targetTime} result='lost' />
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
