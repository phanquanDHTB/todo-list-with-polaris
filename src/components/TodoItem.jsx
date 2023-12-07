import { Button, Card, Checkbox, Tag, Text } from "@shopify/polaris";
import "./styles.scss";

const TodoItem = ({ todoInfor, isCheck, setCheck, handleDelete, handleComplete }) => {
    return (
        <Card>
            <Text as="h2" variant="bodyMd" truncate={true}>
                <Checkbox checked={isCheck} onFocus={setCheck} />
                {todoInfor.title}
            </Text>
            <div className={todoInfor.completed ? "todo__button--group done__tag" : "todo__button--group"}>
                <Tag>{todoInfor.completed ? "Done" : "Pending"}</Tag>
                <Button disabled={todoInfor.completed} onClick={handleComplete}>
                    Complete
                </Button>
                <Button variant="primary" tone="critical" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </Card>
    );
};

export default TodoItem;
