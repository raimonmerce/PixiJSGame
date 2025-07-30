
import type { OptionsProps } from "../types";

const Options: React.FC<OptionsProps> = ({ setScreen }) => {
  return (
    <div className="main-menu">
      <h2>Options</h2>
      <button onClick={() => setScreen('menu')}>Back</button>
    </div>
  );
};

export default Options