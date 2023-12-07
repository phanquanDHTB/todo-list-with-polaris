import { Button, Checkbox, Page } from "@shopify/polaris";
import { useFetchTodoList } from "../../hooks/useFetchTodoList";
import "./styles.scss";
import TodoItem from "../../components/TodoItem";
import { useEffect, useRef, useState } from "react";
import TodoForm from "../../components/TodoForm";

const TodoPage = () => {
    const { todos, setTodos } = useFetchTodoList();
    const [checkAll, setCheckAll] = useState(false);
    const [listChecked, setListChecked] = useState([]);

    const setCheckTodo = (id) => {
        if (listChecked.includes(id)) {
            setListChecked((listChecked) => listChecked.filter((idTodo) => id !== idTodo));
        } else {
            setListChecked((listChecked) => [...listChecked, id]);
        }
    };

    const handleComlete = () => {
        setTodos((todos) =>
            todos.map((todo) => {
                if (listChecked.includes(todo.id)) {
                    todo.completed = true;
                }
                return todo;
            })
        );
    };
    const handleDelete = () => {
        setTodos((todos) => todos.filter((todo) => !listChecked.includes(todo.id)));
    };

    const todoFormRef = useRef();

    const createTodo = (content) => {
        setTodos((todos) => [{ title: content, id: todos[todos.length - 1].id + 1, completed: false }, ...todos]);
    };

    useEffect(() => {
        if (listChecked.length === todos.length) {
            setCheckAll(true);
        } else {
            setCheckAll(false);
        }
    }, [listChecked.length]);

    return (
        <Page fullWidth>
            <div className="todo__container">
                <div className="todo__header">
                    <p>Todos</p>
                    <Button onClick={() => todoFormRef.current.setIsOpen(true)}>Create todo</Button>
                </div>
                <div className="todo__select">
                    {listChecked.length ? (
                        <p>Selected {listChecked.length} todos</p>
                    ) : (
                        <p>Showing {todos.length} todos</p>
                    )}
                    {listChecked.length ? (
                        <div>
                            <Button onClick={handleComlete}>Complete</Button>
                            <Button variant="primary" tone="critical" onClick={handleDelete}>
                                Delete
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                    <Checkbox
                        label={"Select All"}
                        checked={checkAll}
                        onFocus={() => {
                            if (!checkAll) {
                                setCheckAll(true);
                                setListChecked(todos.map((todo) => todo.id));
                            } else {
                                setCheckAll(false);
                                setListChecked([]);
                            }
                        }}
                    />
                </div>
                {todos?.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todoInfor={todo}
                        isCheck={listChecked.includes(todo.id)}
                        setCheck={() => setCheckTodo(todo.id)}
                        handleComplete={() =>
                            setTodos((todos) =>
                                todos.map((todoItem) => {
                                    if (todoItem.id === todo.id) {
                                        todoItem.completed = true;
                                    }
                                    return todoItem;
                                })
                            )
                        }
                        handleDelete={() => {
                            setTodos((todos) => todos.filter((todoItem) => todoItem.id !== todo.id));
                        }}
                    />
                ))}
            </div>
            <TodoForm ref={todoFormRef} callbackCreate={createTodo} />
        </Page>
    );
};

export default TodoPage;
