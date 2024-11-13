const PageLayout = ({ children, page }) => {
  const pageStyle = {
    main: {
      outDiv: "flex justify-center",
      inDiv: "flex flex-col w-full max-w-2xl mb-32 relative",
    },
    search: {
      outDiv: "flex justify-center",
      inDiv: "flex flex-col w-full max-w-2xl mb-32 relative",
    },
    user: {
      outDiv: "flex justify-center h-screen min-h-[600px] bg-background/30",
      inDiv:
        "relative flex flex-col items-center px-14 py-4 w-full max-w-2xl h-full bg-white",
    },
    setting: {
      outDiv: "flex justify-center h-screen min-h-[600px]",
      inDiv: "h-full w-full max-w-2xl",
    },
    login: {
      outDiv: "flex justify-center h-screen min-h-[900px]",
      inDiv: "relative flex flex-col items-center w-10/12 max-w-2xl h-full",
    },
    signup: {
      outDiv: "flex justify-center h-screen min-h-[750px]",
      inDiv: "h-full w-full max-w-2xl",
    },
  };
  return (
    <div className={pageStyle[page].outDiv}>
      <div className={pageStyle[page].inDiv}>{children}</div>
    </div>
  );
};

export default PageLayout;
