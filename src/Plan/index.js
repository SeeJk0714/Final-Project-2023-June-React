import { Link } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Card, Title, Group, Button, Space, Text, Grid } from "@mantine/core";
import { fetchPlans } from "../api/plan";
import { useCookies } from "react-cookie";

export default function Plan() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const { isLoading, data: plans } = useQuery({
        queryKey: ["plans"],
        queryFn: () => fetchPlans(currentUser ? currentUser.token : ""),
    });

    return (
        <>
            <Title order={3} align="center">
                Plan
            </Title>
            <Space h="20px" />
            <Grid>
                {plans
                    ? plans.map((p) => {
                          return (
                              <Grid.Col span={4} key={p._id}>
                                  <Link
                                      to={`/showplan/${p._id}`}
                                      style={{ textDecoration: "none" }}
                                  >
                                      <Card
                                          hadow="sm"
                                          padding="lg"
                                          radius="md"
                                          withBorder
                                      >
                                          <Text>{p.title}</Text>
                                          <Text>
                                              <div
                                                  dangerouslySetInnerHTML={{
                                                      __html: p.content,
                                                  }}
                                              />
                                          </Text>
                                      </Card>
                                  </Link>
                              </Grid.Col>
                          );
                      })
                    : null}
            </Grid>

            <Space h="20px" />
            <Group>
                <Button component={Link} to="/add_plan">
                    Add Plan
                </Button>
            </Group>
            <Space h="20px" />
            <Button component={Link} to="/">
                Go back to home
            </Button>
        </>
    );
}
