export const metadata = {
  title: 'News Fit',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
