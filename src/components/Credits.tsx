import type { CreditsProps } from "../types";

const Credits: React.FC<CreditsProps> = ({ setScreen }) => {
  return (
    <div className="main-menu">
      <h2>Credits</h2>
      <div className="credits-list">
        <a href="https://www.instagram.com/vampirozombi/" target="_blank" rel="noopener noreferrer">Vespi</a>
        <a href="https://www.raimonmerce.com/" target="_blank" rel="noopener noreferrer">Ray</a>
        <a href="https://www.linkedin.com/in/jun-jie-ji-chen/" target="_blank" rel="noopener noreferrer">Ji</a>
        <a href="https://www.artstation.com/lluc_baliarda" target="_blank" rel="noopener noreferrer">Lluc</a>
      </div>
      <button onClick={() => setScreen('menu')}>Back</button>
    </div>
  );
};

export default Credits