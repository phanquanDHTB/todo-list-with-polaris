import { Modal } from "@shopify/polaris";
import { useState } from "react";

export const useModal = ({ content, primaryAction, title = "Add new item", secondaryActions = [], size = "small" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const customModal = (
        <Modal
            open={isOpen}
            title={title}
            noScroll={true}
            size={size}
            onClose={() => setIsOpen(false)}
            primaryAction={primaryAction}
            secondaryActions={[...secondaryActions]}
        >
            {content}
        </Modal>
    );
    return {
        customModal,
        setIsOpen,
    };
};
