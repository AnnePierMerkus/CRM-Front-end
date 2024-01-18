import {ResetPasswordForm} from "@/components/authentication/ResetPasswordForm/ResetPasswordForm";

export default function ResetPassword({ params }: { params: { token: string } }) {
    return <>
        <h1>Reset password</h1>
        <ResetPasswordForm token={params.token}/>
    </>
}