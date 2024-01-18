"use client";

import { MassageFormCreateType, MassageTypeCreateForm } from "@/components/massage-types/MassageTypeCreateForm";
import { Button, Card, Spin, message } from "antd";
import { useMassageTypeContext } from "@/context/massage-types.context";
import { useModalContext } from "@/context/modal.context";

import {
    createMassageType,
    deleteMassageType,
    getMassageTypePrices,
    updateNameMassageType,
    updatePriceMassageType,
} from "@/services/massage-types/MassageTypesService";
import { MassageTypesTable } from "@/components/massage-types/MassageTypesTable";
import NavBar from "@/components/general/NavBar/NavBar";
import { MassageTypeUpdateNameForm } from "@/components/massage-types/MassageTypeUpdateNameForm";
import { MassageTypePriceTable } from "@/components/massage-types/MassageTypePriceTable";
import { MassageTypePrice } from "@/types/massageType";
import { MassageTypeUpdatePriceForm } from "@/components/massage-types/MassageTypeUpdatePriceForm";

export default function Page() {
    const { addToStack, removeLastFromStack } = useModalContext();

    const { isLoading, massageTypes, updateMassageType, getMassageType } =
        useMassageTypeContext();

    const create = (data: MassageFormCreateType) => {
        createMassageType(data).then((newMassageType) => {
            updateMassageType(newMassageType);
            message.success("Created massage type '" + newMassageType.name + "'");
            removeLastFromStack();
        });
    };

    const editNameAction = (id: string, name: string) => {
        updateNameMassageType(id, name).then((updatedMassageType) => {
            updateMassageType(updatedMassageType, id);
            removeLastFromStack();
            message.success(
                "Updated massage type '" + updatedMassageType.name + "'"
            );
        });
    };

    const editPriceAction = (id: string, price: number, activeFrom: Date) => {
        updatePriceMassageType(id, price, activeFrom).then((updatedMassageType) => {
            updateMassageType(updatedMassageType, id);
            removeLastFromStack();
            message.success(
                "Updated massage type '" + updatedMassageType.name + "'"
            );
        });
    };

    const showModal = () => {
        addToStack("Add massage type", <MassageTypeCreateForm onSubmit={create} />);
    };

    const editName = (id: string) => {
        addToStack(
            "Edit massage name type",
            <MassageTypeUpdateNameForm
                onSubmit={(data) => editNameAction(id, data.name.toString())}
                selected={getMassageType(id)}
            />
        );
    };

    const showPrices = (id: string) => {
        getMassageTypePrices(id).then((prices: MassageTypePrice[]) => {
            addToStack(
                "Show massage type prices",
                <MassageTypePriceTable
                    prices={prices}
                />
            );
        })
    }

    const editPrice = (id: string) => {
        addToStack(
            "Edit massage price type",
            <MassageTypeUpdatePriceForm
                onSubmit={(data) => editPriceAction(id, data.price as number, data.activeFrom)}
            />
        );
    }

    const deleteAction = (id: string) => {
        deleteMassageType(id).then((r) => {
            message.success("Deleted massage type");
            updateMassageType(undefined, id);
        });
    };

    return (
        <>
            <NavBar
                title="Massage types"
                extra={[
                    <Button key="1" type="primary" onClick={() => showModal()}>
                        Create massage type
                    </Button>,
                ]}
            />
            <Spin spinning={isLoading}>
                <Card style={{ width: "100%" }}>
                    <MassageTypesTable
                        messageTypes={massageTypes}
                        editName={editName}
                        editPrice={editPrice}
                        showPrices={showPrices}
                        deleteAction={deleteAction}
                    />
                </Card>
            </Spin>
        </>
    );
}
