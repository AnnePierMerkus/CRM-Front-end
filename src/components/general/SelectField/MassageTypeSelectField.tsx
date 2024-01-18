import { HTMLFieldProps, connectField } from "uniforms";
import { SelectField } from "./SelectField";
import { useEffect, useState } from "react";
import { getBookingTypes } from "@/services/booking/BookingService";

type MassageTypeSelectProps = HTMLFieldProps<string, HTMLDivElement>;

function MassageTypeSelect({ onChange, value, error }: MassageTypeSelectProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [options, setOptions] = useState<
        { value: string; label: string }[] | undefined
    >();

    useEffect(() => {
        getBookingTypes()
            .then((r) => {
                setOptions(
                    r.map((bookingType) => ({
                        value: bookingType.ID,
                        label: bookingType.name,
                    }))
                );
                setIsLoading(false);
            })
            .catch(() => {
                setOptions(undefined);
                setIsLoading(false);
            });
    }, []);

    return (
        <SelectField
            value={value}
            onChange={onChange}
            options={options}
            isLoading={isLoading}
            label="Massage Type"
            error={error !== undefined && error != null}
        />
    );
}

export const MassageTypeSelectField = connectField(MassageTypeSelect);
