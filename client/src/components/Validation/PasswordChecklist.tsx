import PasswordChecklist from "react-password-checklist";

type Props = {
    password: string;
};

const PasswordChecklistComp = ({password}: Props) => {
return (
    <PasswordChecklist
    
    rules={["capital", "specialChar", "minLength", "number"]}
    minLength={8}
    value={password}
/>
)

}

export default PasswordChecklistComp;