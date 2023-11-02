'use client';

import {useState} from 'react';
import Breadcrumb from "@/components/general/Breadcrumb/Breadcrumb";
import Employee from '@/components/employees/employee/Employee';


export default function Page() {
    const [breadcrumbPath, setBreadcrumbPath] = useState(['Employees', 'EmployeeName']);

    const handleNavigate = (index: number) => { 
        if (index === 0) {
            window.history.back();
        }
      };

    return (
        <>
            <div>
                <Breadcrumb path={breadcrumbPath} onNavigate={handleNavigate} />
                {}
            </div>
            <Employee></Employee>
        </>
    );
}
