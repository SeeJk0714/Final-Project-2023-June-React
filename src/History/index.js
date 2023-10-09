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
    Modal,
} from "@mantine/core";
import {
    TbArrowBigUpLineFilled,
    TbArrowBigDownLineFilled,
} from "react-icons/tb";
import { createBudget, fetchBudgets } from "../api/budget";
import { getUser } from "../api/auth";

export default function History() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const queryClient = useQueryClient();
    const [email, setEmail] = useState(currentUser ? currentUser.email : "");
    const { data: budgets = [] } = useQuery({
        queryKey: ["budgets"],
        queryFn: () => fetchBudgets(currentUser ? currentUser.token : ""),
    });

    const createMutation = useMutation({
        mutationFn: createBudget,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["budgets"],
            });
            notifications.show({
                title: "Budget List Added",
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

    const handleAddNewBudgetList = async (event) => {
        event.preventDefault();
        createMutation.mutate({
            data: JSON.stringify({
                customerEmail: email,
            }),
            token: currentUser ? currentUser.token : "",
        });
    };

    return (
        <>
            <Title order={3} align="center">
                Manager Budget Lists
            </Title>
            <Space h="20px" />
            <Container>
                <Group>
                    <Button onClick={handleAddNewBudgetList}>
                        Create New Budget List
                    </Button>
                </Group>
                {budgets
                    ? budgets.map((b) => {
                          return (
                              <div key={b._id}>
                                  <Link
                                      to={`/showbill/${b._id}`}
                                      style={{ textDecoration: "none" }}
                                  >
                                      <Card shadow="sm" padding="lg" withBorder>
                                          <Text>{b.date.slice(0, 10)}</Text>
                                      </Card>
                                  </Link>
                              </div>
                          );
                      })
                    : null}

                {/* {budgets
                    ? budgets.map((b) => {
                          return (
                              <Card
                                  shadow="sm"
                                  padding="lg"
                                  withBorder
                                  key={b._id}
                              >
                                  <Text>{b.date.slice(0, 10)}</Text>
                                  {b.bills
                                      ? b.bills.map((bill, index) => (
                                            <Card withBorder key={index}>
                                                <Group>
                                                    {bill.model === "Income" ? (
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

                                                    <Text size="20px">
                                                        {bill.source}
                                                    </Text>
                                                </Group>
                                                <Group grow>
                                                    <Text
                                                        style={{
                                                            paddingLeft: "35px",
                                                        }}
                                                    >
                                                        {bill.date.slice(
                                                            11,
                                                            16
                                                        )}
                                                    </Text>
                                                    {bill.model === "Income" ? (
                                                        <Text
                                                            color="green"
                                                            ta="right"
                                                            fw={700}
                                                        >
                                                            RM{bill.amount}
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            color="red"
                                                            ta="right"
                                                            fw={700}
                                                        >
                                                            - RM{bill.amount}
                                                        </Text>
                                                    )}
                                                </Group>
                                            </Card>
                                        ))
                                      : null}
                                  <Space h="20px" />
                                  <Text ta="right" size="20px">
                                      RM {b.totalAmount}
                                  </Text>
                              </Card>
                          );
                      })
                    : null} */}
            </Container>
        </>
    );
}
