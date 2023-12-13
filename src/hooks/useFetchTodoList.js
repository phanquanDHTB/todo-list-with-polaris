import { useEffect, useState } from "react";

export const useFetchTodoList = (uri) => {
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([]);

    async function loadTodoes() {
        try {
            setLoading(true);
            const response = await fetch(uri);
            const todoesList = await response.json();
            setTodos(todoesList.data);
            setFetched(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTodoes();
    }, []);

    return { todos, loading, fetched, setTodos };
};
