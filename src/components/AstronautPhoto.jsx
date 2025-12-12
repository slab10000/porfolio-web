import '../App.css';

function AstronautPhoto({ showSuit, setShowSuit, scrollProgress }) {
  const handleClick = () => {
    setShowSuit(!showSuit);
  };

  return (
    <div 
      className="astronaut-container"
      onClick={handleClick}
      style={{ '--scroll-progress': scrollProgress }}
    >
      <div className="astronaut-image-wrapper">
        <img 
          src="/astronaut no bg.png" 
          alt="Blas Moreno Laguna" 
          className="astronaut-image"
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23444" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23fff" font-size="16"%3EAstronaut%3C/text%3E%3C/svg%3E';
          }}
        />
        {showSuit && (
          <div className="space-suit-overlay">
            <div className="space-suit-helmet"></div>
            <div className="space-suit-body"></div>
          </div>
        )}
      </div>
      <h1 className="astronaut-name">Blas Moreno Laguna</h1>
    </div>
  );
}

export default AstronautPhoto;

