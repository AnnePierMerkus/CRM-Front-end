import React, {createContext, useContext, useEffect, useState} from "react";
import {customers as getCustomers} from "@/services/customer/CustomerService";
import {CustomerType, SelectedCustomerType} from "@/types/customerType";

type CustomerData = {
    customers: CustomerType[],
    isLoading: boolean,
    showFormModal: boolean,
    toggleShowFormModal: () => void,
    updateCustomer: (customer?: CustomerType, id?: string) => void,
    setSelectedID: (id?: string) => void,
    selected?: SelectedCustomerType,
}

const defaultValues: CustomerData = {
    customers: [],
    isLoading: true,
    showFormModal: false,
    toggleShowFormModal: (): void => {
    },
    updateCustomer: (customer?: CustomerType, id?: string): void => {
    },
    setSelectedID: (id?: string): void => {
    },
}

const CustomerContext = createContext<CustomerData>(defaultValues);

export function CustomerProvider({children}: { children: React.ReactNode }) {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [showFormModal, setShowFormModal] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [selected, setSelectedCustomer] = useState<SelectedCustomerType>();
    const [selectedID, setSelectedID] = useState<string>();

    useEffect(() => {
        // @ts-ignore
        getCustomers().then(r => {
            setCustomers(r)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (selectedID == undefined) {
            setSelectedCustomer(undefined)
        } else {
            setSelectedCustomer({
                ID: selectedID,
                data: customers.find(c => c.ID === selectedID)
            })
        }
    }, [selectedID]);

    const toggleShowFormModal = () => {
        setShowFormModal(!showFormModal)
    }

    /**
     * 1. When customer is defined and id is undefined then add the customer.
     * 2. When customer is defined and id is defined then edit the customer.
     * 3. When customer is undefined and id is defined then delete the customer.
     * @param customer
     * @param id
     */
    const updateCustomer = (customer?: CustomerType, id?: string) => {
        if (customer !== undefined) {
            if (id === undefined) {
                setCustomers((prevCustomers) => [...prevCustomers, customer]);
            } else {
                setCustomers((prevCustomers) => [...prevCustomers.map(prevCustomer => {
                    {
                        if (prevCustomer.ID === id) {
                            return customer
                        }
                        return prevCustomer;
                    }
                })])
            }
        } else {
            setCustomers((prevCustomers) =>
                [...prevCustomers.filter(prevCustomer => prevCustomer.ID !== id)])
        }
    }



    return (
        <CustomerContext.Provider
            value={{customers, isLoading, showFormModal, toggleShowFormModal, updateCustomer, setSelectedID, selected}}>
            {children}
        </CustomerContext.Provider>
    );
}

export const useCustomerContext = () => useContext(CustomerContext)


