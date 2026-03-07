
import {atom} from 'jotai';

export const IsUserLoggedInAtom = atom(false);

export const UserAtom = atom({
    email: "",
    name: "",
    picture: "",
    subscription: {
        id: null,
        plan: null,
    },
    isActive: null,
    daysLeft: null,
    remainingSeconds: 0,
});
