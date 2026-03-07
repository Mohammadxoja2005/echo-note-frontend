import {Clock} from 'lucide-react';
import {useAtom} from "jotai/index";
import {UserAtom} from "@/store/store.ts";

const RemainingTime = () => {
    const [user, setUser] = useAtom(UserAtom);

    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16}/>
            <span>{Math.floor(user.remainingSeconds / 60)} minutes remaining</span>
        </div>
    );
};

export default RemainingTime;
