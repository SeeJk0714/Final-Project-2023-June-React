import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
    Container,
    Space,
    TextInput,
    Card,
    Button,
    Group,
    Grid,
    PasswordInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import Header from "../Header";
import { registerUser } from "../api/auth";

export default function SignUp() {
    const [cookies, setCookie] = useCookies(["currentUser"]);
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [visible, { toggle }] = useDisclosure(false);

    // sign up mutation
    const signMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (user) => {
            // store user data into cookies
            setCookie("currentUser", user, {
                maxAge: 60 * 60 * 24 * 30, // expire in 30 days: 60(second) * 60(minutes) * 24(hour) * 30(day)
            });

            notifications.show({
                title: "Sign Up Successful",
                color: "green",
            });
            navigate("/");
        },
        onError: (error) => {
            notifications.show({
                title: error.response.data.message,
                color: "red",
            });
        },
    });

    // handle submit
    const handleSubmit = () => {
        if (!name || !email || !password || !confirmPassword) {
            notifications.show({
                title: "Please fill in all fields",
                color: "red",
            });
        } else if (password !== confirmPassword) {
            notifications.show({
                title: "Password and Confirm Password not match",
                color: "red",
            });
        } else {
            signMutation.mutate(
                JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                })
            );
        }
    };
    return (
        <Container>
            {/* <Header title="Sign Up A New Account" page="signup" /> */}
            <Space h="50px" />
            <Card
                withBorder
                shadow="lg"
                p="20px"
                mx="auto"
                sx={{
                    maxWidth: "700px",
                }}
            >
                <Grid gutter={20}>
                    <Grid.Col span={6}>
                        <TextInput
                            value={name}
                            placeholder="Name"
                            label="Name"
                            required
                            onChange={(event) => setName(event.target.value)}
                        />
                        <Space h="20px" />
                        <TextInput
                            value={email}
                            placeholder="Email"
                            label="Email"
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <PasswordInput
                            value={password}
                            placeholder="Password"
                            label="Password"
                            visible={visible}
                            onVisibilityChange={toggle}
                            required
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        <Space h="20px" />
                        <PasswordInput
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            visible={visible}
                            onVisibilityChange={toggle}
                            required
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                        />
                    </Grid.Col>
                </Grid>
                <Space h="40px" />
                <Group position="center">
                    <Button onClick={handleSubmit}>Submit</Button>
                </Group>
            </Card>
            <Space h="20px" />
            <Group position="center">
                <Button
                    component={Link}
                    to="/"
                    variant="subtle"
                    size="xs"
                    color="gray"
                >
                    Go back to Home
                </Button>
            </Group>
        </Container>
    );
}
