import { useEffect, useState } from "react";
import { User } from "./Table";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import "../assets/form.scss";

interface Props {
    form: User;
    setForm: React.Dispatch<React.SetStateAction<User>>;
    visible: boolean;
    errors: any;
}

function Form(props: Props) {
    const { form, setForm, visible, errors } = props;
    const [customFieldActivated, setCustomFieldActivated] =
        useState<boolean>(false);

    useEffect(() => {
        if (!visible) {
            setCustomFieldActivated(false);
        } else if (form.custom_field && form.custom_field.label) {
            setCustomFieldActivated(true);
        }
    }, [visible]);

    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleCustomFieldInputChange = (e: {
        target: { name: any; value: any };
    }) => {
        const { name, value } = e.target;
        const customFieldName =
            name === "custom_field_label" ? "label" : "value";
        setForm({
            ...form,
            custom_field: {
                ...form.custom_field,
                [customFieldName]: value,
            },
        });
    };

    const handleCustomField = () => {
        setForm({ ...form, custom_field: { label: "", value: "" } });
        setCustomFieldActivated(!customFieldActivated);
    };

    return (
        <div className="member-form">
            <div className="form-element">
                <label>Name</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                />
                {errors.name && (
                    <span className="form-error">{errors.name}</span>
                )}
            </div>
            <div className="form-element">
                <label>Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                />
                {errors.email && (
                    <span className="form-error">{errors.email}</span>
                )}
            </div>
            <div className="form-element">
                <label>Age</label>
                <input
                    name="age"
                    type="number"
                    value={form.age || ""}
                    onChange={handleInputChange}
                    placeholder="30"
                />
                {errors.age && <span className="form-error">{errors.age}</span>}
            </div>
            <div className="form-element custom-element">
                <div className="custom-field">
                    <label>Custom Field</label>
                    <div>
                        {!customFieldActivated ? (
                            <PlusCircleIcon
                                data-testid="add-button"
                                className="icon-size-1"
                                onClick={handleCustomField}
                            ></PlusCircleIcon>
                        ) : (
                            <MinusCircleIcon
                                className="icon-size-1"
                                onClick={handleCustomField}
                            ></MinusCircleIcon>
                        )}
                    </div>
                </div>
                {customFieldActivated && (
                    <>
                        <input
                            name="custom_field_label"
                            value={form.custom_field && form.custom_field.label}
                            onChange={handleCustomFieldInputChange}
                            placeholder="Field Name"
                        />
                        <input
                            name="custom_field_value"
                            value={form.custom_field && form.custom_field.value}
                            onChange={handleCustomFieldInputChange}
                            placeholder="Field Value"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Form;
