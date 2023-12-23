import { useNavigate } from "react-router-dom"
import { ITileProps } from "./components/Tiles";
import userIcon from './assets/Images/user-icon.png';
import securityIcon from './assets/Images/security-icon.png';
import paymentIcon from './assets/Images/payment-icon.png';
import fileIcon from './assets/Images/file-icon.png';
import notificationIcon from './assets/Images/notifications-icon.png';
import eyeIcon from './assets/Images/eye-icon.png';
import switchIcon from './assets/Images/switch-icon.png';
import deskIcon from './assets/Images/desk-icon.png';
import graphIcon from './assets/Images/graph-icon.png';
import giftIcon from './assets/Images/gift-icon.png';


// const navigate = useNavigate();

const handleFutureFeature = () => {
    // navigate('/')
    alert('This tile may be in development or is a placeholder')
}

const tileDetails: ITileProps[] = [
    {
        icon: userIcon,
        title: "Personal Info",
        description: "Provide personal details and how we can reach you",
        active: "",
        action: handleFutureFeature
    },
    {
        icon: securityIcon,
        title: "Login & security",
        description: "Update your password and secure your account",
        action: handleFutureFeature,
        active: "",
    },
    {
        icon: paymentIcon,
        title: "Payments & payouts",
        description: "Review payments, payouts, coupons, and gift cards ",
        action: handleFutureFeature,
        active: "no",
    },
    {
        icon: fileIcon,
        title: "Listing Management",
        description: "Manage your listings",
        action: handleFutureFeature,
        active: "",
    },
    {
        icon: notificationIcon,
        title: "Notifications",
        description: "Choose notification preferences and how you want to be contacted",
        action: handleFutureFeature,
        active: "no",
    },
    {
        icon: eyeIcon,
        title: "Reviews",
        description: "Manage reviews you have made",
        action: handleFutureFeature,
        active: "",
    },
    {
        icon: switchIcon,
        title: "Global preferences",
        description: "Set your default language, currency, and timezone",
        action: handleFutureFeature,
        active: "no",
    },
    {
        icon: deskIcon,
        title: "Travel for work",
        description: "Add a work email for business trip benefits",
        action: handleFutureFeature,
        active: "no",
    },
    {
        icon: graphIcon,
        title: "Professional hosting tools",
        description: "get professional tools if you manage several properties on Firebnb",
        action: handleFutureFeature,
        active: "no",
    },
    {
        icon: giftIcon,
        title: "Referral credit & coupon",
        description: "This is a fake site, so this does nothing",
        action: handleFutureFeature,
        active: "no",
    },
]

export default tileDetails
