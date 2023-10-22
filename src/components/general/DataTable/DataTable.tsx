'use client';

import {DataTableColumnType} from "@/types/data-table-column-type";
import styles from "./dataTable.module.css";
import {ReactNode, useCallback, useMemo, useState} from "react";
import Input from "@/components/general/Input/Input";
import {Button, Popconfirm} from 'antd';
import {ModalHeader} from "@/components/general/Modal/ModalHeader/ModalHeader";
import {ModalBody} from "@/components/general/Modal/ModalBody/ModalBody";
import {Modal} from "@/components/general/Modal/Modal";

interface PropsType {
    columns: DataTableColumnType[],
    rows: any[],
    size: number,
    form?: ReactNode,
    add?: boolean,
    edit?: boolean,
    canDelete?: boolean,
}

interface DataTableSort {
    name: string,
    type: "ASC" | "DESC"
}

export default function DataTable({columns, rows, size, add, form, edit, canDelete}: PropsType) {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<DataTableSort>();
    const [showModal, setShowModal] = useState<boolean>(false)

    const handleSort = (name: string) => {
        setSort(prevSort => {
            if (prevSort && prevSort.name === name) {
                return {name, type: prevSort.type === 'ASC' ? 'DESC' : 'ASC'};
            }
            return {name, type: 'ASC'};
        });
    };

    const filteredRows = useMemo(() => {
        if (search !== '') {
            setPage(1)

            const searchString = search.trim().toLowerCase();

            return rows.filter(r => {
                return columns.some(column => {
                    const value = r[column.name];
                    if (typeof value === 'string' || typeof value === 'number') {
                        return value.toString().toLowerCase().includes(searchString);
                    }
                    // Handle other variable types if necessary
                    return false;
                });
            });
        }
        return rows;
    }, [rows, search, columns]);

    const sortedRows = useMemo(() => {
        if (sort) {
            return [...filteredRows].sort((a, b) => {
                const aValue = a[sort.name];
                const bValue = b[sort.name];

                if (aValue < bValue) return sort.type === 'ASC' ? -1 : 1;
                if (aValue > bValue) return sort.type === 'ASC' ? 1 : -1;

                return 0;
            });
        }

        return filteredRows;
    }, [filteredRows, sort]);

    const paginatedRows = useMemo(() => {
        const start = (page - 1) * size;
        const end = start + size;
        return sortedRows.slice(start, end);
    }, [sortedRows, page, size]);

    const pagination = useCallback(() => {
        const totalPages = Math.ceil(filteredRows.length / size);
        return (
            <div className={styles.pagination}>
                <button className={styles.paginationButton} disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index}
                        className={page === index + 1 ? styles.activePageButton : styles.pageButton}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={styles.paginationButton}
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        );
    }, [filteredRows.length, page, size]);

    const modal = useCallback(() => {
        return <Modal show={showModal}>
            <ModalHeader
                title={"Modal"}
                close={() => setShowModal(false)}
            />
            <ModalBody>
                {form}
            </ModalBody>
        </Modal>
    }, [showModal])

    return <>
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Input className={styles.search} onChange={(event) => setSearch(event.target.value)}/>
                {add ? <Button type={"primary"} onClick={() => setShowModal(true)}>Add</Button> : ''}
            </div>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                <tr className={styles.tableHeadRow}>
                    {columns.map((column, index) => (
                        <th key={index} className={styles.tableHeadColumn} onClick={() => handleSort(column.name)}>
                            {column.title} {sort && sort.name === column.name ? (sort.type === 'ASC' ? '↑' : '↓') : ''}
                        </th>
                    ))}
                    {
                        edit || canDelete ? <th className={styles.tableHeadColumn}></th> : null
                    }
                </tr>
                </thead>
                <tbody className={styles.tableBody}>
                {paginatedRows.map((row, rI) => {
                    return <tr key={rI} className={styles.tableBodyRow}>
                        {columns.map((column, cI) => {
                            return <td key={cI} className={styles.tableBodyColumn}>{row[column.name]}</td>
                        })}
                        {
                            edit || canDelete ? <td className={`${styles.tableBodyColumn} ${styles.tableBodyColumnActions}`}>
                                {
                                    edit ? <a href="#" onClick={() => setShowModal(true)}>edit</a> : null
                                }
                                {
                                    canDelete ?
                                        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                                            <a href="#">delete</a>
                                        </Popconfirm>
                                        : null
                                }
                            </td> : null
                        }
                    </tr>
                })}
                </tbody>
            </table>
            {pagination()}
        </div>
        {add || edit ? modal() : ''}
    </>

}
