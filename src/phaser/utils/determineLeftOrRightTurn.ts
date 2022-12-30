export enum TurnDirection {
  LEFT = 'LEFT', // -1
  RIGHT = 'RIGHT', // +1
  NO_TURN = 'NO TURN', // 0
  EITHER = 'EITHER', // +1 or -1
}

/**
 * Input radar headings (001-360),
 * returns most optimal turn direction.
 */
export function determineLeftOrRightTurn(
  currentHeading: number,
  assignedHeading: number
) {
  if (currentHeading === assignedHeading) {
    return TurnDirection.NO_TURN;
  }

  if (assignedHeading > currentHeading) {
    const headingDiff = Math.abs(currentHeading - assignedHeading);

    if (headingDiff > 180) {
      return TurnDirection.LEFT;
    }
    if (headingDiff === 180) {
      return TurnDirection.EITHER;
    }
    return TurnDirection.RIGHT;
  }

  if (assignedHeading < currentHeading) {
    const headingDiff = Math.abs(assignedHeading - currentHeading);

    if (headingDiff > 180) {
      return TurnDirection.RIGHT;
    }
    if (headingDiff === 180) {
      return TurnDirection.EITHER;
    }
    return TurnDirection.LEFT;
  }

  const currentHeadingStr = currentHeading.toString().padStart(3, '0');
  const assignedHeadingStr = assignedHeading.toString().padStart(3, '0');

  throw new Error(
    `Could not determine TurnDirection from heading ${currentHeadingStr} to ${assignedHeadingStr}`
  );
}
