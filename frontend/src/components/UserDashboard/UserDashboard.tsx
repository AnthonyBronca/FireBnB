import { useAppSelector } from '../../store';

const UserDashboard = () => {
    const user = useAppSelector((state) => state.session.user);

    console.log(user);
    return (
        <div>hehe haha</div>
    )
}

export default UserDashboard;
