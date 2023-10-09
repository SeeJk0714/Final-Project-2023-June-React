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
import { deletePlan, getPlan } from "../api/plan";

export default function ShowPlan() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const { isLoading } = useQuery({
        queryKey: ["plan", id],
        queryFn: () => getPlan(id),
        onSuccess: (data) => {
            setTitle(data.title);
            setContent(data.content);
            setStartDate(data.startDate);
            setEndDate(data.endDate);
            setStartTime(data.startTime);
            setEndTime(data.endTime);
        },
    });

    const deletePlanMutation = useMutation({
        mutationFn: deletePlan,
        onSuccess: () => {
            notifications.show({
                title: "Plan Deleted",
                color: "green",
            });
            navigate("/plan");
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
            <Text>
                {startDate ? new Date(startDate).toLocaleDateString() : ""}
            </Text>
            <Text>{endDate ? new Date(endDate).toLocaleDateString() : ""}</Text>
            <Text>{startTime}</Text>
            <Text>{endTime}</Text>

            <Space h="70px" />
            <Group>
                <Button component={Link} to={`/edit_plan/${id}`} size="xs">
                    edit
                </Button>
                <Button
                    size="xs"
                    color="red"
                    onClick={() => {
                        deletePlanMutation.mutate({
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
