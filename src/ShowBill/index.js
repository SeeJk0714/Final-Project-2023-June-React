import { useState, useEffect, useMemo } from "react";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    Modal,
} from "@mantine/core";
import {
    TbArrowBigUpLineFilled,
    TbArrowBigDownLineFilled,
} from "react-icons/tb";
import { fetchBills, deleteBill, updateBill, getBill } from "../api/bill";
import { createBudget } from "../api/budget";

export default function ShowBill() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const [status, setStatus] = useState("Done");
    const { data: bills = [] } = useQuery({
        queryKey: ["bills"],
        queryFn: () => fetchBills(),
    });
    // const { isLoading } = useQuery({
    //     queryKey: ["bills", id],
    //     queryFn: () => getBill(id),
    //     onSuccess: (data) => {
    //         setStatus(data.status);
    //     },
    // });

    const calculateTotalIncome = () => {
        let itotal = 0;
        bills
            .filter((i) => i.model === "Income" && i.status === "Undone")
            .forEach((i) => {
                itotal += parseInt(i.amount);
            });
        return itotal;
    };

    const calculateTotalExpenses = () => {
        let etotal = 0;
        bills
            .filter((e) => e.model === "Expenses" && e.status === "Undone")
            .forEach((e) => {
                etotal += parseInt(e.amount);
            });
        return etotal;
    };

    const createBudgetMutation = useMutation({
        mutationFn: createBudget,
        onSuccess: () => {
            notifications.show({
                title: "Upload Done",
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

    const updateMutation = useMutation({
        mutationFn: updateBill,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bills"],
            });
            notifications.show({
                title: "Status Edited",
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

    const doUpload = () => {
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
        createBudgetMutation.mutate(
            JSON.stringify({
                totalAmount: calculateTotalIncome() - calculateTotalExpenses(),
                bills: bills.map((i) => i._id),
            })
        );
    };

    const deleteMutation = useMutation({
        mutationFn: deleteBill,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bills"],
            });
            notifications.show({
                title: "Bill Deleted",
                color: "green",
            });
        },
    });

    return (
        <>
            <Title order={3} align="center">
                Bill
            </Title>
            <Space h="20px" />
            <Container>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Table highlightOnHover withTableBorder>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Date</th>
                                <th>Source</th>
                                <th>Category</th>
                                <th>Amount(RM)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.filter((bill) => bill.status === "Undone")
                                .length === 0 ? (
                                <tr>
                                    <td colSpan={6}>No income added yet.</td>
                                </tr>
                            ) : (
                                bills
                                    .filter((bill) => bill.status === "Undone")
                                    .map((i) => {
                                        return (
                                            <tr key={i._id}>
                                                <td>
                                                    {i.model === "Income" ? (
                                                        <TbArrowBigUpLineFilled
                                                            color="green"
                                                            size="20px"
                                                        />
                                                    ) : (
                                                        <TbArrowBigDownLineFilled
                                                            color="red"
                                                            size="20px"
                                                        />
                                                    )}
                                                </td>
                                                <td>{i.date.slice(0, 10)}</td>
                                                <td>{i.source}</td>
                                                <td>{i.category}</td>
                                                <td>{i.amount}</td>
                                                <td>
                                                    <Button
                                                        variant="outline"
                                                        color="red"
                                                        onClick={() => {
                                                            deleteMutation.mutate(
                                                                i._id
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                            )}
                            <tr>
                                <td colSpan={4}>Total</td>
                                <td colSpan={2}>
                                    RM{" "}
                                    {calculateTotalIncome() -
                                        calculateTotalExpenses()}
                                </td>
                            </tr>
                        </tbody>
                        {/* <tbody>
                            {bills.status === "Undone" ? (
                                <tr>
                                    <td colSpan={6}>No income added yet.</td>
                                </tr>
                            ) : (
                                bills.map((i) => {
                                    return (
                                        <tr key={i._id}>
                                            <td>
                                                {i.model === "Income" ? (
                                                    <TbArrowBigUpLineFilled
                                                        color="green"
                                                        size="20px"
                                                    />
                                                ) : (
                                                    <TbArrowBigDownLineFilled
                                                        color="red"
                                                        size="20px"
                                                    />
                                                )}
                                            </td>
                                            <td>{i.date.slice(0, 10)}</td>
                                            <td>{i.source}</td>
                                            <td>{i.category}</td>
                                            <td>{i.amount}</td>
                                            <td>
                                                <Button
                                                    variant="outline"
                                                    color="red"
                                                    onClick={() => {
                                                        deleteMutation.mutate(
                                                            i._id
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            <tr>
                                <td colSpan={4}>Total</td>
                                <td colSpan={2}>
                                    RM{" "}
                                    {calculateTotalIncome() -
                                        calculateTotalExpenses()}
                                </td>
                            </tr>
                        </tbody> */}
                    </Table>
                </Card>
                <Modal
                    opened={opened}
                    onClose={close}
                    size="70%"
                    title="Upload"
                >
                    <Text>Name: </Text>
                    <Space h="20px" />
                    <Text>Email: </Text>
                    <Space h="20px" />
                    <Text>
                        Total Amount: RM
                        {calculateTotalIncome() - calculateTotalExpenses()}
                    </Text>
                    <Space h="20px" />

                    {bills ? (
                        bills.map((i) => {
                            return (
                                <>
                                    <Card
                                        shadow="sm"
                                        padding="lg"
                                        radius="md"
                                        withBorder
                                    >
                                        <Group>
                                            {i.model === "Income" ? (
                                                <TbArrowBigUpLineFilled
                                                    color="green"
                                                    size="20px"
                                                />
                                            ) : (
                                                <TbArrowBigDownLineFilled
                                                    color="red"
                                                    size="20px"
                                                />
                                            )}

                                            <Text>{i.source}</Text>
                                            <Text>RM{i.amount}</Text>
                                        </Group>
                                    </Card>
                                    <Space h="10px" />
                                </>
                            );
                        })
                    ) : (
                        <Text size="20px" color="red">
                            No bill added yet.
                        </Text>
                    )}
                    <Space h="20px" />
                    <Group>
                        <Button
                            color="green"
                            onClick={() => {
                                doUpload();
                                // handleUpdateProduct();
                            }}
                        >
                            Done
                        </Button>

                        <Button variant="outline" color="red" onClick={close}>
                            close
                        </Button>
                    </Group>
                </Modal>
                <Space h="30px" />
                <Group>
                    <Button component={Link} to="/income">
                        Income
                    </Button>
                    <Button component={Link} to="/expenses">
                        Expenses
                    </Button>
                    <Button
                        component={Link}
                        to="/budget"
                        variant="outline"
                        color="gray"
                    >
                        Go back to Budget
                    </Button>
                    <Button variant="outline" onClick={open}>
                        Upload
                    </Button>
                </Group>
            </Container>
        </>
    );
}
