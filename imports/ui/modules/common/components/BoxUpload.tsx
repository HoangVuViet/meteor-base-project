import { ButtonBase, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import { BLACK, GREY_500, RED, GREY_400, WHITE } from '../../../configs/colors';
import { IMAGE_ALLOW_TYPE, MAX_SIZE_AVATAR_IMAGE } from '../../../models/uploadFile';
import { ReactComponent as AddIcon } from '../../../svg/ic_addIcon.svg';
import { ReactComponent as IconEdit } from '../../../svg/ic_edit.svg';
import { redMark } from './Form';
import './style.box.scss';

interface Props {
  imageUrl?: string;
  onDrop(file: File[]): void;
  loading?: boolean;
  style?: React.CSSProperties;
  label?: string;
  errorMessage?: string;
  required?: boolean;
  multiple?: boolean;
}

const BoxUpload: React.FunctionComponent<Props> = props => {
  const { imageUrl, onDrop, loading, style, label, errorMessage, required, multiple } = props;
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    onDrop: (acceptedFiles: File[]) => onDrop(acceptedFiles),
    accept: IMAGE_ALLOW_TYPE,
    multiple: !!multiple,
    maxSize: MAX_SIZE_AVATAR_IMAGE,
  });
  return (
    <div
      className="avatar-wrapper"
      style={{
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {label && (
        <Typography variant="body2">
          <FormattedMessage id={label} />
          &nbsp;
          {required && redMark}
        </Typography>
      )}
      <ButtonBase
        className="image-avatar"
        style={{
          minWidth: '160px',
          minHeight: '160px',
          border: imageUrl ? 'none' : `1px dashed ${GREY_400}`,
          borderRadius: 8,
          ...style,
        }}
        {...getRootProps()}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input {...getInputProps()} />
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              {imageUrl ? (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'hidden',
                      borderRadius: 8,
                    }}
                  >
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      src={imageUrl}
                      alt=""
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <AddIcon
                      className="svgFillAll"
                      style={{ stroke: GREY_500, width: 32, height: 32 }}
                    />
                  </div>
                  <Typography variant="body2" color="textSecondary">
                    <FormattedMessage id="addNewImage" />
                  </Typography>
                </>
              )}
            </>
          )}
        </div>
        {imageUrl && (
          <div className="edit-avatar" style={{ position: 'absolute', zIndex: 2 }}>
            <div
              style={{
                borderRadius: '50%',
                padding: '8px',
                background: BLACK,
                opacity: 0.8,
                border: `1px solid ${WHITE}`,
              }}
            >
              <IconEdit className="svgFillAll" style={{ stroke: WHITE }} />
            </div>
          </div>
        )}
      </ButtonBase>
      <Typography variant="body2" style={{ color: RED }}>
        {errorMessage}
      </Typography>
    </div>
  );
};
BoxUpload.defaultProps = {
  loading: false,
};
export default BoxUpload;
