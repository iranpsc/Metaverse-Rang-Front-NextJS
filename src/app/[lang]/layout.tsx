export default function LangLayout({ children, params }: any) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
