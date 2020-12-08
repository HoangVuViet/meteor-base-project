import React from 'react';
import { Button, Popover } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { remove } from 'lodash';
import FormControlTextField, {
  FormControlTextFieldProps,
} from '../../../../common/components/FormControlTextField';
import { some } from '../../../../../constants';
import { ORANGE, ORANGE_100 } from '../../../../../configs/colors';

interface CommonProps<T> extends FormControlTextFieldProps {
  getOptionLabel: (option: T) => string;
  options: T[];
}
export interface SingleProps<T> extends CommonProps<T> {
  multiple?: false;
  value?: any;
  onSelectOption?: (value?: any) => void;
}
export interface MultiProps<T> extends CommonProps<T> {
  multiple: true;
  value?: any[];
  onSelectOption?: (value?: any[]) => void;
}
export type SelectProps<T> = MultiProps<T> | SingleProps<T>;

const SelectDayInMonth: <T extends some>(
  prop: SelectProps<T>,
) => React.ReactElement<SelectProps<T>> = props => {
  const { options, getOptionLabel, multiple, onSelectOption: test, id, disabled, ...rest } = props;
  const inputRef = React.useRef<any>();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => !disabled && setOpen(true);
  const handleClose = () => setOpen(false);

  const isChecked = React.useCallback(
    (one: typeof options[number]) => {
      if (props.multiple) {
        const { value } = props;
        return value && value?.length > 0
          ? value?.findIndex(v => v === one?.id) !== -1
          : one?.id === undefined;
      }
      const { value } = props;
      return value === one?.id;
    },
    [options, props],
  );

  const onSelectValue = React.useCallback(
    (one: typeof options[number], index: number) => {
      if (props.multiple) {
        const { value, onSelectOption } = props;
        let tmp;
        if (isChecked(one)) {
          tmp = value ? remove(value, v => v !== one?.id) : [];
        } else {
          tmp = value ? [...value, one?.id] : [one?.id];
        }
        const hasAll = tmp.filter(v => v === undefined);
        const noUndefinedValue = tmp.filter(v => v !== undefined);
        const noUndefinedOptions = options.filter(v => v?.id !== undefined);
        if (
          hasAll?.length > 0 ||
          (noUndefinedValue?.length === noUndefinedOptions?.length &&
            options?.length !== noUndefinedOptions?.length)
        ) {
          onSelectOption && onSelectOption([]);
        } else {
          onSelectOption && onSelectOption(tmp);
        }
      } else {
        const { onSelectOption } = props;
        onSelectOption && onSelectOption(one?.id);
        setOpen(false);
      }
    },
    [isChecked, options, props],
  );

  const getTextInput = React.useMemo(() => {
    if (props.multiple) {
      const { value } = props;
      const defaultValue = options.find(v => v?.id === undefined);
      return value && value.length > 0
        ? value
            .map(v => {
              const tmp = options.find(one => one?.id === v);
              if (tmp) {
                return getOptionLabel(tmp);
              }
              return undefined;
            })
            .join(', ')
        : defaultValue && getOptionLabel(defaultValue);
    }
    const { value } = props;
    const tmp = options?.find(one => one?.id === value);
    return tmp && getOptionLabel(tmp);
  }, [getOptionLabel, options, props]);
  return (
    <>
      <FormControlTextField
        {...rest}
        id={id}
        readOnly
        focused={open}
        disabled={disabled}
        value={getTextInput || ''}
        innerRef={inputRef}
        endAdornment={
          <p className="end-adornment" style={{ width: 120, margin: 0 }}>
            <FormattedMessage id={options.length > 7 ? 'IDS_HMS_OF_MONTH' : 'IDS_HMS_OF_WEEK'} />
          </p>
        }
        inputProps={{
          ...rest.inputProps,
          style: { textOverflow: 'ellipsis', ...rest.inputProps?.style },
        }}
        onClick={handleClick}
      />

      <Popover
        open={open}
        anchorEl={inputRef?.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="popover-custom"
        PaperProps={{
          style: { width: inputRef?.current?.offsetWidth, maxHeight: 350, marginTop: 4 },
          variant: 'outlined',
        }}
        elevation={1}
      >
        <div className="day-container">
          <span className="days-content">
            {options?.length > 0 &&
              options.map((one: typeof options[number], index: number) => (
                <span
                  key={index}
                  role="button"
                  tabIndex={0}
                  className="day-item"
                  style={{
                    background: isChecked(one) ? ORANGE_100 : undefined,
                    color: isChecked(one) ? ORANGE : undefined,
                  }}
                  onClick={() => {
                    onSelectValue(one, index);
                  }}
                  onKeyPress={() => {}}
                >
                  {one.name}
                </span>
              ))}
          </span>

          <Button
            color="secondary"
            variant="contained"
            disableElevation
            fullWidth
            onClick={handleClose}
            style={{ width: 'calc(100% - 24px)', margin: '0 auto', marginBottom: 12 }}
          >
            <FormattedMessage id="complete" />
          </Button>
        </div>
      </Popover>
    </>
  );
};

export default React.memo(SelectDayInMonth);
