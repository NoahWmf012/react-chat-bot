import { useState } from 'react';
import FactEditor from './components/FactEditor';
import ChatWidget from './components/ChatWidget';

function App() {
  const [facts, setFacts] = useState<string[]>([]);

  return (
    <>
      <FactEditor onSave={setFacts} />
      <ChatWidget facts={facts} />
    </>
  );
}

export default App;
