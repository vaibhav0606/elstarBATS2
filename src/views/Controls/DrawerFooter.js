import { Button } from 'components/ui'
import { AiOutlineSave } from 'react-icons/ai'

const DrawerFooter = ({ onSaveClick, onCancel }) => {
    return ( 
        <div className="text-left w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
            Discard
            </Button>
            
            <Button
                size="sm"
                variant="solid"
                onClick={onSaveClick}
                icon={<AiOutlineSave />} >
                Save
            </Button>
        </div>
    )
}
export default DrawerFooter