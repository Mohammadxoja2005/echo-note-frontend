
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="notion-container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-4">Last updated: May 13, 2025</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p className="mb-4">
              Welcome to EchoNote. We respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Create an account</li>
              <li>Record voice notes</li>
              <li>Create and save transcriptions</li>
              <li>Contact our support team</li>
              <li>Interact with our website and services</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Develop new products and services</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Storage and Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicyPage;
