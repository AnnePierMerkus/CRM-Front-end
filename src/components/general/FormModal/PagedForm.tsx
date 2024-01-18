import { Button, StepProps, Steps } from "antd";
import styles from "./pagedForm.module.css";
import { ReactElement, useState } from "react";

export function PagedForm({
    steps,
    items,
    submitButton,
    errorsField
}: {
    steps: StepProps[],
    items: ReactElement[],
    submitButton: ReactElement,
    errorsField?: ReactElement
}) {
    const [current, setCurrent] = useState(0);

    const onChange = (current: number) => {
        setCurrent(current);
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return <div className={styles.wrapper}>
        <div className={styles.steps}>
            <Steps
                current={current}
                onChange={onChange}
                items={steps}
            />
        </div>

        {errorsField ?? errorsField}

        <div className={styles.content}>
            {items[current]}
        </div>

        <div className={styles.actions}>
            {current > 0 && (
                <Button onClick={() => prev()}>
                    Previous
                </Button>
            )}

            {current < steps.length - 1 ? (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
            ) : submitButton}
        </div>
    </div>
}