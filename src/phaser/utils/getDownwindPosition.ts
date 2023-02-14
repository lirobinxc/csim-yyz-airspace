import Plane from '../objects/Plane/Plane';
import { DepRunwayYYZ } from '../types/AirportTypes';
import { ArrivalPosition } from '../types/ArrivalTypes';
import { WaypointDataArrAll } from '../types/WaypointTypesArr';
import {
  determineLeftOrRightTurn,
  TurnDirection,
} from './determineLeftOrRightTurn';
import { getHeadingDirectToWaypoint } from './getHeadingDirectToWaypoint';
import { ArrBedpost } from '../../react/functions/arrival/genArrRoute';
import RunwayOrigins from '../config/RunwayOrigins';

export function getDownwindPosition(plane: Plane): ArrivalPosition {
  const arrRunwayCoord = plane.Scene.RunwayOrigins.getOrigin(
    plane.Properties.arrivalData.arrRunway
  );

  const headingToRunwayCenter = getHeadingDirectToWaypoint(
    plane,
    arrRunwayCoord
  );
  const turnDirection = determineLeftOrRightTurn(
    plane.Commands.heading.current,
    headingToRunwayCenter
  );

  if (turnDirection === TurnDirection.LEFT) {
    switch (plane.Properties.arrivalData.arrRunway) {
      case DepRunwayYYZ.RWY_05:
        return ArrivalPosition.NORTH;
      case DepRunwayYYZ.RWY_06L:
        return ArrivalPosition.NORTH;
      case DepRunwayYYZ.RWY_15L:
        return ArrivalPosition.NORTH;
      case DepRunwayYYZ.RWY_15R:
        return ArrivalPosition.NORTH;
      case DepRunwayYYZ.RWY_23:
        return ArrivalPosition.SOUTH;
      case DepRunwayYYZ.RWY_24R:
        return ArrivalPosition.SOUTH;
      case DepRunwayYYZ.RWY_33L:
        return ArrivalPosition.SOUTH;
      case DepRunwayYYZ.RWY_33R:
        return ArrivalPosition.SOUTH;
    }
  }

  if (turnDirection === TurnDirection.RIGHT) {
    switch (plane.Properties.arrivalData.arrRunway) {
      case DepRunwayYYZ.RWY_05:
        return ArrivalPosition.SOUTH;
      case DepRunwayYYZ.RWY_06L:
        return ArrivalPosition.SOUTH;
      case DepRunwayYYZ.RWY_15L:
        return ArrivalPosition.SOUTH;
      case DepRunwayYYZ.RWY_15R:
        return ArrivalPosition.SOUTH;
      case DepRunwayYYZ.RWY_23:
        return ArrivalPosition.NORTH;
      case DepRunwayYYZ.RWY_24R:
        return ArrivalPosition.NORTH;
      case DepRunwayYYZ.RWY_33L:
        return ArrivalPosition.NORTH;
      case DepRunwayYYZ.RWY_33R:
        return ArrivalPosition.NORTH;
    }
  }

  return plane.Properties.arrivalData.arrPosition;
}
