
import {Link} from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import SEO from '@/components/SEO';
import {Button} from '@/components/ui/button';
import {Lightbulb, Pen, Mic, MicVocal, Presentation, BookOpen} from 'lucide-react';

const Index = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "EchoNote - Voice to Text Notes",
        "description": "Transform your voice into organized notes instantly with EchoNote. AI-powered voice recording and transcription for professionals, students, and content creators.",
        "url": "https://echonote.ink",
        "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "EchoNote",
            "description": "AI-powered voice recording and transcription app",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser",
            "url": "https://echonote.ink",
            "offers": {
                "@type": "Offer",
                "price": "15",
                "priceCurrency": "USD"
            }
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://echonote.ink"
                }
            ]
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SEO 
                title="EchoNote - Voice to Text Notes | AI-Powered Voice Recording App"
                description="Transform your voice into organized notes instantly with EchoNote. AI-powered voice recording and transcription for professionals, students, and content creators. Try free today!"
                keywords="voice to text, voice notes, voice recording, transcription, AI transcription, note taking, voice memo, speech to text, audio notes, productivity app"
                url="https://echonote.ink"
                structuredData={structuredData}
            />
            
            <Header/>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-echonote-light py-16 md:py-24">
                    <div className="notion-container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                                    Capture your thoughts with your voice
                                </h1>
                                <p className="mt-6 text-lg text-gray-600">
                                    EchoNote transforms your spoken words into organized notes instantly. Save time,
                                    capture ideas on the go, and never lose an important thought again.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Link to="/dashboard">
                                        <Button
                                            className="bg-echonote-purple text-white hover:bg-echonote-purple/90 px-6 py-3 text-base">
                                            Start Recording
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden ">
                                <img
                                    src="/hero.png"
                                    alt="Voice recording illustration"
                                    className="w-full h-full object-cover"
                                    style={{minHeight: '300px'}}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="notion-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">Here is how EchoNote can help you</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Use Case 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="mb-4 text-echonote-purple">
                                    <Lightbulb size={32}/>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Effortless Brainstorming</h3>
                                <p className="text-gray-600">
                                    Never forget an idea again! Capture your best thoughts while they're fresh, and let
                                    our app do the writing for you.
                                </p>
                            </div>

                            {/* Use Case 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="mb-4 text-echonote-purple">
                                    <Pen size={32}/>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Easy Content Creation</h3>
                                <p className="text-gray-600">
                                    Say goodbye to writer's block! With EchoNote, you can dictate your thoughts and
                                    watch them transform into engaging content in seconds.
                                </p>
                            </div>

                            {/* Use Case 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="mb-4 text-echonote-purple">
                                    <Mic size={32}/>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Voice Journaling</h3>
                                <p className="text-gray-600">
                                    Discover a new way to journal! Express your thoughts, feelings, and memories
                                    effortlessly just by recording yourself rambling.
                                </p>
                            </div>

                            {/* Use Case 4 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="mb-4 text-echonote-purple">
                                    <MicVocal size={32}/>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Interview Transcription</h3>
                                <p className="text-gray-600">
                                    Conduct interviews like a pro! EchoNote provides instant, accurate transcriptions so
                                    you can focus on the conversation.
                                </p>
                            </div>

                            {/* Use Case 5 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="mb-4 text-echonote-purple">
                                    <Presentation size={32}/>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Meetings Reimagined</h3>
                                <p className="text-gray-600">
                                    Transform your meetings with EchoNote! Record, transcribe, and never miss a crucial
                                    detail again.
                                </p>
                            </div>

                            {/* Use Case 6 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="mb-4 text-echonote-purple">
                                    <BookOpen size={32}/>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Learn faster</h3>
                                <p className="text-gray-600">
                                    Supercharge your studies with EchoNote! Convert lectures and study sessions into
                                    clear notes and flashcards.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 md:py-24">
                    <div className="notion-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">How EchoNote Works</h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                A simple, intuitive process to convert your voice into organized notes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div
                                    className="h-12 w-12 bg-echonote-purple/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-semibold text-echonote-purple">1</span>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Record Your Voice</h3>
                                <p className="text-gray-600">
                                    Simply press the record button and start speaking. EchoNote captures your voice with
                                    crystal clear quality.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div
                                    className="h-12 w-12 bg-echonote-purple/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-semibold text-echonote-purple">2</span>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Automatic Transcription</h3>
                                <p className="text-gray-600">
                                    Our advanced AI converts your speech to text within seconds, maintaining accuracy
                                    even with complex terminology.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div
                                    className="h-12 w-12 bg-echonote-purple/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-semibold text-echonote-purple">3</span>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Organized Notes</h3>
                                <p className="text-gray-600">
                                    Access and edit your notes anytime. Search, edit, or play back the audio recording
                                    of any note.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <FAQ />

                {/* Pricing Section */}
                <Pricing/>

                {/* CTA Section */}
                <section className="bg-echonote-dark text-white py-16">
                    <div className="notion-container">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold">Start Converting Voice to Notes Today</h2>
                            <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
                                Join thousands of professionals who save time and capture ideas efficiently with
                                EchoNote
                            </p>
                            <div className="mt-8">
                                <Link to="/dashboard">
                                    <Button
                                        className="bg-echonote-purple hover:bg-echonote-purple/90 px-8 py-3 text-lg">
                                        Try EchoNote Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 md:py-24">
                    <div className="notion-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Testimonial 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="flex items-center mb-4">
                                    <div>
                                        <h4 className="font-medium">Emily Johnson</h4>
                                        <p className="text-sm text-gray-500">Marketing Director</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    "EchoNote has transformed how I capture ideas during my commute. The transcription
                                    is incredibly accurate!"
                                </p>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="flex items-center mb-4">
                                    <div>
                                        <h4 className="font-medium">Michael Brown</h4>
                                        <p className="text-sm text-gray-500">Software Engineer</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    "As someone who thinks out loud, EchoNote helps me document my problem-solving
                                    process while coding."
                                </p>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="flex items-center mb-4">
                                    <div>
                                        <h4 className="font-medium">Olivia Davis</h4>
                                        <p className="text-sm text-gray-500">Author</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">
                                    "I can finally capture my creative ideas on the go. EchoNote has become an essential
                                    tool in my writing process."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer/>
        </div>
    );
};

export default Index;
