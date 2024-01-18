import { forgotPassword } from "@/services/authentication/AuthenticationService";
import { EmployeeType } from "@/types/employeeType";
import { Button, List, message } from "antd";

export function EmployeeList({ employees, viewAction }: { employees: EmployeeType[], viewAction: (employee: EmployeeType) => void }) {
    return <List
        style={{ backgroundColor: "white" }}
        bordered
        itemLayout="horizontal"
        dataSource={employees}
        renderItem={employee => (
            <List.Item
                actions={[
                    <Button type="ghost" onClick={() => {
                        console.debug(employee)
                        forgotPassword({ email: employee.email })
                            .then(() => {
                                message.success("Password reset email sent");
                            }
                            ).catch((reason) => {
                                message.error(reason?.response?.data?.message);
                            });
                    }} key="button">Send password reset</Button>,
                    <Button type="primary" onClick={() => viewAction(employee)} key="button">View</Button>,
                    <Button type="primary" danger onClick={console.debug} key="button" disabled>Delete</Button>
                ]}
            >
                <List.Item.Meta
                    title={<a>{employee.firstName} {employee.lastName}</a>}
                    description={employee.phoneNumber}
                />
            </List.Item>
        )}
    >
    </List>;
}
