
import {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAtom} from 'jotai';
import {IsUserLoggedInAtom, UserAtom} from '@/store/store';
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {Mic, ListVideo, FileText} from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import AccessDenied from '@/components/AccessDenied';
import axios from "axios";
import TrialBanner from '@/components/TrialBanner';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [, setIsUserLoggedIn] = useAtom(IsUserLoggedInAtom);
    const [user, setUser] = useAtom(UserAtom);

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
                setUser({
                    ...response.data.user,
                    daysLeft: response.data.daysLeft || null
                });
            }).catch(error => {
                setIsUserLoggedIn(false)
            })
        };

        handleRedirect();
    }, [setIsUserLoggedIn, setUser]);

    // Determine active section based on current route
    const getActiveSection = () => {
        const path = location.pathname;
        if (path.includes('/dashboard/notes')) return 'notes';
        if (path.includes('/dashboard/recordings')) return 'recordings';
        return 'recorder'; // Default or /dashboard/recorder
    };

    const activeSection = getActiveSection();

    // Navigate to the appropriate section
    const navigateToSection = (section: 'recorder' | 'notes' | 'recordings') => {
        navigate(`/dashboard/${section}`);
    };

    // Check if user is active - Fixed to handle the case when isActive is null or undefined
    if (user.isActive === false) {
        return <AccessDenied/>;
    } else if (user.isActive === null || user.isActive === undefined) {
        navigate('/login', {replace: true});
        return null;
    }

    // Determine if the trial banner should be shown
    const showTrialBanner = user.subscription?.plan === 'trial' && user.daysLeft !== null && user.daysLeft !== undefined;

    return (
        <SidebarProvider>
            <div className="flex flex-col h-screen w-full">
                {showTrialBanner && user.daysLeft !== null && (
                    <TrialBanner daysLeft={user.daysLeft}/>
                )}
                <div className="flex flex-grow overflow-hidden">
                    <Sidebar collapsible="icon" variant="sidebar" className="shrink-0">
                        <SidebarHeader>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-md bg-echonote-purple flex items-center justify-center">
                                    <span className="text-white font-bold">E</span>
                                </div>
                                <div className="p-2 flex items-center justify-between">
                                    <h3 className="text-xl font-medium">EchoNote</h3>
                                </div>
                            </div>
                        </SidebarHeader>

                        <SidebarContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => navigateToSection('recorder')}
                                        isActive={activeSection === 'recorder'}
                                        tooltip="Voice Recorder"
                                        className="text-base"
                                    >
                                        <Mic size={22}/>
                                        <span>Recorder</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => navigateToSection('notes')}
                                        isActive={activeSection === 'notes'}
                                        tooltip="Notes"
                                        className="text-base"
                                    >
                                        <FileText size={22}/>
                                        <span>Notes</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => navigateToSection('recordings')}
                                        isActive={activeSection === 'recordings'}
                                        tooltip="Recordings"
                                        className="text-base"
                                    >
                                        <ListVideo size={22}/>
                                        <span>Recordings</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>

                            <SidebarSeparator/>
                        </SidebarContent>
                    </Sidebar>

                    <main className="flex-grow bg-echonote-light/30 overflow-auto flex flex-col min-w-0">
                        <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                            <div className="flex items-center gap-2 md:gap-4 min-w-0">
                                <SidebarTrigger className="md:hidden" />
                                <h1 className="text-xl md:text-3xl font-medium truncate">
                                    {activeSection === 'recorder' && 'Voice Recorder'}
                                    {activeSection === 'notes' && 'Your Notes'}
                                    {activeSection === 'recordings' && 'Your Recordings'}
                                </h1>
                            </div>

                            <UserAvatar/>
                        </div>

                        <div className="flex-grow overflow-auto">
                            <Outlet/>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default Dashboard;
