import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="overflow-x-clip">
        <Head />
        <body className="dark:bg-black bg-[#eee] ">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
