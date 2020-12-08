export interface NearByItemsProps {
  name: string;
  code: string;
}
export interface NearByDataProps {
  [key: string]: Array<NearByItemsProps>;
}
export const nearByData: NearByDataProps = {
  SD: [
    { name: 'IDS_HMS_NEAR_BY_RESTAURANT', code: 'restaurant' },
    { name: 'IDS_HMS_NEAR_BY_CAFE', code: 'bar' },
    { name: 'IDS_HMS_NEAR_BY_MART', code: 'market' },
    { name: 'IDS_HMS_NEAR_BY_MARKET', code: 'super_market' },
    { name: 'IDS_HMS_NEAR_BY_SHOPPING', code: 'souvenir' },
  ],
  PI: [
    { name: 'IDS_HMS_NEAR_BY_BEACH', code: 'beach' },
    { name: 'IDS_HMS_NEAR_BY_PARK', code: 'park' },
    { name: 'IDS_HMS_NEAR_BY_HISTORY', code: 'historical_sites' },
    { name: 'IDS_HMS_NEAR_BY_COMPANY', code: 'businesses' },
    { name: 'IDS_HMS_NEAR_BY_TRAFFIC', code: 'traffic_point' },
    { name: 'IDS_HMS_NEAR_BY_PLAY', code: 'activities_games' },
    { name: 'IDS_HMS_NEAR_BY_SIGHTSEEING', code: 'sightseeing' },
    { name: 'IDS_HMS_NEAR_BY_ARTS_SCIENCES', code: 'arts_sciences' },
    { name: 'IDS_HMS_NEAR_BY_PAGODA', code: 'sacred_place' },
    { name: 'IDS_HMS_NEAR_BY_AIRPORT', code: 'airport' },
  ],
};
