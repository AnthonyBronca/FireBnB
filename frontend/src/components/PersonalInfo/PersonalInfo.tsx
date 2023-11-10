import { useAppSelector } from "../../store";

const PersonalInfo = () => {
    const user = useAppSelector((state) => state.session.user);

    return (
        <div>
            hee hee ha ha
        </div>
    )
}

export default PersonalInfo
