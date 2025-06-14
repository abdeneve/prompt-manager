import React, { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import { useAppContext } from '../../../context/AppContext';

function AddCommandButton({ prompt }) {
    const { userRole, commands, setCommands } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [newCommandName, setNewCommandName] = useState("");

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSave = () => {
        const nextSequence = commands.filter(c => c.PromptId === prompt.PromptId).length + 1;
        const newCommand = {
            id: commands.length + 1,
            CommandId: commands.length + 1,
            PromptId: prompt.PromptId,
            Name: newCommandName,
            Command: '',
            Sequence: nextSequence
        };
        setCommands([...commands, newCommand]);
        setIsOpen(false);
        setNewCommandName("");

    }

    if (userRole !== "admin") {
        return null;
    }

    return (
        <>
            <Button onClick={handleOpen}> + Nuevo Comando</Button>
            <Modal isOpen={isOpen} handleClose={handleClose}>
                <Input
                    placeholder="Nombre del Comando"
                    value={newCommandName}
                    onChange={(e) => setNewCommandName(e.target.value)}
                    className="mb-2"
                />

                <div className="flex justify-end">
                    <Button onClick={handleSave}>Guardar</Button>
                </div>
            </Modal>
        </>
    )
}
export default AddCommandButton;
