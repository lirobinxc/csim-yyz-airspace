import Plane from '../objects/Plane/Plane';
import { convertRadiansToHeading } from './convertRadiansToHeading';

/**
 * Input waypoint coordinates;
 * continuously adjusts Commands.heading.assigned until
 * a/c is flying directly towards the waypoint.
 */
export function getHeadingDirectToWaypoint(
  plane: Plane,
  wpCoord: Phaser.Math.Vector2
) {
  const planeCoord = plane.getPosition();

  const radiansBetweenPoints = Phaser.Math.Angle.BetweenPoints(
    planeCoord,
    wpCoord
  );
  const newHeading = convertRadiansToHeading(radiansBetweenPoints);
  const newHeadingCeil = Math.ceil(newHeading);

  return newHeadingCeil;
}
