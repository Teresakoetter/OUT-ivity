import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user?: string
    isLoading: boolean

}

function CircularProgress() {
    return null;
}

export default function ProtectedRoutes({ user, isLoading }: Props) {
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
}