import { Grid } from '@material-ui/core';
import React from 'react';
import { GREY_400 } from '../../../../../configs/colors';
import { some } from '../../../../../constants';
import { isEmpty } from '../../../utils';
import ContractProviderItem from './ContractProviderItem';

interface Props {
  contractHotel: some;
  contractTypes: some;
  fetchContract: () => void;
}

const ContractProvider: React.FC<Props> = props => {
  const { contractHotel, contractTypes, fetchContract } = props;
  return (
    <>
      <Grid container spacing={3}>
        {!isEmpty(contractHotel?.items) &&
          contractHotel?.items.map((contract: some, index: number) => (
            <Grid
              item
              xs={4}
              key={contract?.id}
              style={{ borderBottom: `0.5px solid ${GREY_400}`, paddingRight: 0 }}
            >
              <ContractProviderItem
                contract={contract}
                index={index}
                contractType={(contractTypes?.items || []).find(
                  (v: some) => v?.id === contract?.contractTypeId,
                )}
                fetchContract={fetchContract}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default ContractProvider;
