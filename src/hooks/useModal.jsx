import { Modal } from "@shopify/polaris";
import { useState } from "react";

export const useModal = (children, primaryAction) => {
    const [isOpen, setIsOpen] = useState(false);
    const CustomModal = (
        <Modal
            open={isOpen}
            title="Create a new todo"
            noScroll={true}
            size="small"
            onClose={() => setIsOpen(false)}
            primaryAction={primaryAction}
            secondaryActions={[
                {
                    content: "Cancel",
                    onAction: () => setIsOpen(false),
                },
            ]}
        >
            {children}
        </Modal>
    );
    return {
        CustomModal,
        setIsOpen,
    };
};
