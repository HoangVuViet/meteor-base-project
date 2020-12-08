/* eslint-disable no-unused-vars */
import { FormControl, FormHelperText, InputBaseProps, InputLabel } from '@material-ui/core';
import React from 'react';
import { RED } from '../../../configs/colors';
import { BootstrapInput, redMark, useStylesForm } from './Form';
import { MIN_WIDTH_FORM } from './utils';

export interface FormControlTextFieldProps extends InputBaseProps {
  id?: string;
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  errorMessage?: string;
  optional?: boolean;
  focused?: boolean;
  helpText?: string;
  className?: string;
  disableError?: boolean;
  horizontal?: boolean;
}

const FormControlTextField = (props: FormControlTextFieldProps) => {
  const classes = useStylesForm();
  const {
    id,
    label,
    formControlStyle,
    errorMessage,
    optional,
    focused,
    value,
    fullWidth,
    helpText,
    className,
    disableError,
    horizontal,
    ...rest
  } = props;

  return (
    <FormControl
      focused={focused}
      className={classes.margin}
      style={{ minWidth: MIN_WIDTH_FORM, ...formControlStyle }}
      // error={focused ? false : !!errorMessage}
      fullWidth
    >
      {label && (
        <InputLabel
          style={{
            marginBottom: horizontal ? 0 : 4,
            marginRight: horizontal ? 8 : 0,
          }}
          shrink
          htmlFor={id}
        >
          {label}
          {!optional && <>&nbsp;{redMark}</>}
        </InputLabel>
      )}
      <BootstrapInput
        className={className}
        id={id}
        value={value || ''}
        {...rest}
        error={focused ? false : !!errorMessage}
      />
      <FormHelperText
        id={id}
        style={{
          minHeight: 20,
          fontSize: helpText ? 12 : 14,
          color: errorMessage ? RED : undefined,
        }}
      >
        {!disableError && (errorMessage || helpText)}
      </FormHelperText>
    </FormControl>
  );
};

export default React.memo(FormControlTextField);
