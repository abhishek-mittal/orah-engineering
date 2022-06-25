import { Checkbox, FormControlLabel } from '@material-ui/core';
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase';
import React from 'react'


interface Props {
    checked?: boolean;
    label?: string;
    name?: string;
    onChange?: SwitchBaseProps['onChange']
}

export const CheckBoxController: React.FC<Props> = ({
    checked,
    label, name, onChange
}) => {
    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} name={name} />}
            label={label}
        />
    )
}
