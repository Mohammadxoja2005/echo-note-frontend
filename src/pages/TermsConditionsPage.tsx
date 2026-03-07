
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsConditionsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12">
        <div className="notion-container max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-4">Last updated: May 13, 2025</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using EchoNote, you agree to be bound by these Terms and Conditions and our Privacy Policy. 
              If you disagree with any part of the terms, you may not access the service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Description of Service</h2>
            <p className="mb-4">
              EchoNote provides a platform for voice recording, transcription, and note organization. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. User Accounts</h2>
            <p className="mb-4">
              To use certain features of EchoNote, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Acceptable Use</h2>
            <p className="mb-4">
              You agree not to use EchoNote to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Transmit any harmful code or material</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Intellectual Property</h2>
            <p className="mb-4">
              The EchoNote service, including all content, features, and functionality, is owned by EchoNote and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. User Content</h2>
            <p className="mb-4">
              You retain ownership of any content you upload to EchoNote. By uploading content, you grant us a license to use, store, and process your content for the purposes of providing and improving our service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall EchoNote be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with these Terms or your use of the service.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and access to the service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will provide notice of changes by updating the "Last updated" date at the top of these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
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

export default TermsConditionsPage;
