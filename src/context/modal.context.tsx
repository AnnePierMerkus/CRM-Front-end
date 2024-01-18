// import { Modal } from "@/components/general/Modal/Modal";
// import { ModalActions } from "@/components/general/Modal/ModalActions/ModalActions";
// import { ModalBody } from "@/components/general/Modal/ModalBody/ModalBody";
// import { ModalHeader } from "@/components/general/Modal/ModalHeader/ModalHeader";
import { Modal } from "antd";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type ModalStackItem = {
    title: string;
    content: ReactNode;
    width?: number;
    actions?: ReactNode;
};

type ModalData = {
    stack: ModalStackItem[];
    addToStack: (title: string, content: ReactNode, width?: number, actions?: ReactNode) => void;
    removeLastFromStack: () => void;
};

const defaultValues: ModalData = {
    stack: [],
    addToStack: (title: string, content: ReactNode, actions?: ReactNode) => { },
    removeLastFromStack: () => { },
};
const ModalContext = createContext<ModalData>(defaultValues);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [stack, setStack] = useState<ModalStackItem[]>([]);

    const addToStack = (title: string, content: ReactNode, width?: number ,actions?: ReactNode) => {
        setStack((prevStack) => [...prevStack, { title, content, width,actions }]);
    };
    const removeLastFromStack = () => {
        setStack((prevStack) => prevStack.slice(0, -1));
    };

    return (
        <ModalContext.Provider value={{ stack, addToStack, removeLastFromStack }}>
            {children}
            <>
                {stack.length > 0 && (
                    <Modal
                        open={stack.length > 0}
                        title={stack[stack.length - 1].title}
                        onCancel={removeLastFromStack}
                        footer={stack[stack.length - 1].actions ? stack[stack.length - 1].actions : null}
                        width={stack[stack.length - 1].width}
                    >
                        {stack[stack.length - 1].content}
                    </Modal>
                    // <Modal show={stack.length > 0}>
                    //     <ModalHeader
                    //         title={stack[stack.length - 1].title}
                    //         close={removeLastFromStack}
                    //         goBack={stack.length > 1 ? removeLastFromStack : undefined}
                    //     />
                    //     <ModalBody>{stack[stack.length - 1].content}</ModalBody>
                    //     {stack[stack.length - 1].actions && (
                    //         <ModalActions>{stack[stack.length - 1].actions}</ModalActions>
                    //     )}
                    // </Modal>
                )}
            </>
        </ModalContext.Provider>
    );
}

export const useModalContext = () => useContext(ModalContext);
