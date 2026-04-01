import {useState} from "react";
import {useAtom} from "jotai";
import {UserAtom} from "@/store/store";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useToast} from "@/hooks/use-toast";

const UserAvatar = () => {
    const [user] = useAtom(UserAtom);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const {toast} = useToast();

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
        window.location.href = "/";
    }

    const handleCancelSubscription = () => {
        const config: any = {
            headers: {
                Token: localStorage.getItem("token"),
            }
        }

        axios.post("https://echonote.justbackend.xyz/subscription/cancel", {}, config).then(() => {
            toast({
                title: "Subscription cancelled",
                description: `Your subscription cancelled successfully.`,
            });
        }).catch(error => {
            toast({
                variant: "destructive",
                title: "Error in cancelling subscription",
                description: `There was error in cancelling your subscription. Please try again.`,
            });
        })

        setDialogOpen(false)
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <button className="outline-none">
                        <Avatar
                            className="cursor-pointer border-2 border-transparent hover:border-echonote-purple transition-colors">
                            <AvatarImage src={user.picture || ""}/>
                            <AvatarFallback>{user.name ? getInitials(user.name) : "U"}</AvatarFallback>
                        </Avatar>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="end">
                    <div className="space-y-3">
                        <div className="font-medium">{user.name || "User"}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>

                        <hr className="my-2"/>

                        <div className="space-y-1">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-left"
                                onClick={() => setDialogOpen(true)}
                            >
                                Billing & Subscription
                            </Button>

                            {/*<Button variant="ghost" className="w-full justify-start text-left">*/}
                            {/*    Settings*/}
                            {/*</Button>*/}

                            <Button onClick={handleSignOut} variant="ghost"
                                    className="w-full justify-start text-left text-red-500 hover:text-red-600 hover:bg-red-50">
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Subscription Management</DialogTitle>
                        <DialogDescription>
                            You are currently subscribed to our {user.subscription?.plan} Plan.
                        </DialogDescription>
                    </DialogHeader>
                    {/*<div className="py-4">*/}
                    {/*    <p className="text-sm text-muted-foreground mb-4">*/}
                    {/*        Your next billing date is June 11, 2025.*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleCancelSubscription}
                            disabled={user.subscription?.plan === "trial"}
                        >
                            Cancel Subscription
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserAvatar;
