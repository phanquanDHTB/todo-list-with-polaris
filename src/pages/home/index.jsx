import { Badge, Button, ButtonGroup, Page, ResourceItem, ResourceList, Text } from "@shopify/polaris";
import { useFetchTodoList } from "../../hooks/useFetchTodoList";
import "./styles.scss";
import { useMemo, useRef, useState } from "react";
import TodoForm from "../../components/todoForm/TodoForm";
import { fetchApi } from "../../utils/fetchApi";

const TodoPage = () => {
    const { todos, setTodos, loading } = useFetchTodoList("http://localhost:5000/api/v1/todos");
    const [selectedTodos, setSelectedTodos] = useState([]);

    const todoFormRef = useRef();

    const handleComplete = async (ids, method) => {
        try {
            const res = await fetchApi("http://localhost:5000/api/v1/todo", method, ids);
            const newTodos = await res.json();
            if (res.status === 200) {
                setTodos(newTodos.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleDelete = async (ids, method) => {
        const searchParams = new URLSearchParams({ ids: ids.join(",") });
        try {
            const res = await fetchApi("http://localhost:5000/api/v1/todo?" + searchParams.toString(), method, {});
            if (res.status === 200) {
                setTodos((todos) => todos.filter((todo) => !ids.includes(todo.id)));
                setSelectedTodos((selectList) => selectList.filter((select) => !ids.includes(select)));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = async (data) => {
        try {
            const res = await fetchApi("http://localhost:5000/api/v1/todo", "POST", { title: data, completed: false });
            const newTodo = await res.json();
            if (res.status === 200) {
                setTodos((todos) => [...todos, newTodo.data]);
            }
        } catch (err) {
            console.log(err);
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
                        todoFormRef.current.setIsOpen(true);
                    }}
                >
                    Create
                </Button>
            }
        >
            {/* <Button onClick={() => handleComplete(selectedTodos, "PUT")}>test</Button> */}
            <ResourceList
                items={todos}
                renderItem={renderItem}
                selectable
                onSelectionChange={setSelectedTodos}
                selectedItems={selectedTodos}
                loading={loading}
                // promotedBulkActions={promotedBulkActions}
                bulkActions={bulkActions}
            />
            <TodoForm
                ref={todoFormRef}
                callbackCreate={(data) => {
                    handleAdd(data);
                }}
            />
        </Page>
    );
};

export default TodoPage;
