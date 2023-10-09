import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
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
    Text,
} from "@mantine/core";
import { addBill } from "../api/bill";
import { getBudget } from "../api/budget";

export default function Income() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const navigate = useNavigate();
    const { id } = useParams();
    const [source, setSource] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [model, setModel] = useState("Income");
    const { isLoading } = useQuery({
        queryKey: ["budget", id],
        queryFn: () => getBudget(id),
    });

    const createMutation = useMutation({
        mutationFn: addBill,
        onSuccess: () => {
            notifications.show({
                title: "Income Added",
                color: "green",
            });
            navigate(`/showbill/${id}`);
        },
        onError: (error) => {
            notifications.show({
                title: error.response.data.message,
                color: "red",
            });
        },
    });

    const handleAddNewIncome = async (event) => {
        event.preventDefault();
        createMutation.mutate(
            JSON.stringify({
                source: source,
                amount: amount,
                category: category,
                model: model,
                budgets: id,
            })
        );
    };

    return (
        <>
            <Title order={3} align="center">
                Income
            </Title>
            <Space h="20px" />
            <Container>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Space h="50px" />
                    <TextInput
                        radius="lg"
                        placeholder="Type your income here..."
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
                        data={["Salary", "Other"]}
                        value={category}
                        onChange={setCategory}
                    />
                    <Space h="30px" />
                    <Button
                        color="blue"
                        fullWidth
                        mt="md"
                        radius="md"
                        onClick={handleAddNewIncome}
                    >
                        Add Income
                    </Button>
                </Card>
                <Space h="30px" />
                <Group>
                    <Button
                        component={Link}
                        to={`/showbill/${id}`}
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
