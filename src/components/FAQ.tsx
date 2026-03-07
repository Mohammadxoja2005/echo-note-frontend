import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="notion-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers. Here are some of the most common questions about EchoNote.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                How accurate is the voice-to-text conversion?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                EchoNote uses advanced AI technology to provide highly accurate transcriptions. The accuracy typically exceeds 95% for clear audio with standard accents. For optimal results, we recommend speaking clearly and using a good quality microphone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                Can I use EchoNote in different languages?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Yes, EchoNote supports multiple languages. Our system can recognize and transcribe speech in English, Spanish, French, German, and several other major languages. We're continuously adding support for more languages.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                Can I edit the text once it's converted?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Absolutely! After transcription, you can fully edit your notes. Our editor allows you to correct any mistakes, add formatting, and organize your content however you like.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                Do I need an internet connection to use EchoNote?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Yes, an internet connection is required to utilize the full range of features in EchoNote. The transcription process happens on our secure servers to provide you with the highest accuracy possible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                What about privacy?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Glad you asked! All audio files are deleted after they are transcribed, and we don't train the AI using your notes. Your notes are 100% yours. We implement robust security measures to ensure your data remains private and secure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                How can I contact support if I have questions or need help?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                Our support team is ready to assist you with any questions or issues. You can reach us at support@codepilot.ink, and we typically respond within 24 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-white rounded-lg shadow-sm border border-gray-200">
              <AccordionTrigger className="px-6 py-4 text-left text-gray-900 font-medium">
                How can I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                You can cancel your subscription at any time from your account settings. After cancellation, you'll continue to have access to all features until the end of your current billing period. No further charges will be made.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
