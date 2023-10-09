import { useState, useMemo } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useCookies } from "react-cookie";
import {
    Container,
    Title,
    Space,
    Card,
    TextInput,
    NumberInput,
    Divider,
    Button,
    Group,
    Image,
    Text,
    Grid,
    Checkbox,
} from "@mantine/core";

import {
    fetchLists,
    addList,
    ClickList,
    UnclickList,
    deleteList,
} from "../api/list";
import { getTodolist, updateTodoList, deleteTodoList } from "../api/todolist";

export default function ShowList() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [title, setTitle] = useState("");
    const [todos, setTodos] = useState([]);
    const { isLoading } = useQuery({
        queryKey: ["todolist", id],
        queryFn: () => getTodolist(id),
        onSuccess: (data) => {
            console.log(data);
            setTitle(data.title);
            setList(data.lists);
        },
    });

    const createListMutation = useMutation({
        mutationFn: addList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todolists"],
            });
            notifications.show({
                title: "List Added",
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

    const handleAddNewList = async (event) => {
        event.preventDefault();
        createListMutation.mutate(
            JSON.stringify({
                name: name,
                todolists: id,
            })
        );
        setName("");
    };

    const unupdateMutation = useMutation({
        mutationFn: UnclickList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lists"],
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ClickList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lists"],
            });
        },
    });

    const deleteListMutation = useMutation({
        mutationFn: deleteList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lists"],
            });
            notifications.show({
                title: "List Deleted",
                color: "green",
            });
        },
    });

    const deleteTodoListMutation = useMutation({
        mutationFn: deleteTodoList,
        onSuccess: () => {
            notifications.show({
                title: "Todo List Deleted",
                color: "green",
            });
            navigate("/todolist");
        },
    });

    return (
        <Container>
            <Space h="50px" />
            <TextInput
                radius="lg"
                placeholder="Type your title here..."
                variant="unstyled"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
            <Button
                size="xs"
                color="red"
                onClick={() => {
                    deleteTodoListMutation.mutate(id);
                }}
            >
                delete
            </Button>
            <Space h="50px" />
            <Grid justify="center">
                <Grid.Col span={8}>
                    <TextInput
                        radius="lg"
                        placeholder="Type your list here..."
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={1}>
                    <Button color="gray" onClick={handleAddNewList}>
                        Add
                    </Button>
                </Grid.Col>
            </Grid>

            <Space h="20px" />
            {list ? (
                list.map((l, index) => {
                    return (
                        <Card shadow="sm" padding="sm" withBorder key={index}>
                            <Group>
                                {l.status === true ? (
                                    <Button
                                        variant="gradient"
                                        gradient={{ from: "blue", to: "gray" }}
                                        size="xs"
                                        radius="50px"
                                        onClick={() => {
                                            unupdateMutation.mutate(l._id);
                                        }}
                                    >
                                        click
                                    </Button>
                                ) : (
                                    <Button
                                        variant="gradient"
                                        gradient={{
                                            from: "yellow",
                                            to: "pink",
                                        }}
                                        size="xs"
                                        radius="50px"
                                        onClick={() => {
                                            updateMutation.mutate(l._id);
                                        }}
                                    >
                                        Unclick
                                    </Button>
                                )}
                                {/* <Checkbox /> */}
                                {l.status === true ? (
                                    <Text td="line-through">{l.name}</Text>
                                ) : (
                                    <Text>{l.name}</Text>
                                )}
                                <Button
                                    variant="subtle"
                                    size="xs"
                                    color="gray"
                                    onClick={() => {
                                        deleteListMutation.mutate(l._id);
                                    }}
                                >
                                    delete
                                </Button>
                            </Group>
                        </Card>
                    );
                })
            ) : (
                <Text>NOt list</Text>
            )}
            <Space h="20px" />
            {/* <Button onClick={handleUpdateTodoList}>Edit</Button> */}
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
            <Space h="100px" />
        </Container>
    );
}
