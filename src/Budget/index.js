import { Link } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { Card, Title, Group, Button, Space, Text } from "@mantine/core";
import { fetchBills } from "../api/bill";
import { fetchBudgets } from "../api/budget";

export default function Budget() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const { data: bills = [] } = useQuery({
        queryKey: ["bills"],
        queryFn: () => fetchBills(currentUser ? currentUser.token : ""),
    });

    const calculateTotalBills = () => {
        let BillTotal = 0;
        bills.forEach((e) => {
            BillTotal += parseInt(e.amount);
        });
        return BillTotal;
    };

    return (
        <>
            <Title order={3} align="center">
                Budget
            </Title>
            <Space h="20px" />
            <Text size="30px">Total: {calculateTotalBills()}</Text>
            <Space h="20px" />
            <Group>
                <Button component={Link} to="/showbill">
                    Show Bill
                </Button>
                <Button component={Link} to="/history">
                    History
                </Button>
            </Group>
            <Space h="20px" />
            <Button component={Link} to="/">
                Go back to home
            </Button>
        </>
    );
}
