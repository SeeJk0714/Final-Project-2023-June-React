import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
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
    Modal,
    TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { fetchTodolists, addTodoList } from "../api/todolist";

export default function TodoList() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [opened, { open, close }] = useDisclosure(false);
    const [email, setEmail] = useState(currentUser ? currentUser.email : "");
    const [title, setTitle] = useState("");
    const { data: todolists } = useQuery({
        queryKey: ["todolists"],
        queryFn: () => fetchTodolists(currentUser ? currentUser.token : ""),
    });

    const createMutation = useMutation({
        mutationFn: addTodoList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todolists"],
            });
            notifications.show({
                title: "Todo List Added",
                color: "green",
            });
        },
        onError: (error) => {
            notifications.show({
                title: error.response.data.message,
                color: "red",
            });
        },
    });

    const handleAddNewTodoList = async (event) => {
        event.preventDefault();
        createMutation.mutate({
            data: JSON.stringify({
                title: title,
                customerEmail: email,
            }),
            token: currentUser ? currentUser.token : "",
        });
        setTitle("");
    };

    return (
        <Container>
            <Title order={3} align="center">
                Todo List
            </Title>
            <Space h="20px" />
            <Grid>
                {todolists
                    ? todolists.map((t) => {
                          return (
                              <Grid.Col span={4} key={t._id}>
                                  <Link
                                      to={`/showlist/${t._id}`}
                                      style={{ textDecoration: "none" }}
                                  >
                                      <Card
                                          hadow="sm"
                                          padding="lg"
                                          radius="md"
                                          withBorder
                                      >
                                          <Text>{t.title}</Text>
                                          <ul>
                                              {t.lists.map((l) => (
                                                  <li key={l._id}>{l.name}</li>
                                              ))}
                                          </ul>
                                      </Card>
                                  </Link>
                              </Grid.Col>
                          );
                      })
                    : null}
            </Grid>
            <Modal opened={opened} onClose={close} title="Add Todo List">
                <TextInput
                    radius="lg"
                    placeholder="Type your title here..."
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                <Space h="20px" />
                <Button onClick={handleAddNewTodoList}>Add</Button>
            </Modal>
            <Space h="20px" />
            <Group>
                <Button onClick={open}>Add Todo List</Button>
            </Group>
            <Space h="20px" />
            <Button component={Link} to="/">
                Go back to home
            </Button>
        </Container>
    );
}
