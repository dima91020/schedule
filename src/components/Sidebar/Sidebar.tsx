import { useState } from 'react';
import { ChangeTheme } from '../ChangeTheme';
import { Legend } from '../Legend';
import './SidebarStyles.css';
import { CallMe } from '../CallMe';
import { ChooseUser } from '../ChooseUser';

interface Option {
  scroll: boolean;
  backdrop: boolean;
}

const options: Option[] = [
  {
    scroll: true,
    backdrop: true,
  },
];

interface OffCanvasExampleProps {
  backdrop?: boolean;
  [key: string]: any;
}

export const OffCanvasExample: React.FC<OffCanvasExampleProps> = ({ backdrop = true, ...props }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <button className="custom-button" onClick={toggleShow}>
        <span className="burger-icon">☰</span>
      </button>
      {show && backdrop && <div className="backdrop" onClick={handleClose} />}
      <div className={`offcanvas ${show ? 'show' : ''}`} onClick={handleClose}>
        <div className="offcanvas-content" onClick={(e) => e.stopPropagation()}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Розклад занять для ПК-21</h5>
            <button className="close-button" onClick={handleClose}>×</button>
          </div>
          <div className="offcanvas-body">
            <ChangeTheme />
            <Legend />
            <ChooseUser />
            <CallMe />
          </div>
        </div>
      </div>
    </>
  );
}

export const Sidebar: React.FC = () => {
  return (
    <>
      {options.map((props, idx) => (
        <OffCanvasExample key={idx} {...props} />
      ))}
    </>
  );
}
