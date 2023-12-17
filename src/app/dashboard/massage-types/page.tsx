'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import {MassageTypeBaseForm} from "@/components/massage-types/MassageTypeBaseForm";
import {Button, message} from 'antd';
import {useMassageTypeContext} from "@/context/massage-types.context";
import {useModalContext} from "@/context/modal.context";

import {MassageFormType} from "@/components/massage-types/MassageTypeBaseFormSchema";
import {createMassageType, deleteMassageType, updateMassageType as updateMassageTypeCall} from "@/services/massage-types/MassageTypesService";
import {CustomerBaseForm} from "@/components/customers/CustomerBaseForm";

export default function Page() {
    const { addToStack, removeLastFromStack } = useModalContext();

    const columns: DataTableColumnType[] = [
        {
            name: "name",
            title: "Name"
        },
        {
            name: "price",
            title: "Price (MYR)"
        },
        {
            name: "newPrice",
            title: "New Price (MYR)"
        },
        {
            name: "activationDate",
            title: "Price Change"
        }

    ]

    const { massageTypes, updateMassageType, getMassageType } =
        useMassageTypeContext();

    const create = (data: MassageFormType) => {
        createMassageType(data).then((newMassageType) => {
            updateMassageType(newMassageType);
            message.success(
                "Created massage type '" +
                (newMassageType.name) +
                "'"
            );
            removeLastFromStack();
        });
    }

    const editAction = (data: MassageFormType, id?: string) => {
        if (id !== undefined)
            updateMassageTypeCall(id, data).then((updatedMassageType) => {
                updateMassageType(updatedMassageType, id);
                removeLastFromStack();
                message.success(
                    "Updated massage type '" +
                    (updatedMassageType.name) +
                    "'"
                );
            });
    }

    const showModal = () => {
        addToStack("Add massage type", <MassageTypeBaseForm onSubmit={create} />);
    }

    const addBtn = (
        <Button type={"primary"} onClick={showModal}>
            Add
        </Button>
    );

    const edit = (id: string) => {
        addToStack("Edit massage type", <MassageTypeBaseForm onSubmit={editAction} selected={getMassageType(id)} id={id} />);
    };

    const deleteAction = (id: string) => {
        deleteMassageType(id).then((r) => {
            message.success("Deleted massage type");
            updateMassageType(undefined, id);
        });
    };

    return <>
        <DataTable columns={columns} rows={massageTypes} size={15} addBtn={addBtn} editAction={edit} deleteAction={deleteAction}/>
    </>
}
