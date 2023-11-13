'use client';


type EmployeeBookingAddFormProps = {
    createBooking: (booking: unknown) => void;
    toggleModal: () => void;
    onSubmit: (data: unknown) => void;
}

export const EmployeeBookingAddForm = ({createBooking, toggleModal}: EmployeeBookingAddFormProps) => {
}
