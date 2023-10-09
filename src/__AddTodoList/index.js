import { useState, useMemo } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
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

import { addList, fetchLists, updateList, deleteList } from "../api/list";
import { addTodoList } from "../api/todolist";

export default function AddTodoList() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("Done");
    const { data: lists = [] } = useQuery({
        queryKey: ["lists"],
        queryFn: () => fetchLists(),
    });

    const createMutation = useMutation({
        mutationFn: addTodoList,
        onSuccess: () => {
            notifications.show({
                title: "Todo List Added",
                color: "green",
            });
            navigate("/todolist");
        },
        onError: (error) => {
            notifications.show({
                title: error.response.data.message,
                color: "red",
            });
        },
    });

    // const handleAddNewTodoList = async (event) => {
    //     event.preventDefault();
    //     createMutation.mutate(
    //         JSON.stringify({
    //             title: title,
    //             lists: lists.map((i) => i._id),
    //         })
    //     );
    // };

    const createListMutation = useMutation({
        mutationFn: addList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["lists"],
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
            })
        );
        setName("");
    };

    const updateMutation = useMutation({
        mutationFn: updateList,
        onSuccess: () => {
            navigate("/todolist");
        },
        onError: (error) => {
            notifications.show({
                title: error.response.data.message,
                color: "red",
            });
        },
    });

    const handleAddNewTodoList = () => {
        // let error = false;
        // if (!date) {
        //     error = "Please fill out all the required fields.";
        // }

        // if (error) {
        //     notifications.show({
        //         title: error,
        //         color: "red",
        //     });
        // } else {
        //     createBudgetMutation.mutate(
        //         JSON.stringify({
        //             totalAmount:
        //                 calculateTotalIncome() - calculateTotalExpenses(),
        //             bills: bills.map((i) => i._id),
        //         })
        //     );
        // }

        //upload to budget
        createMutation.mutate(
            JSON.stringify({
                title: title,
                lists: lists
                    .filter((list) => list.status === "Undone")
                    .map((i) => i._id),
            })
        );

        updateMutation.mutate({
            lists: lists,
            data: JSON.stringify({
                status: status,
            }),
        });
    };

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

    return (
        <Container>
            <Space h="50px" />
            <Title order={2} align="center">
                Add New List
            </Title>
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
            <TextInput
                radius="lg"
                placeholder="Type your title here..."
                variant="unstyled"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
            <Space h="20px" />
            {lists.filter((list) => list.status === "Undone").length === 0 ? (
                <Text>NOt list</Text>
            ) : (
                lists
                    .filter((list) => list.status === "Undone")
                    .map((l) => {
                        return (
                            <Card
                                shadow="sm"
                                padding="sm"
                                withBorder
                                key={l._id}
                            >
                                <Group>
                                    <Checkbox />
                                    <Text>{l.name}</Text>
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
            )}
            <Space h="20px" />
            <Button onClick={handleAddNewTodoList}>Add to Todo List</Button>
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
