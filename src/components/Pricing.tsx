import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Check} from "lucide-react";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast";
import {useNavigate} from "react-router-dom";

export const Pricing = () => {
    const {toast} = useToast();
    const navigate = useNavigate();

    const handleSubscription = () => {
        const config: any = {
            headers: {
                Token: localStorage.getItem("token") || ""
            }
        }

        axios.post("https://echonote.justbackend.xyz/checkout/create-link/plus", {}, config)
            .then((response) => {
                window.location.replace(response.data.checkout_url)
            })
            .catch(error => {
                toast({
                    variant: "destructive",
                    title: "Error in checkout",
                    description: `Please login before subscribing`,
                });
                navigate("/login");
            })
    }

    return (
        <section className="py-16 bg-white">
            <div className="notion-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Get full access to all features with our affordable subscription
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <Card className="border-2 border-echonote-purple">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Premium Plan</CardTitle>
                            <div className="mt-2">
                                <span className="text-4xl font-bold">$15</span>
                                <span className="text-gray-500 ml-2">/month</span>
                            </div>
                            <CardDescription>Cancel anytime with no penalties</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {[
                                    "Unlimited notes",
                                    "1h recording",
                                    "Advanced transcription features",
                                    "Priority customer support",
                                    "Store and organize your notes"
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <Check size={18} className="text-green-500 mr-2"/>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSubscription}
                                    className="w-full bg-echonote-purple hover:bg-echonote-purple/90">
                                Subscribe Now
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
