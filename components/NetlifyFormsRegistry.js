// Netlify detects forms by scanning the built static HTML for <form data-netlify>.
// The real forms (DonationForm/SuggestionForm) are React client components, and while
// Next's static export does prerender their markup, this hidden, always-present, plain
// HTML copy removes any doubt that Netlify's build-time crawler will register both forms
// (and their exact field names) the first time the site deploys.
export default function NetlifyFormsRegistry() {
  return (
    <div hidden aria-hidden="true">
      <form name="donation" data-netlify="true" data-netlify-honeypot="bot-field">
        <input name="bot-field" />
        <input name="campaign" />
        <input name="amount" />
        <input name="name" />
        <input name="email" />
        <input name="phone" />
        <input name="method" />
        <input name="transferDate" />
        <input name="transferReference" />
        <input name="note" />
        <input name="receiptRequested" />
        <input name="consent" />
      </form>
      <form name="suggestion" data-netlify="true" data-netlify-honeypot="bot-field">
        <input name="bot-field" />
        <input name="name" />
        <input name="email" />
        <input name="phone" />
        <input name="location" />
        <input name="issueType" />
        <input name="problem" />
        <input name="peopleAffected" />
        <input name="consent" />
      </form>
    </div>
  )
}
