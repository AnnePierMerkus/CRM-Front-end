import {ModalHeader} from "@/components/general/Modal/ModalHeader/ModalHeader";
import {ModalBody} from "@/components/general/Modal/ModalBody/ModalBody";
import {Modal} from "@/components/general/Modal/Modal";
import {useCustomerContext} from "@/context/customer.context";
import {CustomerBaseForm} from "@/components/customers/CustomerBaseForm";
import { CustomerFormType } from "./CustomerBaseFormSchema";

export const CustomerFormModal = () => {
    const { showFormModal, toggleShowFormModal } = useCustomerContext();

    return <Modal show={showFormModal}>
        <ModalHeader
            title={"Modal"}
            close={toggleShowFormModal}
        />
        <ModalBody>
            <CustomerBaseForm onSubmit={function (data: CustomerFormType, id?: string | undefined): void {
                throw new Error("Function not implemented.");
            } } />
        </ModalBody>
    </Modal>
}
