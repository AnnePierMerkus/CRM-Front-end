"use client";

import { DataTableColumnType } from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import { useCustomerContext } from "@/context/customer.context";
import { Button, Card, Spin, message } from "antd";
import { createCustomer, deleteCustomer, updateCustomer as updateCustomerCall } from "@/services/customer/CustomerService";
import { useModalContext } from "@/context/modal.context";
import { CustomerBaseForm } from "@/components/customers/CustomerBaseForm";
import { CustomerFormType } from "@/components/customers/CustomerBaseFormSchema";
import NavBar from "@/components/general/NavBar/NavBar";
import { CustomersTable } from "@/components/customers/CustomersTable";

export default function Page() {

    const { customers, setSelectedID, updateCustomer, getCustomer, isLoading } =
        useCustomerContext();
    const { addToStack, removeLastFromStack } = useModalContext();

    const create = (data: CustomerFormType) => {
        createCustomer(data).then((newCustomer) => {
            updateCustomer(newCustomer);
            message.success(
                "Created customer '" +
                (newCustomer.firstName + " " + newCustomer.lastName) +
                "'"
            );
            removeLastFromStack();
        });
    }

    const editAction = (data: CustomerFormType, id?: string) => {
        if (id !== undefined)
            updateCustomerCall(id, data).then((updatedCustomer) => {
                updateCustomer(updatedCustomer, id);
                removeLastFromStack();
                message.success(
                    "Updated customer '" +
                    (updatedCustomer.firstName + " " + updatedCustomer.lastName) +
                    "'"
                );
            });
    }

    const edit = (id: string) => {
        addToStack("Edit customer", <CustomerBaseForm onSubmit={editAction} selected={getCustomer(id)} id={id} />);
    };

    const deleteAction = (id: string) => {
        deleteCustomer(id).then((r) => {
            message.success("Deleted customer");
            setSelectedID(undefined);
            updateCustomer(undefined, id);
        });
    };

    return (
        <>
            <NavBar title="Customers" 
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        onClick={() =>
                            addToStack(
                                "Add customer",
                                <CustomerBaseForm
                                    onSubmit={create}
                                />
                            )
                        }
                    >
                        Create customer
                    </Button>,
                ]}
            />
            <Spin spinning={isLoading}>
                <Card
                    style={{ width: "100%" }}
                >
                    <CustomersTable customers={customers} edit={edit}deleteAction={deleteAction}/>
                </Card>
            </Spin>
        </>
    );
}
