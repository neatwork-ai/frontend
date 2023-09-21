// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import '../globals.css';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
