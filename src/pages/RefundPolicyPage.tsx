
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RefundPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="notion-container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-4">Last updated: May 13, 2025</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Refund Eligibility</h2>
            <p className="mb-4">
              We offer refunds under the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>For monthly subscription plans: Full refund if requested within 14 days of the initial purchase or renewal date.</li>
              <li>For annual subscription plans: Full refund if requested within 30 days of the initial purchase or renewal date.</li>
              <li>For technical issues: Partial or full refund may be provided if our service has experienced significant technical problems that prevented you from using it.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Refund Process</h2>
            <p className="mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Contact our support team at <a href="mailto:support@codepilot.ink" className="text-echonote-purple">support@codepilot.ink</a></li>
              <li>Include your account email and the reason for requesting a refund</li>
              <li>Provide any relevant information or documentation that may support your request</li>
            </ol>
            <p className="mb-4">
              We will review your request and respond within 3 business days. If approved, refunds will be processed to the original payment method within 5-10 business days.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Non-Refundable Items</h2>
            <p className="mb-4">
              The following are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Subscription fees beyond the eligible refund period</li>
              <li>Accounts that have violated our Terms and Conditions</li>
              <li>Special promotional offers that were explicitly marked as non-refundable</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Cancellation vs. Refund</h2>
            <p className="mb-4">
              Cancelling your subscription will stop future billing but does not automatically qualify you for a refund of previous charges. Refunds must be explicitly requested and are subject to the eligibility criteria outlined above.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Changes to This Policy</h2>
            <p className="mb-4">
              We reserve the right to modify this Refund Policy at any time. Changes will be effective when posted on this page with a new "Last updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our Refund Policy, please contact us at:
              <br />
              <a href="mailto:support@codepilot.ink" className="text-echonote-purple">support@codepilot.ink</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicyPage;
