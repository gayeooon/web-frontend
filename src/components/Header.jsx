const Header = ({ leftChild, title, rightChild }) => {
  return (
    <div className="flex">
      <div>{leftChild}</div>
      <div className="flex">{title}</div>
      <div>{rightChild}</div>
    </div>
  );
};

export default Header;
