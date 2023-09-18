import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Exo:wght@300;400;600&display=swap" rel="stylesheet" />
        </Head>
        <body className="font-exo">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
