import { Badge, Button, ButtonGroup, Modal, Page, ResourceItem, ResourceList, Text, TextField } from "@shopify/polaris";
import "./styles.scss";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData.js";
import { useModal } from "../../hooks/useModal";

const Home = () => {
    const url = import.meta.env.VITE_URL;

    const [todos, setTodos] = useState([]);
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            const { data } = await fetchData(url + "todos");
            setTodos(data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleComplete = async (ids) => {
        try {
            setIsLoading(true);
            const { data } = await fetchData(url + "todos", "PUT", ids);
            setTodos(data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (ids) => {
        const searchParams = new URLSearchParams({ ids: ids.join(",") });
        try {
            setIsLoading(true);
            await fetchData(url + "todos?" + searchParams.toString(), "DELETE");
            setTodos((prevTodos) => prevTodos.filter((todo) => !ids.includes(todo.id)));
            setSelectedTodos((prevSelecteds) => prevSelecteds.filter((selected) => !ids.includes(selected)));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async () => {
        try {
            setIsLoading(true);
            const { data } = await fetchData(url + "todo", "POST", {
                title: inputValue.trim(),
                completed: false,
            });
            setTodos((prevTodos) => [...prevTodos, data]);
            setInputValue("");
            setIsOpen(false);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const bulkActions = [
        {
            content: "Complete",
            onAction: () => {
                handleComplete(selectedTodos);
            },
        },
        {
            content: "Delete",
            onAction: () => {
                handleDelete(selectedTodos);
            },
        },
    ];

    const { customModal, setIsOpen } = useModal({
        content: (
            <Modal.Section>
                <TextField value={inputValue} onChange={(e) => setInputValue(e)} />
            </Modal.Section>
        ),
        primaryAction: {
            content: "Create",
            onAction: handleAdd,
        },
        title: "Add new todo",
        secondaryActions: [
            {
                content: "Cancel",
                onAction: () => setIsOpen(false),
            },
        ],
    });

    const renderItem = (item) => {
        const { id, title, completed } = item;
        return (
            <ResourceItem key={[id, completed]} id={id}>
                <Text as="h2" variant="bodyMd" truncate={true}>
                    {title}
                </Text>
                <ButtonGroup>
                    {completed ? <Badge tone="success">Completed</Badge> : <Badge>Pending</Badge>}
                    <Button
                        disabled={completed}
                        onClick={() => {
                            handleComplete([id]);
                        }}
                    >
                        Complete
                    </Button>
                    <Button
                        variant="primary"
                        tone="critical"
                        onClick={() => {
                            handleDelete([id]);
                        }}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </ResourceItem>
        );
    };

    return (
        <Page
            title="Todos"
            primaryAction={
                <Button
                    tone="success"
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    Create
                </Button>
            }
        >
            {customModal}
            <ResourceList
                items={todos}
                renderItem={renderItem}
                selectable
                onSelectionChange={setSelectedTodos}
                selectedItems={selectedTodos}
                loading={isLoading}
                bulkActions={bulkActions}
            />
        </Page>
    );
};

export default Home;
