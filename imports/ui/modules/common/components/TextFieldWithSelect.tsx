import React from 'react';
import { GREY_100 } from '../../../configs/colors';
import { some } from '../../../constants';
import { FieldSelectContent, FieldTextContent } from '../../accommodation/common/FieldContent';
import { Col, Row } from './elements';
import { NumberFormatCustom } from './Form';

interface TextFieldWithSelectProps {
  options: some[];
  nameTextField: string;
  nameSelect: string;
}

function TextFieldWithSelect(props: TextFieldWithSelectProps) {
  const { options, nameTextField, nameSelect } = props;
  return (
    <Row style={{ alignItems: 'center' }}>
      <FieldTextContent
        style={{
          borderRadius: '4px 0px 0px 4px',
        }}
        name={nameTextField}
        inputComponent={NumberFormatCustom as any}
        formControlStyle={{
          minWidth: 120,
          width: 'auto',
          marginRight: 0,
        }}
        inputProps={{ maxLength: 3 }}
        disableError
      />
      <Col>
        <FieldSelectContent
          name={nameSelect}
          label={null}
          style={{
            width: 100,
            borderRadius: '0px 4px 4px 0px',
            background: GREY_100,
            borderLeft: 0,
          }}
          formControlStyle={{
            minWidth: 100,
            width: 'auto',
            marginRight: 8,
          }}
          options={options}
          getOptionLabel={value => value.name}
          disableError
        />
      </Col>
    </Row>
  );
}

export default TextFieldWithSelect;
