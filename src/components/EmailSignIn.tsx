import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "@/hooks/use-toast";
import {Mail, ExternalLink} from "lucide-react";
import axios from "axios";
import {useAtom} from "jotai/index";
import {IsUserLoggedInAtom} from "@/store/store.ts";

const getInboxUrl = (email: string): string => {
    const domain = email.split('@')[1]?.toLowerCase() || '';
    if (domain === 'gmail.com') return 'https://mail.google.com';
    if (domain === 'yahoo.com' || domain === 'yahoo.co.uk') return 'https://mail.yahoo.com';
    if (['outlook.com', 'hotmail.com', 'live.com', 'msn.com'].includes(domain)) return 'https://outlook.live.com';
    if (domain === 'icloud.com' || domain === 'me.com') return 'https://www.icloud.com/mail';
    if (domain === 'proton.me' || domain === 'protonmail.com') return 'https://mail.proton.me';
    return `https://mail.${domain}`;
};

interface EmailSignInProps {
    onSuccess?: () => void;
    className?: string;
}

export const EmailSignIn = ({onSuccess, className}: EmailSignInProps) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [linkSent, setLinkSent] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(IsUserLoggedInAtom);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            toast({
                title: "Invalid email",
                description: "Please enter a valid email address.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        const config: any = {
            headers: {
                Token: localStorage.getItem("token") || ""
            }
        }

        try {
            axios.post("https://echonote.justbackend.xyz/user/email", {
                email: email,
            }, config).then(() => {
                setIsSubmitting(false);

                setLinkSent(true);
                toast({
                    title: "Magic link sent!",
                    description: `We've sent a login link to ${email}. Please check your inbox.`,
                });

                if (onSuccess) {
                    onSuccess();
                }
            }).catch(error => {
                toast({
                    title: "Error in sending link",
                    description: `Please try again later`,
                });

                setIsUserLoggedIn(false)
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send magic link. Please try again.",
                variant: "destructive",
            });
        }
    };

    if (linkSent) {
        return (
            <div className={`text-center p-4 ${className}`}>
                <Mail className="mx-auto mb-4 h-12 w-12 text-echonote-purple"/>
                <h3 className="text-lg font-medium mb-2">Check your email</h3>
                <p className="text-muted-foreground mb-4">
                    We've sent a magic link to <span className="font-medium">{email}</span>
                </p>
                <Button
                    className="w-full mb-4 flex gap-2"
                    onClick={() => window.open(getInboxUrl(email), '_blank')}
                >
                    <ExternalLink size={16}/>
                    Open Inbox
                </Button>
                <p className="text-sm text-muted-foreground">
                    Didn't receive an email? Check your spam folder or{" "}
                    <button
                        onClick={() => setLinkSent(false)}
                        className="text-echonote-purple hover:underline"
                    >
                        try again
                    </button>
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleEmailLogin} className={`space-y-4 ${className}`}>
            <div>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full"
                />
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Sending..." : "Send Magic Link"}
            </Button>
        </form>
    );
};

export default EmailSignIn;
