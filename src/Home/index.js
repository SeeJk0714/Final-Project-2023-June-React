import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <Button
                component={Link}
                to="/login"
                // variant={page === "home" ? "filled" : "light"}
            >
                Login
            </Button>
            <Button
                component={Link}
                to="/signup"
                // variant={page === "home" ? "filled" : "light"}
            >
                SignUp
            </Button>
            <Button
                component={Link}
                to="/journal"
                // variant={page === "home" ? "filled" : "light"}
            >
                Journal
            </Button>
            <Button
                component={Link}
                to="/budget"
                // variant={page === "home" ? "filled" : "light"}
            >
                Budget
            </Button>
        </>
    );
}
