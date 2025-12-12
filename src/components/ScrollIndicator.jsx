import '../App.css';

function ScrollIndicator({ scrollProgress }) {
  if (scrollProgress > 0.1) {
    return null;
  }

  return (
    <div className="scroll-indicator">
      <span className="scroll-text">Scroll to start</span>
      <div className="scroll-arrow">↓</div>
    </div>
  );
}

export default ScrollIndicator;

