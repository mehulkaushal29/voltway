import { MOCK_STATIONS } from '../constants/mockData';
import { Station } from '../types';

const OPEN_CHARGE_MAP_API_KEY = process.env.EXPO_PUBLIC_OPEN_CHARGE_MAP_API_KEY || '';

function toReliability(statusTitle?: string): Station['reliabilityColor'] {
  const status = (statusTitle || '').toLowerCase();
  if (status.includes('operational') || status.includes('available')) return 'green';
  if (status.includes('fault') || status.includes('not operational')) return 'red';
  return 'amber';
}

export async function getNcrChargingStations(): Promise<Station[]> {
  if (!OPEN_CHARGE_MAP_API_KEY) {
    return MOCK_STATIONS;
  }

  try {
    const url =
      'https://api.openchargemap.io/v3/poi/?output=json' +
      '&countrycode=IN' +
      '&latitude=28.6139' +
      '&longitude=77.2090' +
      '&distance=80' +
      '&distanceunit=KM' +
      '&maxresults=120' +
      `&key=${OPEN_CHARGE_MAP_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) return MOCK_STATIONS;
    const data = await res.json();

    const liveStations: Station[] = data
      .filter((item: any) => item?.AddressInfo?.Latitude && item?.AddressInfo?.Longitude)
      .map((item: any) => {
        const connection = item.Connections?.[0];
        const reliabilityColor = toReliability(item.StatusType?.Title);
        const score = reliabilityColor === 'green' ? 8.8 : reliabilityColor === 'amber' ? 7.0 : 4.0;
        const type = connection?.ConnectionType?.Title?.includes('Type 2') ? 'Type2' : connection?.ConnectionType?.Title?.includes('CHAdeMO') ? 'CHAdeMO' : connection?.ConnectionType?.Title?.includes('GB') ? 'GBT' : 'CCS2';
        return {
          id: `ocm-${item.ID}`,
          name: item.AddressInfo?.Title || 'EV Charging Station',
          network: item.OperatorInfo?.Title || 'Open Charge Map',
          networkShort: 'OCM',
          address: [item.AddressInfo?.AddressLine1, item.AddressInfo?.Town].filter(Boolean).join(', '),
          city: item.AddressInfo?.Town || 'Delhi NCR',
          coordinates: { latitude: item.AddressInfo.Latitude, longitude: item.AddressInfo.Longitude },
          reliabilityScore: score,
          reliabilityColor,
          waitMinutes: null,
          waitText: 'Live data',
          waitClass: reliabilityColor === 'green' ? 'low' : reliabilityColor === 'amber' ? 'mid' : 'high',
          ports: [{ id:'p1', type, displayName: connection?.ConnectionType?.Title || 'EV Connector', powerKW: connection?.PowerKW || 22, status: reliabilityColor === 'red' ? 'offline' : 'available', statusText: item.StatusType?.Title || 'Status unknown' }],
          connectorTypes: [type],
          maxPowerKW: connection?.PowerKW || 22,
          pricePerKWh: 18,
          currency: 'INR',
          operatingHours: item.AddressInfo?.AccessComments || 'Check operator app',
          amenities: ['Live public data'],
          totalReviews: 0,
          averageRating: score / 2,
          isOpen: reliabilityColor !== 'red',
          reviews: [],
        } as Station;
      });

    return liveStations.length ? liveStations : MOCK_STATIONS;
  } catch (error) {
    console.log('Open Charge Map fetch failed, using NCR seed data', error);
    return MOCK_STATIONS;
  }
}
