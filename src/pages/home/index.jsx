import { Badge, Button, ButtonGroup, Modal, Page, ResourceItem, ResourceList, Text, TextField } from "@shopify/polaris";
import { useFetchTodoList } from "../../hooks/useFetchTodoList";
import "./styles.scss";
import { useEffect, useState } from "react";
import { fetchApi } from "../../utils/fetchApi";
import { useModal } from "../../hooks/useModal";

const TodoPage = () => {
    const url = import.meta.env.VITE_URL;

    const { todos, setTodos, loading } = useFetchTodoList(url + "todos");
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const { CustomModal, setIsOpen } = useModal(
        <Modal.Section>
            <TextField value={inputValue} onChange={(e) => setInputValue(e)} />
        </Modal.Section>,
        {
            content: "Create",
            onAction: () => handleAdd(inputValue),
        }
    );

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    const handleComplete = async (ids, method) => {
        try {
            setIsLoading(true);
            const res = await fetchApi(url + "todo", method, ids);
            const newTodos = await res.json();
            if (res.status === 200) {
                setTodos(newTodos.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (ids, method) => {
        const searchParams = new URLSearchParams({ ids: ids.join(",") });
        try {
            setIsLoading(true);
            const res = await fetchApi(url + "todo?" + searchParams.toString(), method, {});
            if (res.status === 200) {
                setTodos((todos) => todos.filter((todo) => !ids.includes(todo.id)));
                setSelectedTodos((selectList) => selectList.filter((select) => !ids.includes(select)));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (data) => {
        try {
            setIsLoading(true);
            const res = await fetchApi(url + "todo", "POST", { title: data, completed: false });
            const newTodo = await res.json();
            if (res.status === 200) {
                setTodos((todos) => [...todos, newTodo.data]);
                setInputValue("");
                setIsOpen(false);
            }
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
                handleComplete(selectedTodos, "PUT");
            },
        },
        {
            content: "Delete",
            onAction: () => {
                handleDelete(selectedTodos, "DELETE");
            },
        },
    ];

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
                            handleComplete([id], "PUT");
                        }}
                    >
                        Complete
                    </Button>
                    <Button
                        variant="primary"
                        tone="critical"
                        onClick={() => {
                            handleDelete([id], "DELETE");
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
            {CustomModal}
            <ResourceList
                items={todos}
                renderItem={renderItem}
                selectable
                onSelectionChange={setSelectedTodos}
                selectedItems={selectedTodos}
                loading={isLoading}
                // promotedBulkActions={promotedBulkActions}
                bulkActions={bulkActions}
            />
        </Page>
    );
};

export default TodoPage;
