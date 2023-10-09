import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useCookies } from "react-cookie";
import {
    Card,
    Title,
    Group,
    Button,
    Space,
    Text,
    Grid,
    Container,
    Divider,
} from "@mantine/core";
import { deleteJournal, getJournal } from "../api/journal";

export default function ShowJournal() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { isLoading } = useQuery({
        queryKey: ["journal", id],
        queryFn: () => getJournal(id),
        onSuccess: (data) => {
            setTitle(data.title);
            setContent(data.content);
        },
    });

    const deleteJournalMutation = useMutation({
        mutationFn: deleteJournal,
        onSuccess: () => {
            notifications.show({
                title: "Journal Deleted",
                color: "green",
            });
            navigate("/journal");
        },
    });

    return (
        <Container>
            <Title order={3} align="center">
                {title}
            </Title>
            <Space h="20px" />
            <Divider />
            <Space h="20px" />
            <Text>
                <div
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </Text>
            <Space h="70px" />
            <Group>
                <Button component={Link} to={`/edit_journal/${id}`} size="xs">
                    edit
                </Button>
                <Button
                    size="xs"
                    color="red"
                    onClick={() => {
                        deleteJournalMutation.mutate({
                            id: id,
                            token: currentUser ? currentUser.token : "",
                        });
                    }}
                >
                    delete
                </Button>
            </Group>
            <Button
                component={Link}
                to="/"
                variant="subtle"
                size="xs"
                color="gray"
            >
                Go back to Home
            </Button>
        </Container>
    );
}
