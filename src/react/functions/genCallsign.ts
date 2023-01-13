import _ from 'lodash';
import { CarrierCode, CarrierSpoken } from '../../phaser/types/CallsignTypes';
import { callsigns } from '../data/callsignCollection';
import { convertNumToText } from './convertNumToText';

export function genCallsign({
  isC208,
  isSatYtzDep,
  isSatYkzDep,
  isSatYzdAll,
  isSatYhmAll,
}: {
  isC208?: boolean;
  isSatYtzDep?: boolean;
  isSatYkzDep?: boolean;
  isSatYzdAll?: boolean;
  isSatYhmAll?: boolean;
}) {
  const random = _.random(1, 5);

  let num = _.random(101, 999);

  if (random > 3) num = _.random(1000, 9999);

  const allCarriers = Object.keys(CarrierCode) as CarrierCode[];

  let carrierCode = _.sample(allCarriers);

  // Regenerate CarrierCode if:
  const REGEN_ATTEMPT_LIMIT = 20;
  let attempts = 0;
  while (
    !carrierCode ||
    carrierCode === CarrierCode.MAL ||
    carrierCode === CarrierCode.POE ||
    carrierCode === CarrierCode.PUL ||
    carrierCode === CarrierCode.CJT ||
    carrierCode === CarrierCode.BBA ||
    attempts < REGEN_ATTEMPT_LIMIT
  ) {
    carrierCode = _.sample(allCarriers);
    attempts++;
  }

  if (isC208) carrierCode = CarrierCode.MAL;
  if (isSatYtzDep) carrierCode = CarrierCode.POE;
  if (isSatYkzDep) carrierCode = CarrierCode.PUL;
  if (isSatYzdAll) carrierCode = CarrierCode.BBA;
  if (isSatYhmAll) carrierCode = CarrierCode.CJT;

  const fullCallsign = `${carrierCode}${num}`;

  const spokenCallsign = `${CarrierSpoken[carrierCode]} ${convertNumToText(
    num
  )}`;

  return { operatorOnly: carrierCode, fullCallsign, spokenCallsign };
}
