const CoverScreen = ({ onClose }) => {
  return (
    <div
      className="w-screen! h-screen fixed top-0 left-0 bg-black/30 z-30"
      onClick={onClose}
    ></div>
  );
};

export default CoverScreen;
