import { useAppSelector } from '../../store';
import './UserDashboard.css'

const UserDashboard = () => {
    const user = useAppSelector((state) => state.session.user);

    const handleFutureFeature = () => {
        alert("This feature is in development and will be released soon!");
    }

    return (
        <div>
            <h1>
                Account
            </h1>
            {user && <div>
                {`${user.firstName} ${user.lastName}, ${user.email} * `}
                <span onClick={handleFutureFeature}>Go to Profile</span>
            </div>}

            <div className="card-container">
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Personal Info</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Login & security</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Payments & payouts</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Taxes</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Notifications</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Privacy & sharing</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Global preferences</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Travel for work</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Professional hosting tools</span>
                </div>
                <div onClick={handleFutureFeature} className='account-card'>
                    <span>Referral credit & coupon</span>
                </div>
            </div>

            <div>
                <p>Need to deactivate your account?</p>
                <span onClick={handleFutureFeature}>Take care of that now</span>
            </div>
        </div>
    )
}

export default UserDashboard;
