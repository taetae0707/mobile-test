import Script from "next/script";

type GoogleAnalyticsProps = {
  trackingId: string;
};

export default function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js
				?id=${trackingId}`}
      />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
      
          gtag('config', '${trackingId}');
        `,
        }}
      />
    </>
  );
}
