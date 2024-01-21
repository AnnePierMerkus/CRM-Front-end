import {ModalHeader} from "@/components/general/Modal/ModalHeader/ModalHeader";
import {ModalBody} from "@/components/general/Modal/ModalBody/ModalBody";
import {Modal} from "@/components/general/Modal/Modal";
import {useEmployeeContext} from "@/context/employee.context";
import {CustomerBaseForm} from "@/components/customers/CustomerBaseForm";
import { EmployeeAddForm } from "./EmployeeAddForm";

export const EmployeeFormModal = () => {
    const { showFormModal, toggleShowFormModal } = useEmployeeContext();

    return <Modal show={showFormModal}>
        <ModalHeader
            title={"Modal"}
            close={toggleShowFormModal}
        />
        <ModalBody>
            <EmployeeAddForm onSubmit={console.debug} />
        </ModalBody>
    </Modal>
}
