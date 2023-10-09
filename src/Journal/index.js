import { Link } from "react-router-dom";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Card, Title, Group, Button, Space, Text, Grid } from "@mantine/core";
import { fetchJournals } from "../api/journal";
import { useCookies } from "react-cookie";

export default function Journal() {
    const [cookies] = useCookies(["currentUser"]);
    const { currentUser } = cookies;
    const { isLoading, data: journals } = useQuery({
        queryKey: ["journals"],
        queryFn: () => fetchJournals(currentUser ? currentUser.token : ""),
    });

    return (
        <>
            <Title order={3} align="center">
                Journal
            </Title>
            <Space h="20px" />
            <Grid>
                {journals
                    ? journals.map((j) => {
                          return (
                              <Grid.Col span={4} key={j._id}>
                                  <Link
                                      to={`/showjournal/${j._id}`}
                                      style={{ textDecoration: "none" }}
                                  >
                                      <Card
                                          hadow="sm"
                                          padding="lg"
                                          radius="md"
                                          withBorder
                                      >
                                          <Text>{j.title}</Text>
                                          <Text>
                                              <div
                                                  dangerouslySetInnerHTML={{
                                                      __html: j.content,
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
                <Button component={Link} to="/add_journal">
                    Add Journal
                </Button>
            </Group>
            <Space h="20px" />
            <Button component={Link} to="/">
                Go back to home
            </Button>
        </>
    );
}
