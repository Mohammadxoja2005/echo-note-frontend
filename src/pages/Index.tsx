
import {Link} from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import SEO from '@/components/SEO';
import {Button} from '@/components/ui/button';
import {Mic, FileText, BotOff} from 'lucide-react';

const Index = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "EchoNote - Meeting Notes Without Bots",
        "description": "EchoNote captures and transcribes your back-to-back meetings with no bots, no installs. Works on Zoom, Google Meet, Microsoft Teams, and Slack.",
        "url": "https://echonote.ink",
        "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "EchoNote",
            "description": "AI-powered meeting transcription without meeting bots",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser",
            "url": "https://echonote.ink",
            "offers": {
                "@type": "Offer",
                "price": "15",
                "priceCurrency": "USD"
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SEO
                title="EchoNote - Meeting Notes Without Bots | Zoom, Meet, Teams, Slack"
                description="EchoNote captures and transcribes your back-to-back meetings with no bots, no installs. Works on Zoom, Google Meet, Microsoft Teams, and Slack. Try free today!"
                keywords="meeting notes, meeting transcription, no meeting bot, zoom transcription, google meet notes, microsoft teams notes, slack notes, AI meeting notes, voice to text meetings"
                url="https://echonote.ink"
                structuredData={structuredData}
            />

            <Header/>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-echonote-light py-16 md:py-28">
                    <div className="notion-container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-echonote-purple/10 text-echonote-purple text-sm font-medium px-3 py-1 rounded-full mb-6">
                                    <BotOff size={14}/>
                                    No meeting bots.
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                                    Back-to-back meetings?<br/>
                                    <span className="text-echonote-purple">EchoNote has your notes.</span>
                                </h1>
                                <p className="mt-6 text-lg text-gray-600">
                                    Record any meeting directly in your browser — no bots joining your call, no one notified.
                                    Get a full transcript and AI summary the moment it ends.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Link to="/dashboard">
                                        <Button className="bg-echonote-purple text-white hover:bg-echonote-purple/90 px-6 py-3 text-base">
                                            Start Recording
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden">
                                <img
                                    src="/hero.png"
                                    alt="EchoNote meeting notes illustration"
                                    className="w-full h-full object-cover"
                                    style={{minHeight: '300px'}}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platforms Section */}
                <section className="py-14 bg-white border-y border-gray-100">
                    <div className="notion-container">
                        <p className="text-1xl font-bold text-gray-900 text-center uppercase mb-10">
                            Works on every platform — no bot required
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                            {/* Zoom */}
                            <div className="flex flex-col items-center gap-2">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#2D8CFF"/>
                                    <path d="M10 16.5C10 15.12 11.12 14 12.5 14H27C28.38 14 29.5 15.12 29.5 16.5V27C29.5 28.38 28.38 29.5 27 29.5H12.5C11.12 29.5 10 28.38 10 27V16.5Z" fill="white"/>
                                    <path d="M31 19.5L38 15.5V28.5L31 24.5V19.5Z" fill="white"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-600">Zoom</span>
                            </div>

                            {/* Google Meet */}
                            {/*<div className="flex flex-col items-center gap-2">*/}
                            {/*    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                            {/*        <rect width="48" height="48" rx="12" fill="#F8F9FA"/>*/}
                            {/*        /!* Camera body left *!/*/}
                            {/*        <rect x="10" y="16" width="20" height="16" rx="2.5" fill="#00832D"/>*/}
                            {/*        /!* Camera lens right panel *!/*/}
                            {/*        <path d="M30 21.5L38 17V31L30 26.5V21.5Z" fill="#00832D"/>*/}
                            {/*        /!* G overlay stripe — red top-right corner fold *!/*/}
                            {/*        <path d="M27 16H33L38 21V17L33 16H27Z" fill="#FF0000" fillOpacity="0.85"/>*/}
                            {/*    </svg>*/}
                            {/*    <span className="text-sm font-medium text-gray-600">Google Meet</span>*/}
                            {/*</div>*/}

                            {/* Microsoft Teams */}
                            <div className="flex flex-col items-center gap-2">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#464EB8"/>
                                    <path d="M28 18C28 16.34 29.34 15 31 15C32.66 15 34 16.34 34 18C34 19.66 32.66 21 31 21C29.34 21 28 19.66 28 18Z" fill="white"/>
                                    <path d="M27 22H35V32C35 33.1 34.1 34 33 34H29C27.9 34 27 33.1 27 32V22Z" fill="white" fillOpacity="0.8"/>
                                    <path d="M14 20C14 18.9 14.9 18 16 18H23C24.1 18 25 18.9 25 20V32C25 33.1 24.1 34 23 34H16C14.9 34 14 33.1 14 32V20Z" fill="white"/>
                                    <circle cx="19.5" cy="15" r="3" fill="white"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-600">Microsoft Teams</span>
                            </div>

                            {/* Slack */}
                            <div className="flex flex-col items-center gap-2">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#F8F9FA"/>
                                    <path d="M17 27C17 28.1 16.1 29 15 29C13.9 29 13 28.1 13 27C13 25.9 13.9 25 15 25H17V27Z" fill="#E01E5A"/>
                                    <path d="M18 27C18 25.9 18.9 25 20 25C21.1 25 22 25.9 22 27V32C22 33.1 21.1 34 20 34C18.9 34 18 33.1 18 32V27Z" fill="#E01E5A"/>
                                    <path d="M20 18C18.9 18 18 17.1 18 16C18 14.9 18.9 14 20 14C21.1 14 22 14.9 22 16V18H20Z" fill="#36C5F0"/>
                                    <path d="M20 19C21.1 19 22 19.9 22 21C22 22.1 21.1 23 20 23H15C13.9 23 13 22.1 13 21C13 19.9 13.9 19 15 19H20Z" fill="#36C5F0"/>
                                    <path d="M29 21C29 19.9 29.9 19 31 19C32.1 19 33 19.9 33 21C33 22.1 32.1 23 31 23H29V21Z" fill="#2EB67D"/>
                                    <path d="M28 21C28 22.1 27.1 23 26 23C24.9 23 24 22.1 24 21V16C24 14.9 24.9 14 26 14C27.1 14 28 14.9 28 16V21Z" fill="#2EB67D"/>
                                    <path d="M26 30C27.1 30 28 30.9 28 32C28 33.1 27.1 34 26 34C24.9 34 24 33.1 24 32V30H26Z" fill="#ECB22E"/>
                                    <path d="M26 29C24.9 29 24 28.1 24 27C24 25.9 24.9 25 26 25H31C32.1 25 33 25.9 33 27C33 28.1 32.1 29 31 29H26Z" fill="#ECB22E"/>
                                </svg>
                                <span className="text-sm font-medium text-gray-600">Slack</span>
                            </div>
                        </div>
                        <p className="text-center text-gray-400 text-sm mt-10">
                            EchoNote records system audio directly — no bot joins your call.
                        </p>
                    </div>
                </section>

                {/* How it works */}
                <section id="features" className="py-16 md:py-24 bg-echonote-light/40">
                    <div className="notion-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">How EchoNote Works</h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Three steps from meeting to organized notes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="h-12 w-12 bg-echonote-purple/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-semibold text-echonote-purple">1</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open EchoNote & Record</h3>
                                <p className="text-base text-gray-600">
                                    Start your meeting on any platform. Hit record in EchoNote — it captures your mic and system audio together, privately.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="h-12 w-12 bg-echonote-purple/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-semibold text-echonote-purple">2</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Transcribes Instantly</h3>
                                <p className="text-base text-gray-600">
                                    The moment you stop recording, our AI transcribes every word accurately — even across accents and crosstalk.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="h-12 w-12 bg-echonote-purple/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-semibold text-echonote-purple">3</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Summary & Key Points</h3>
                                <p className="text-base text-gray-600">
                                    EchoNote generates a clean summary and action items so you can jump straight into your next meeting.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why no bots section */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="notion-container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Why no meeting bot?
                                </h2>
                                <div className="space-y-5">
                                    <div className="flex gap-4">
                                        <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-echonote-purple/10 flex items-center justify-center">
                                            <BotOff size={20} className="text-echonote-purple"/>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">No awkward bot in the room</h4>
                                            <p className="text-base text-gray-600 mt-1">Nobody sees a "EchoNote Bot joined" message. Your calls stay natural.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-echonote-purple/10 flex items-center justify-center">
                                            <Mic size={20} className="text-echonote-purple"/>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">Works on any platform</h4>
                                            <p className="text-base text-gray-600 mt-1">Zoom, Google Meet, Teams, Slack huddles — if you can hear it, EchoNote can record it.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-echonote-purple/10 flex items-center justify-center">
                                            <FileText size={20} className="text-echonote-purple"/>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">Notes ready before the next meeting</h4>
                                            <p className="text-base text-gray-600 mt-1">Transcription + summary lands in seconds. Back-to-back calendar? No problem.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-echonote-light rounded-2xl p-8 flex flex-col gap-4">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <p className="text-xs text-gray-400 mb-1">Meeting — Product Sync</p>
                                    <p className="text-sm text-gray-700 font-medium">Summary</p>
                                    <p className="text-sm text-gray-600 mt-1">Team agreed to ship the new onboarding flow by Friday. Design will deliver assets by EOD Tuesday.</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                    <p className="text-xs text-gray-400 mb-1">Action Items</p>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                        <li>Sarah to send revised wireframes by Tuesday</li>
                                        <li>Dev team to review API spec today</li>
                                        <li>Schedule follow-up for Thursday 3pm</li>
                                    </ul>
                                </div>
                                <div className="text-center text-xs text-gray-400 mt-2">Generated in seconds after your meeting ends</div>
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
                            <h2 className="text-3xl font-bold">Never miss a meeting detail again</h2>
                            <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
                                Join professionals who use EchoNote to stay on top of back-to-back meetings — without bots, without the hassle.
                            </p>
                            <div className="mt-8">
                                <Link to="/dashboard">
                                    <Button className="bg-echonote-purple hover:bg-echonote-purple/90 px-8 py-3 text-lg">
                                        Try EchoNote Free
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
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="flex items-center mb-4">
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900">Emily Johnson</h4>
                                        <p className="text-sm text-gray-500">Product Manager</p>
                                    </div>
                                </div>
                                <p className="text-base text-gray-600">
                                    "I have five meetings a day. EchoNote means I actually remember what was decided in each one. No bot, no fuss."
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="flex items-center mb-4">
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900">Michael Brown</h4>
                                        <p className="text-sm text-gray-500">Engineering Lead</p>
                                    </div>
                                </div>
                                <p className="text-base text-gray-600">
                                    "Our clients hate meeting bots. EchoNote lets me record without anyone knowing — transcription is spot on."
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 notion-card">
                                <div className="flex items-center mb-4">
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900">Olivia Davis</h4>
                                        <p className="text-sm text-gray-500">Sales Director</p>
                                    </div>
                                </div>
                                <p className="text-base text-gray-600">
                                    "I jump from Zoom to Teams to Slack calls all day. EchoNote just works across all of them without any setup."
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
