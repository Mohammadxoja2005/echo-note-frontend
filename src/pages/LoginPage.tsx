import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAtom} from 'jotai';
import {IsUserLoggedInAtom} from '@/store/store';
import EmailSignIn from '@/components/EmailSignIn';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';

const LoginPage = () => {
    const [isUserLoggedIn] = useAtom(IsUserLoggedInAtom);
    const [isLoading, setIsLoading] = useState(false);

    if (isUserLoggedIn) {
        return <Navigate to="/dashboard" replace/>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-echonote-light p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-6">
                        <div className="h-12 w-12 rounded-md bg-echonote-purple flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Welcome to EchoNote</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to sign in or create an account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <EmailSignIn
                        onSuccess={() => setIsLoading(false)}
                        className="w-full"
                    />
                </CardContent>
                <CardFooter className="flex flex-col text-center text-sm text-gray-500">
                    <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
