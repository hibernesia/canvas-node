import React from 'react'
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import PropTypes from 'prop-types'

const dialogContentProps ={
    title :"Add New Node"
}

const DialogCustom = ({
    isOpen,
    handleClose,
    titledialog,
    children,
    buttonConfirmTitle,
    buttonDiscardTitle,
    handleExecute
}) => {
    
    return (
        <>
        <Dialog
            hidden={isOpen}
            onDismiss={handleClose}
            dialogContentProps={dialogContentProps}
            // dialogContentProps={dialogContentProps}
            // modalProps={modalProps}
        >
            {children}
            <DialogFooter>
            <PrimaryButton onClick={handleExecute} text={buttonConfirmTitle}/>
            <DefaultButton onClick={handleClose} text={buttonDiscardTitle} />
            </DialogFooter>
        </Dialog>
        </>
    );
}
DialogCustom.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleExecute: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    buttonConfirmTitle: PropTypes.string.isRequired,
    buttonDiscardTitle: PropTypes.string.isRequired
}
export default DialogCustom