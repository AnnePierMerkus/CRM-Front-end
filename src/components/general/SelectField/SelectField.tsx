import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { useRef } from "react";

export function SelectField({
                                value,
                                options,
                                onChange,
                                isLoading,
                                handleCreate,
                                label,
                                isDisabled,
                                error
                            }: {
    value: string | undefined;
    options: { value: string; label: string }[] | undefined;
    onChange: (value: string | undefined) => void;
    isLoading: boolean;
    handleCreate?: (inputValue: string) => void | undefined;
    label: string;
    isDisabled?: boolean;
    error?: boolean
}) {
    const selectRef = useRef<any>(null);

    const field = () => {
        if (handleCreate !== undefined)
            return (
                <CreatableSelect
                    ref={selectRef}
                    isClearable
                    options={options}
                    value={options?.find((option) => option.value === value)}
                    onChange={(option) => {
                        onChange(option?.value);
                    }}
                    isLoading={isLoading}
                    onCreateOption={handleCreate}
                    isDisabled={isLoading || isDisabled}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            borderColor: error ? '#ff4d4f' : provided.borderColor,
                            boxShadow: error ? '0 0 0 2px rgba(255,77,79,.2)' : provided.boxShadow,
                        })
                    }}
                />
            )
        return (
            <Select
                ref={selectRef}
                isClearable
                options={options}
                value={options?.find((option) => option.value === value)}
                onChange={(option) => {
                    onChange(option?.value);
                }}
                isLoading={isLoading}
                isDisabled={isLoading || isDisabled}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        borderColor: error ? '#ff4d4f' : provided.borderColor,
                        boxShadow: error ? '0 0 0 2px rgba(255,77,79,.2)' : provided.boxShadow,
                    })
                }}
            />
        );
    }



    return <div className="ant-form-item ant-form-item-with-help" style={{marginBottom: '12px'}} >
        <div className="ant-row ant-form-item-row">
            <label className="ant-form-item-label" htmlFor={selectRef.current?.props.id}>{label}</label>
            <div className="ant-col ant-form-item-control">
                {field()}
            </div>
        </div>
    </div>
}
