import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DndPhotosCore from './DndPhotosCore';
import { GridProvider } from './GridContext';

interface Props {
  listUrl: string[];
  isChecked: number[];
  handleChange(id: number, index: number): void;
  setTempListPhoto(list?: any): void;
  saveFunctions(): void;
}

const DndPhotos: React.FC<Props> = (props: Props) => {
  const { listUrl, isChecked, handleChange, setTempListPhoto, saveFunctions } = props;

  return (
    <DndProvider backend={HTML5Backend}>
      <GridProvider listUrl={listUrl} setTempListPhoto={setTempListPhoto}>
        <DndPhotosCore
          isChecked={isChecked}
          handleChange={handleChange}
          saveFunctions={saveFunctions}
        />
      </GridProvider>
    </DndProvider>
  );
};

export default DndPhotos;
