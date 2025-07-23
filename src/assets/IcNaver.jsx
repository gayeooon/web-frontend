const IcNaver = ({ white = false }) => (
  <svg
    width={white ? 16 : 22}
    height={white ? 16 : 22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_104_883)">
      <path
        d="M14.9175 11.7737L6.7607 0H0V22H7.08247V10.2245L15.2393 22H22V0H14.9175V11.7737Z"
        fill={white ? '#fff' : '#03C75A'}
      />
    </g>
    <defs>
      <clipPath id="clip0_104_883">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default IcNaver;
