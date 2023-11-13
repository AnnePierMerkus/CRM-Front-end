import { Modal } from "../Modal/Modal";
import { ModalBody } from "../Modal/ModalBody/ModalBody";
import { ModalHeader } from "../Modal/ModalHeader/ModalHeader";

type FormModalProps = {
  show: boolean;
  toggleShow: () => void;
  title: string;
  children: React.ReactNode;
};

export const FormModal = ({
  show,
  toggleShow,
  title,
  children,
}: FormModalProps) => {
  return (
    <Modal show={show}>
      <ModalHeader title={title} close={toggleShow} />
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
