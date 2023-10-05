import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    Title,
    Group,
    Button,
    Space,
    TextInput,
    NumberInput,
    Container,
    Select,
    Table,
} from "@mantine/core";
import { addBill } from "../api/bill";

export default function Expenses() {
    const navigate = useNavigate();
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [model, setModel] = useState("Expenses");

    const createMutation = useMutation({
        mutationFn: addBill,
        onSuccess: () => {
            notifications.show({
                title: "Expenses Added",
                color: "green",
            });
            navigate("/showbill");
        },
        onError: (error) => {
            notifications.show({
                title: error.response.data.message,
                color: "red",
            });
        },
    });

    const handleAddNewExpenses = async (event) => {
        event.preventDefault();
        createMutation.mutate(
            JSON.stringify({
                source: source,
                amount: amount,
                category: category,
                model: model,
            })
        );
    };

    return (
        <>
            <Title order={3} align="center">
                Expenses
            </Title>
            <Space h="20px" />
            <Container>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Space h="50px" />
                    <TextInput
                        radius="lg"
                        placeholder="Type your expenses here..."
                        value={source}
                        onChange={(event) => {
                            setSource(event.target.value);
                        }}
                    />
                    <Space h="20px" />
                    <NumberInput
                        radius="lg"
                        placeholder="Type your amount here..."
                        value={amount}
                        onChange={setAmount}
                    />
                    <Space h="20px" />
                    <Select
                        radius="lg"
                        placeholder="Select a Category"
                        data={[
                            "Food & Drink",
                            "Transport",
                            "Insurance",
                            "Personal Care",
                            "Housing",
                            "Shopping",
                            "Entertainment",
                            "Other",
                        ]}
                        maxDropdownHeight={90}
                        value={category}
                        onChange={setCategory}
                    />

                    <Space h="30px" />
                    <Button
                        color="blue"
                        fullWidth
                        mt="md"
                        radius="md"
                        onClick={handleAddNewExpenses}
                    >
                        Add Expenses
                    </Button>
                </Card>
                <Space h="30px" />
                <Group>
                    <Button
                        component={Link}
                        to="/showbill"
                        variant="outline"
                        color="gray"
                    >
                        Go back to Bill
                    </Button>
                    <Button
                        component={Link}
                        to="/budget"
                        variant="outline"
                        color="gray"
                    >
                        Go back to Budget
                    </Button>
                </Group>
            </Container>
        </>
    );
}
