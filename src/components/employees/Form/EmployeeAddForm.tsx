"use client";

import { AutoForm } from "uniforms-antd";
import { EmployeeAddFormType, bridge as schema } from "./EmployeeAddFormSchema";
import { createEmployee } from "@/services/employee/EmployeeService";
import { useEmployeeContext } from "@/context/employee.context";
import { message } from "antd";
import { EmployeeType } from "@/types/employeeType";

export const EmployeeAddForm = ({
  onSubmit,
}: {
  onSubmit: (data: EmployeeAddFormType) => void;
}) => {
  return <AutoForm schema={schema} onSubmit={onSubmit} />;
};