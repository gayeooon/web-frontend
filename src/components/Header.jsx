const Header = ({ leftChild, title, rightChild }) => {
  return (
    <div className="flex">
      <div>{leftChild}</div>
      <div>{title}</div>
      <div>{rightChild}</div>
    </div>
  );
};

export default Header;
