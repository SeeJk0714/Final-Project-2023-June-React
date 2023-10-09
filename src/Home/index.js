import { Link } from "react-router-dom";
import {
    Title,
    Space,
    Divider,
    Group,
    Button,
    Text,
    Avatar,
} from "@mantine/core";
import { useCookies } from "react-cookie";

export default function Home() {
    const [cookies, setCookies, removeCookies] = useCookies(["currentUser"]);

    return (
        <>
            <h1>Home</h1>
            <Button
                component={Link}
                to="/journal"
                // variant={page === "home" ? "filled" : "light"}
            >
                Journal
            </Button>
            <Button
                component={Link}
                to="/plan"
                // variant={page === "home" ? "filled" : "light"}
            >
                Plan
            </Button>
            <Button
                component={Link}
                to="/todolist"
                // variant={page === "home" ? "filled" : "light"}
            >
                Todo List
            </Button>
            <Button
                component={Link}
                to="/budget"
                // variant={page === "home" ? "filled" : "light"}
            >
                Budget
            </Button>
            <Group position="right">
                {cookies && cookies.currentUser ? (
                    <>
                        <Group>
                            <Avatar
                                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                                radius="xl"
                            />
                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                    {cookies.currentUser.name}
                                </Text>

                                <Text c="dimmed" size="xs">
                                    {cookies.currentUser.email}
                                </Text>
                            </div>
                        </Group>
                        <Button
                            variant={"light"}
                            onClick={() => {
                                // clear the currentUser cookie to logout
                                removeCookies("currentUser");
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            component={Link}
                            to="/login"
                            // variant={page === "login" ? "filled" : "light"}
                        >
                            Login
                        </Button>
                        <Button
                            component={Link}
                            to="/signup"
                            // variant={page === "signup" ? "filled" : "light"}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </Group>
        </>
    );
}
