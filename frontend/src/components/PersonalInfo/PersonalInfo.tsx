import { useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
    const user = useAppSelector((state) => state.session.user);

    const navigate = useNavigate();

    const handleFutureFeature = () => {
        alert("This feature is in development and will be released soon!");
    }

    const handleAccountNav = () => {
        navigate("/account");
    }

    return (
        <div>
            <div>
                <div>
                    <span onClick={handleAccountNav}>Account</span>
                    <span>{` > `}</span>
                    <span>Personal Info</span>
                </div>
                <h1>Personal Info</h1>
            </div>
            <div>
                <div>
                    <h3>Legal Name</h3>
                    <span>{`${user?.firstName} ${user?.lastName}`}</span>
                    <span onClick={handleFutureFeature}>Edit</span>
                </div>
                <div>
                    <h3>Email Address</h3>
                    <span>{user?.email}</span>
                    <span onClick={handleFutureFeature}>Edit</span>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo
