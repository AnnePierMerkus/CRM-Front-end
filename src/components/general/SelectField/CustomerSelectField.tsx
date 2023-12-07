import { HTMLFieldProps, connectField } from "uniforms";
import { SelectField } from "./SelectField";
import {
    CustomerProvider,
    useCustomerContext,
} from "@/context/customer.context";
import { useModalContext } from "@/context/modal.context";
import { CustomerBaseForm } from "@/components/customers/CustomerBaseForm";
import { CustomerFormType } from "@/components/customers/CustomerBaseFormSchema";
import { createCustomer } from "@/services/customer/CustomerService";
import { message } from "antd";
import { useEffect } from "react";

type CustomerSelectProps = HTMLFieldProps<string, HTMLDivElement>;

function CustomerSelect({ onChange, value }: CustomerSelectProps) {
    const { customers, isLoading } = useCustomerContext();
    const { addToStack, removeLastFromStack } = useModalContext();

    const add = (data: CustomerFormType) => {
        createCustomer(data).then((newCustomer) => {
            message.success(
                "Created customer '" +
                (newCustomer.firstName + " " + newCustomer.lastName) +
                "'"
            );
            removeLastFromStack();
        });
    }


    const handleCreate = (inputValue: string) => {
        addToStack("Add customer", <CustomerBaseForm onSubmit={add} />);
    };

    return (
        <SelectField
            value={value}
            onChange={onChange}
            options={customers.map((customer) => ({
                value: customer.ID,
                label: customer.firstName + " " + customer.lastName,
            }))}
            isLoading={isLoading}
            handleCreate={handleCreate}
            label="Customer"
        />
    );
}

function CustomerSelectWrapper(props: CustomerSelectProps) {
    return (
        <>
            <CustomerProvider>
                <CustomerSelect {...props} />
            </CustomerProvider>
        </>
    );
}

export const CustomerSelectField = connectField(CustomerSelectWrapper);
