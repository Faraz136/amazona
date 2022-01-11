import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
          <body>
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const OriginalRenderPage = ctx.renderPage;
  ctx.renderPage = () => {
    return OriginalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });
  };
  const InitialProps = await Document.getInitialProps(ctx);
  return {
    ...InitialProps,
    styles: [
      ...React.Children.toArray(InitialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
