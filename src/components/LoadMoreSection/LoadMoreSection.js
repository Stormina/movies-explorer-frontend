import { useState } from 'react';
import Preloader from '../Preloader/Preloader';

function LoadMoreSection() {
  
  const [isLoading, setLoading] = useState(false);

  function handlePreloader() {
    setLoading(true);
  }

  return (
    <section className="load-more">
      {isLoading ? <Preloader /> : 
        <button className="load-more__button"
        type="button"
        onClick={handlePreloader}>Ещё</button>
      }
    </section>
  )
}

export default LoadMoreSection;