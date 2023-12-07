import { Modal } from "@/components/general/Modal/Modal";
import { ModalBody } from "@/components/general/Modal/ModalBody/ModalBody";
import { ModalHeader } from "@/components/general/Modal/ModalHeader/ModalHeader";
import { ReactNode, createContext, useContext, useState } from "react";

type ModalStackItem = {
    title: string;
    content: ReactNode;
};

type ModalData = {
    stack: ModalStackItem[];
    addToStack: (title: string, content: ReactNode) => void;
    removeLastFromStack: () => void;
};

const defaultValues: ModalData = {
    stack: [],
    addToStack: (title: string, content: ReactNode) => { },
    removeLastFromStack: () => { },
};
const ModalContext = createContext<ModalData>(defaultValues);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [stack, setStack] = useState<ModalStackItem[]>([]);

    const addToStack = (title: string, content: ReactNode) => {
        setStack([...stack, { title, content }]);
    };

    const removeLastFromStack = () => {
        setStack(prevStack => prevStack.slice(0, -1));
    };

    return (
        <ModalContext.Provider value={{ stack, addToStack, removeLastFromStack }}>
            {children}
            <>
                {stack.length > 0 && (
                    <Modal show={stack.length > 0}>
                        <ModalHeader title={stack[stack.length - 1].title} close={removeLastFromStack} goBack={stack.length > 1 ? removeLastFromStack : undefined} />
                        <ModalBody>{stack[stack.length - 1].content}</ModalBody>
                    </Modal>
                )}
            </>
        </ModalContext.Provider>
    );
}

export const useModalContext = () => useContext(ModalContext);
