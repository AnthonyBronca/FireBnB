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
        action: handleFutureFeature
    },
    {
        icon: securityIcon,
        title: "Login & security",
        description: "Update your password and secure your account",
        action: handleFutureFeature
    },
    {
        icon: paymentIcon,
        title: "Payments & payouts",
        description: "Review payments, payouts, coupons, and gift cards ",
        action: handleFutureFeature
    },
    {
        icon: userIcon,
        title: "Personal Info",
        description: "Provide personal details and how we can reach you",
        action: handleFutureFeature
    },
    {
        icon: fileIcon,
        title: "Taxes",
        description: "Manage taxpayer information and tax documents",
        action: handleFutureFeature
    },
    {
        icon: notificationIcon,
        title: "Notifications",
        description: "Choose notification preferences and how you want to be contacted",
        action: handleFutureFeature
    },
    {
        icon: eyeIcon,
        title: "Privacy & sharing",
        description: "Manage your personal data, connected services, and data sharing settings",
        action: handleFutureFeature
    },
    {
        icon: switchIcon,
        title: "Global preferences",
        description: "Set your default language, currency, and timezone",
        action: handleFutureFeature
    },
    {
        icon: deskIcon,
        title: "Travel for work",
        description: "Add a work email for business trip benefits",
        action: handleFutureFeature
    },
    {
        icon: graphIcon,
        title: "Professional hosting tools",
        description: "get professional tools if you manage several properties on Firebnb",
        action: handleFutureFeature
    },
    {
        icon: giftIcon,
        title: "Referral credit & coupon",
        description: "This is a fake site, so this does nothing",
        action: handleFutureFeature
    },
]

export default tileDetails
