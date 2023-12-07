import {ModalHeader} from "@/components/general/Modal/ModalHeader/ModalHeader";
import {ModalBody} from "@/components/general/Modal/ModalBody/ModalBody";
import {Modal} from "@/components/general/Modal/Modal";

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
