import './globals.css';

export const metadata = {
  title: 'News Fit',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ko">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
