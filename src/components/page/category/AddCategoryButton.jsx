import React, { useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';

function AddCategoryButton() {
    const {userRole} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDescription, setNewCategoryDescription] = useState("");
    const { categories, setCategories } = useAppContext();

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSave = () => {
        const newCategory = {
            id: categories.length + 1,
            CategoryId: categories.length + 1,
            Name: newCategoryName,
            Description: newCategoryDescription
        };
        setCategories([...categories, newCategory]);
        setIsOpen(false);
        setNewCategoryName("");
        setNewCategoryDescription("")
    }

    if(userRole !== "admin"){
        return null;
    }

    return (
        <>
            <Button className="mb-4 w-full" onClick={handleOpen}> + Nueva Categoría</Button>
            <Modal isOpen={isOpen} handleClose={handleClose}>
                <Input
                    placeholder="Nombre de la Categoría"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="mb-2"
                />
                <Input
                    placeholder="Descripción de la Categoría"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    className="mb-2"
                />
                <div className="flex justify-end">
                    <Button onClick={handleSave}>Guardar</Button>
                </div>
            </Modal>
        </>
    )
}
export default AddCategoryButton;
