import { Modal, TextField } from "@shopify/polaris";
import { forwardRef, useImperativeHandle, useState } from "react";

const TodoForm = forwardRef((props, ref) => {
    const { callbackCreate } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    useImperativeHandle(
        ref,
        () => {
            return {
                setIsOpen,
            };
        },
        []
    );
    return (
        <Modal
            open={isOpen}
            title="Create a new todo"
            noScroll={true}
            size="small"
            onClose={() => setIsOpen(false)}
            primaryAction={{
                content: "Create",
                onAction: () => {
                    callbackCreate(inputValue);
                    setIsOpen(false);
                    setInputValue("");
                },
            }}
            secondaryActions={[
                {
                    content: "Cancel",
                    onAction: () => {
                        setIsOpen(false);
                        setInputValue("");
                    },
                },
            ]}
        >
            <Modal.Section>
                <TextField value={inputValue} onChange={(e) => setInputValue(e)} />
            </Modal.Section>
        </Modal>
    );
});
TodoForm.propTypes = { callbackCreate: () => {} };

TodoForm.displayName = TodoForm;

export default TodoForm;
