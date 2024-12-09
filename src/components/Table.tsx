import {
    PlusCircleIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import "../assets/table.scss";

export interface User {
    id: string; //uuid
    name: string;
    email: string;
    age: number | undefined;
    custom_field: { label: string; value: string };
}

interface Props {
    data: User[];
    actions: {
        addAction: () => void;
        editAction: (form: User) => void;
        deleteAction: (id: string) => void;
    };
}
function Table(props: Props) {
    const { data, actions } = props;
    const { addAction, deleteAction, editAction } = actions;
    return (
        <div className="table-wrapper">
            <table className="table-component">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Custom</th>
                        <th className="table-action">
                            Actions{" "}
                            <PlusCircleIcon
                                data-testid="add-button"
                                className="icon-size-1"
                                onClick={addAction}
                            ></PlusCircleIcon>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index: number) => (
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.age}</td>
                            <td>
                                {row.custom_field && row.custom_field.label && (
                                    <>
                                        <b>{row.custom_field.label}:</b>
                                        &nbsp;
                                        {row.custom_field.value}
                                    </>
                                )}
                            </td>
                            <td>
                                <div className="table-action">
                                    <PencilIcon
                                        className="icon-size-1"
                                        onClick={() => editAction(row)}
                                    ></PencilIcon>
                                    <TrashIcon
                                        className="icon-size-1"
                                        onClick={() => deleteAction(row.id)}
                                    ></TrashIcon>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
