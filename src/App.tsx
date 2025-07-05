import FactEditor from './components/FactEditor';

function App() {
  const handleFactsSaved = (facts: string[]) => {
    console.log("Saved facts:", facts);
  };

  return (
    <div>
      <FactEditor onSave={handleFactsSaved} />
    </div>
  );
}

export default App;
