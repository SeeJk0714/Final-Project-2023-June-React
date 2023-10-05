import { Link } from "react-router-dom";
import { Card, Title, Group, Button, Space } from "@mantine/core";

export default function Budget() {
    return (
        <>
            <Title order={3} align="center">
                Budget
            </Title>
            <Space h="20px" />
            <Group>
                <Button component={Link} to="/showbill">
                    Show Bill
                </Button>
                <Button component={Link} to="/history">
                    History
                </Button>
            </Group>
        </>
    );
}
