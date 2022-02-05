import Head from "next/head";
type Props = {
  documentPage: string;
  pageDescription: string;
  window?: string;
};
export default function Ybahead({
  documentPage,
  pageDescription,
  window,
}: Props) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        property="og:title"
        content={`YourBetterAssistant-${documentPage}`}
      ></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:description" content={pageDescription}></meta>
      <meta
        property="og:url"
        content={window ? window : "https://yourbetterassistant.me"}
      ></meta>
      <meta property="theme-color" content="#40E5ED"></meta>
      <meta name="theme-color" content="#40E5ED"></meta>
      <title>{`YourBetterAssistant - ${documentPage}`}</title>
      <meta name="description" content={pageDescription} />
      <link rel="manifest" href="manifest.json" />
    </Head>
  );
}
