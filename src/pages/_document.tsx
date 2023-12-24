import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from "next/document";

interface MyDocumentProps extends DocumentInitialProps {
  lang: string;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    let lang = "en"; // default language
    if (ctx.req) {
      const pathname = ctx.req.url;
      if (pathname.startsWith("/fa")) {
        lang = "fa";
      }
    }
    return { ...initialProps, lang };
  }

  render() {

    return (
      <Html className="overflow-x-clip" lang={this.props.lang}>
        <Head />
        <body className="dark:bg-black bg-[#eee] ">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
