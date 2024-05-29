import {useRef, useState} from 'react';

export default function Player() {
  const [name, setName] = useState(null);
  const nameInput = useRef();

  function handleNameChange() {
    setName(nameInput.current.value);
    nameInput.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {name ?? 'unknown entity'}</h2>
      <p>
        <input type="text" ref={nameInput} />
        <button onClick={handleNameChange}>Set Name</button>
      </p>
    </section>
  );
}
