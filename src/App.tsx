import styles from './App.module.scss';

import './App.module.scss';
import MenuSection from './react/components/MenuSection';
import FdeSection from './react/components/FdeSection';

function App() {
  return (
    <div className={styles.App}>
      <MenuSection appVersion="1.0" />
      <FdeSection />
    </div>
  );
}

export default App;
