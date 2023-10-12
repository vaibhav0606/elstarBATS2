import React from 'react'
import { Button } from 'components/ui'

function DisplayTableEmpAccess({game,handleClicks,handleClickPrevious}) {
    const [open, setOpen] = React.useState(1)

    const handleOpen = (value) => setOpen(open === value ? 0 : value)

    return (
        <>
            {game > 3 ? null : (
               <Button
                   className="mr-2 mb-2 "
                   variant="twoTone"
                   color="red-600"
                   type="button"
                   onClick={() => handleClicks()}
               >
                   Next
               </Button>
           )}
           {game > 3 ? null : (
               <Button
                   className="mr-2 mb-2 "
                   variant="twoTone"
                   color="red-600"
                   type="button"
                   onClick={() => handleClickPrevious()}
               >
                   Previous
               </Button>
           )}
        </>
    )
}

export default DisplayTableEmpAccess
