import mailchimp from "@mailchimp/mailchimp_marketing";

const defaultApiKey = "51edb435006f30b8bed56163f3e2b11f-us21";
const defaultApiServer = "us21";
const defaultAudienceId = "643085bcc3";


mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || defaultApiKey,
  server: process.env.MAILCHIMP_API_SERVER || defaultApiServer,
});

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) new Response(JSON.stringify({ error: "Email is required" }));

  try {
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID || defaultAudienceId;
    const res = await mailchimp.lists.addListMember(
      audienceId!,
      { email_address: email, status: "subscribed" }
    );

    return new Response(JSON.stringify({ res }));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: JSON.parse(error.response.text) })
    );
  }
}
