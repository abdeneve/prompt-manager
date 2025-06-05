import React, {useState} from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import { useAppContext } from '../../../context/AppContext';

function AddParameterButton({command}) {
    const {parameters, setParameters} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [newParameterName, setNewParameterName] = useState("");
    const [newParameterValue, setNewParameterValue] = useState("");

    const handleOpen = () =>{
        setIsOpen(true)
    }
    const handleClose = () =>{
        setIsOpen(false)
    }
    const handleSave = () => {
      const nextSequence = parameters.filter(p => p.CommandId === command.CommandId).length + 1;
      const newParameter = {
          id: parameters.length + 1,
          ParameterId: parameters.length + 1,
          CommandId: command.CommandId,
          Name: newParameterName,
          Value: newParameterValue,
          Sequence: nextSequence
      };
      setParameters([...parameters, newParameter]);
        setIsOpen(false);
        setNewParameterName("");
        setNewParameterValue("");

    }
    return (
      <>
          <Button onClick={handleOpen}> + Nuevo Parámetro</Button>
          <Modal isOpen={isOpen} handleClose={handleClose}>
                <Input
                    placeholder="Nombre del Parámetro"
                    value={newParameterName}
                    onChange={(e) => setNewParameterName(e.target.value)}
                    className="mb-2"
                />
                <Input
                    placeholder="Valor del Parámetro"
                    value={newParameterValue}
                    onChange={(e)=> setNewParameterValue(e.target.value)}
                    className="mb-2"
                />

             <div className="flex justify-end">
                 <Button onClick={handleSave}>Guardar</Button>
             </div>
          </Modal>
      </>
    )
}
export default AddParameterButton;
