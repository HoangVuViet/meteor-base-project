import { Button, Collapse, Paper, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { BLUE_50, GREY_100, GREY_500 } from '../../../configs/colors';
import { some } from '../../../constants';
import { HEADER_HEIGHT } from '../../../layout/constants';
import { AppState } from '../../../redux/reducers';
// import iconFlagEn from '../../../../../public/svg/flag_en.svg';
// import iconFlagVi from '../../../svg/flag_vi.svg';
import { Col } from '../../common/components/elements';
import { setLocale } from '../redux/reducer';

const Tip = styled.div`
  display: flex;
  align-items: flex-right;
  justify-content: flex-start;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  &:hover {
    background: ${GREY_100};
  }
  cursor: pointer;
`;

const DATA = [
  { src: '../../../../../svg/flag_en.svg', value: 'vi', label: 'English' },
  { src: '../../../../../svg/flag_vi.svg', value: 'en-US', label: 'Tiếng Việt' },
];

function mapStateToProps(state: AppState) {
  return {
    locale: state.intl.locale,
  };
}

interface Props extends ReturnType<typeof mapStateToProps> {
  dispatch: Dispatch;
}
const LanguageSelect: React.FC<Props> = (props) => {
  const { dispatch, locale } = props;
  const [open, setOpen] = React.useState(false);
  const [flag, setFlag] = React.useState<some>(DATA.find((one) => one.value === locale) || DATA[0]);

  const onBlur = React.useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (e.relatedTarget instanceof Element) {
      if (e.currentTarget.contains(e.relatedTarget as Element)) {
        return;
      }
    }
    setOpen(false);
  }, []);

  return (
    <Col
      style={{
        alignItems: 'center',
        outline: 'none',
      }}
      color="inherit"
      tabIndex={-1}
      onClick={() => setOpen(!open)}
      onBlur={onBlur}
    >
      <Button
        style={{
          backgroundColor: BLUE_50,
          minWidth: 130,
          padding: '0 0 0 8px',
        }}
        color="inherit"
      >
        <img src={flag.src} alt="" style={{ width: '24px', height: '16px', objectFit: 'cover' }} />
        &nbsp;&nbsp;
        <Typography variant="body2" color="textPrimary">
          {flag.label}
        </Typography>
        <ArrowDropDownIcon
          style={{
            transition: 'all 300ms',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            cursor: 'pointer',
            color: GREY_500,
            width: 32,
            height: 32,
          }}
        />
      </Button>
      <Collapse in={open} style={{ position: 'absolute', zIndex: 1100, top: HEADER_HEIGHT }}>
        <Paper style={{ overflow: 'hidden', padding: '8px 12px' }} variant="outlined">
          {DATA.map((v: some, index: number) => {
            return (
              <Tip
                key={index}
                onClick={() => {
                  setFlag(v);
                  dispatch(setLocale(v.value));
                }}
              >
                <img
                  src={v.src}
                  alt=""
                  style={{ width: '38px', height: '25px', objectFit: 'cover' }}
                />
                &nbsp;&nbsp;&nbsp;
                <Typography variant="body2">{v.label}</Typography>
              </Tip>
            );
          })}
        </Paper>
      </Collapse>
    </Col>
  );
};

export default connect(mapStateToProps)(LanguageSelect);
