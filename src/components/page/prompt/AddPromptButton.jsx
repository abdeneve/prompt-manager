import React, { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import { useAppContext } from '../../../context/AppContext';

function AddPromptButton({ category }) {
    const { userRole, prompts, setPrompts } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [newPromptSlug, setNewPromptSlug] = useState("");
    const [newPromptObjective, setNewPromptObjective] = useState("");
    const [newPromptVideoRef, setNewPromptVideoRef] = useState("")

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSave = () => {
        const newPrompt = {
            id: prompts.length + 1,
            category_id: category.id,
            slug: newPromptSlug,
            objective: newPromptObjective,
            url_video_reference: newPromptVideoRef
        }
        
        setPrompts([...prompts, newPrompt]);
        setIsOpen(false);
        setNewPromptSlug("");
        setNewPromptObjective("");
        setNewPromptVideoRef("");
    }

    if (userRole !== "admin") {
        return null
    }

    return (
        <>
            <Button className="mb-4" onClick={handleOpen}> + Nuevo Prompt</Button>
            <Modal isOpen={isOpen} handleClose={handleClose}>
                <Input
                    placeholder="Nombre (slug) del Prompt"
                    value={newPromptSlug}
                    onChange={(e) => setNewPromptSlug(e.target.value)}
                    className="mb-2"
                />
                <Input
                    placeholder="Objetivo"
                    value={newPromptObjective}
                    onChange={(e) => setNewPromptObjective(e.target.value)}
                    className="mb-2"
                />
                <Input
                    placeholder="URL Referencia del Video"
                    value={newPromptVideoRef}
                    onChange={(e) => setNewPromptVideoRef(e.target.value)}
                    className="mb-2"
                />
                <div className="flex justify-end">
                    <Button onClick={handleSave}>Guardar</Button>
                </div>
            </Modal>
        </>
    )
}
export default AddPromptButton;