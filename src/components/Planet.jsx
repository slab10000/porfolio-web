import '../App.css';

function Planet({ size, position, planetNumber, scrollProgress, children }) {
  const planetClass = `planet planet-${size} planet-${position} planet-${planetNumber}`;
  
  return (
    <div 
      className={planetClass}
      style={{ '--scroll-progress': scrollProgress }}
    >
      {children}
    </div>
  );
}

export default Planet;

