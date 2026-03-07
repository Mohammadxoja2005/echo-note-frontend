
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAtom} from "jotai";
import {IsUserLoggedInAtom, UserAtom} from "@/store/store.ts";
import axios from "axios";
import {useEffect} from "react";
import UserAvatar from "@/components/UserAvatar.tsx";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useAtom(IsUserLoggedInAtom);
    const [user, setUser] = useAtom(UserAtom);
    const navigate = useNavigate();
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const handleRedirect = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (token) {
                localStorage.setItem("token", token);

                const originalUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({path: originalUrl}, '', originalUrl)
            }

            const config: any = {
                headers: {
                    Token: localStorage.getItem("token") || ""
                }
            }

            axios.post("https://echonote.justbackend.xyz/user/profile", {}, config).then((response) => {
                setIsUserLoggedIn(true);
                setUser(response.data.user);
                console.log("response", response.data);
            }).catch(error => {
                setIsUserLoggedIn(false)
            })
        };

        handleRedirect();
    }, [setIsUserLoggedIn, setUser]);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <>
            {showBanner && !isUserLoggedIn && (
                <div className="bg-echonote-purple text-white py-2 px-4">
                    <div className="notion-container flex items-center justify-between">
                        <AlertDescription className="text-sm font-medium">
                            Login now to get your 7-day free trial with full access to all premium features!
                        </AlertDescription>
                        <div className="flex items-center gap-3">
                            <Button 
                                size="sm"
                                variant="outline"
                                className="h-8 bg-white text-echonote-purple hover:bg-white/90 hover:text-echonote-purple"
                                onClick={handleLoginClick}
                            >
                                Login Now
                            </Button>
                            <button 
                                onClick={() => setShowBanner(false)}
                                className="text-white hover:text-white/80"
                                aria-label="Close banner"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <header className="border-b border-gray-200 bg-white">
                <nav className="notion-container flex items-center justify-between py-4" aria-label="Global">
                    <div className="flex items-center gap-x-12">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-echonote-purple flex items-center justify-center">
                                <span className="text-white font-bold">E</span>
                            </div>
                            <span className="text-xl font-semibold text-gray-900">EchoNote</span>
                        </Link>
                        <div className="hidden md:flex md:gap-x-6">
                            <Link to="/" className="text-sm font-semibold text-gray-900 hover:text-echonote-purple">
                                Home
                            </Link>
                            <Link to="/blog" className="text-sm font-semibold text-gray-900 hover:text-echonote-purple">
                                Blog
                            </Link>
                            {/*<Link to="/pricing" className="text-sm font-semibold text-gray-900 hover:text-echonote-purple">*/}
                            {/*    Pricing*/}
                            {/*</Link>*/}
                            {/*{isUserLoggedIn && (*/}
                            {/*    <Link to="/dashboard"*/}
                            {/*          className="text-sm font-semibold text-gray-900 hover:text-echonote-purple">*/}
                            {/*        Dashboard*/}
                            {/*    </Link>*/}
                            {/*)}*/}
                            <a href="#features" className="text-sm font-semibold text-gray-900 hover:text-echonote-purple">
                                Features
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:flex md:items-center md:gap-x-4">
                        {isUserLoggedIn ? (
                            <Link to="/dashboard" className="text-sm font-semibold text-gray-900 hover:text-echonote-purple">
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Button 
                                variant="outline"
                                className="w-auto"
                                onClick={handleLoginClick}
                            >
                                Login
                            </Button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16m-7 6h7"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-4 py-3 border-t border-gray-200">
                            <Link
                                to="/"
                                className="block py-2 text-base font-medium text-gray-900 hover:text-echonote-purple"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/blog"
                                className="block py-2 text-base font-medium text-gray-900 hover:text-echonote-purple"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                to="/pricing"
                                className="block py-2 text-base font-medium text-gray-900 hover:text-echonote-purple"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            {isUserLoggedIn && (
                                <Link
                                    to="/dashboard"
                                    className="block py-2 text-base font-medium text-gray-900 hover:text-echonote-purple"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}
                            <a
                                href="#features"
                                className="block py-2 text-base font-medium text-gray-900 hover:text-echonote-purple"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Features
                            </a>
                            <div className="py-2">
                                {!isUserLoggedIn && (
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            navigate('/login');
                                        }}
                                    >
                                        Login
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
