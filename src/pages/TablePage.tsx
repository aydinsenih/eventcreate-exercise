import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Table, { User } from "../components/Table";
import Modal from "../components/Modal";
import Form from "../components/Form";
import "../assets/table-page.scss";

interface Props {
    data: User[];
    setData: React.Dispatch<React.SetStateAction<User[]>>;
}

const emptyForm: User = {
    id: "",
    name: "",
    email: "",
    age: undefined,
    custom_field: { label: "", value: "" },
};

function TablePage(props: Props) {
    const { data, setData } = props;
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [form, setForm] = useState<User>(emptyForm);
    const [errors, setErrors] = useState<any>({});

    const validateForm = () => {
        const newErrors: any = {};
        if (!form.name) newErrors.name = "Name is required";
        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!form.age || Number(form.age) <= 0) {
            newErrors.age = "Age must be a positive number";
        }
        return newErrors;
    };

    const onSubmit = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setModalVisibility(false);
            setErrors({});
            const existingEntry = data.find((d) => d.id === form.id);
            if (existingEntry) {
                setData(data.map((d) => (d.id === form.id ? form : d)));
            } else {
                setData([{ ...form, id: uuidv4() }, ...data]);
            }
        }
    };
    const onModalHide = () => {
        setModalVisibility(false);
        setForm({ ...emptyForm });
    };

    const handleAddMember = () => {
        setForm(emptyForm);
        setModalVisibility(true);
    };
    const handleEditMember = (form: User) => {
        setForm(form);
        setModalVisibility(true);
    };
    const handleDeleteMember = (id: string) => {
        setData(data.filter((d) => d.id !== id));
    };

    const modalFooter = (
        <div className="modal-footer">
            <button onClick={onModalHide}>Cancel</button>
            <button onClick={onSubmit}>Save</button>
        </div>
    );

    return (
        <>
            <Modal
                visible={modalVisibility}
                onHide={onModalHide}
                title={"Member Form"}
                footer={modalFooter}
            >
                <Form
                    setForm={setForm}
                    form={form}
                    visible={modalVisibility}
                    errors={errors}
                ></Form>
            </Modal>
            <Table
                actions={{
                    addAction: handleAddMember,
                    editAction: handleEditMember,
                    deleteAction: handleDeleteMember,
                }}
                data={data}
            />
        </>
    );
}

export default TablePage;
