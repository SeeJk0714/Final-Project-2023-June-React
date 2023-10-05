import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
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
    Text,
} from "@mantine/core";
import {
    TbArrowBigUpLineFilled,
    TbArrowBigDownLineFilled,
} from "react-icons/tb";
import { fetchBudgets } from "../api/budget";

export default function History() {
    const { data: budgets = [] } = useQuery({
        queryKey: ["bills"],
        queryFn: () => fetchBudgets(),
    });

    return (
        <>
            <Title order={3} align="center">
                History
            </Title>
            <Space h="20px" />
            <Container>
                {budgets
                    ? budgets.map((b) => {
                          return (
                              <Card
                                  shadow="sm"
                                  padding="lg"
                                  withBorder
                                  key={b._id}
                              >
                                  <Text>{b.date.slice(0, 10)}</Text>
                                  {b.bills.map((bill, index) => (
                                      <div key={index}>
                                          <Card withBorder>
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
                                                      {bill.date.slice(11, 16)}
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
                                      </div>
                                  ))}
                                  <Space h="20px" />
                                  <Text ta="right" size="20px">
                                      RM {b.totalAmount}
                                  </Text>
                              </Card>
                          );
                      })
                    : null}
            </Container>
        </>
    );
}
