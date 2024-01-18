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

type CustomerSelectProps = {
    beforeChange?: () => void;
} & HTMLFieldProps<string, HTMLDivElement>

function CustomerSelect({ onChange, value, disabled, beforeChange, error }: CustomerSelectProps) {
    const { customers, isLoading } = useCustomerContext();

    return (
        <SelectField
            value={value}
            onChange={(value) => {
                if (beforeChange !== undefined) {
                    beforeChange();
                }
                onChange(value);
            }}
            options={customers.map((customer) => ({
                value: customer.ID,
                label: customer.firstName + " " + customer.lastName,
            }))}
            isLoading={isLoading}
            isDisabled={disabled}
            label="Select existing customer"
            error={error !== undefined && error != null}
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
