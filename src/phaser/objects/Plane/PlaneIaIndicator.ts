import Phaser from 'phaser';

import { AssetKeys } from '../../types/AssetKeys';
import Plane from './Plane';
import { ColorKeys } from '../../types/ColorKeys';
import { TerminalPosition } from '../../types/SimTypes';
import { RECAT_SPACING_DICT } from '../../config/RecatSpacing';
import { getSimOptions } from '../../../react/state/getSimOptions';
import { RadarSceneKeys } from '../../types/SceneKeys';
import { convertPixelsToMiles } from '../../utils/convertPixelsToMiles';

export enum IaIndicatorType {
  WAKE = 'WAKE',
  MRS = 'MRS',
  SPACING = 'SPACING',
  DEPENDENT = 'DEPENDENT',
}

export default class PlaneIaIndicator extends Phaser.GameObjects.Image {
  public IS_VISIBLE: boolean;
  public LEAD_PLANE: Plane | null;
  public DEPENDENT_LEAD_PLANE: Plane | null;
  public MAX_CONSTRAINT_TYPE: IaIndicatorType | null;
  public SPACING: number;
  public DELTA: string;
  public COMPRESSION_BUFFER: number; // miles

  // Parent
  private Plane: Plane;
  private LocLineGeom: Phaser.Geom.Line;

  constructor(plane: Plane) {
    super(plane.scene, 0, 0, AssetKeys.IA_INDICATOR_LINE);

    // Common setup
    this.Plane = plane;
    this.LocLineGeom =
      plane.Scene.Localizers?.LocLineGeoms[
        this.Plane.Properties.arrivalData.arrRunway
      ].geom;

    this.IS_VISIBLE = false;
    this.LEAD_PLANE = null;
    this.DEPENDENT_LEAD_PLANE = null;
    this.MAX_CONSTRAINT_TYPE = null;
    this.SPACING = 0;
    this.DELTA = '';
    this.COMPRESSION_BUFFER = 0.9;

    plane.scene.add.existing(this);

    // Setup: THIS
    this.setVisible(this.IS_VISIBLE);
    this.setDepth(99999);
    this.setScale(0.07);
    switch (plane.Scene.SCENE_KEY) {
      case RadarSceneKeys.RADAR_06s:
        this.setAngle(332);
        break;
      case RadarSceneKeys.RADAR_24s:
        this.setAngle(152);
        break;
      case RadarSceneKeys.RADAR_15s:
        this.setAngle(60);
        break;
      case RadarSceneKeys.RADAR_33s:
        this.setAngle(240);
        break;
    }

    this.scene.add.existing(this);

    // Sync update with FPS
    this.scene.physics.world.on('worldstep', (dt: number) => {
      if (this.Plane.DESTROYED) return;

      this.setVisible(this.IS_VISIBLE);

      if (
        this.Plane.Scene.SIM_OPTIONS.terminalPosition ===
        TerminalPosition.ARRIVAL
      ) {
        const maxConstraintData = this.determineMaxConstraintSpacing();
        this.MAX_CONSTRAINT_TYPE = maxConstraintData.type;
        this.SPACING = maxConstraintData.spacing + this.COMPRESSION_BUFFER || 0;

        if (this.MAX_CONSTRAINT_TYPE && this.SPACING > 0) {
          this.updateIndicatorTexture();
          this.updateIndicatorPosition();
          this.updateDelta();
        }
      }
    });
  }

  preUpdate() {}

  updateIndicatorPosition() {
    if (!this.MAX_CONSTRAINT_TYPE) {
      this.IS_VISIBLE = false;
      return;
    }

    this.IS_VISIBLE = true;
    const indicatorPosition = Phaser.Geom.Line.GetPoint(
      this.LocLineGeom,
      this.calcPercentOfLineToMatchIndicatorDistanceFromThreshold()
    );

    this.setPosition(indicatorPosition.x, indicatorPosition.y);
  }
  updateDelta() {
    if (!this.MAX_CONSTRAINT_TYPE) {
      return;
    }

    const indicatorDistanceInMiles =
      this.calcIndicatorDistanceFromThresholdInMiles();

    const planeDistanceInMiles =
      this.Plane.DISTANCE_FROM_RUNWAY_THRESHOLD_MILES;

    const ERROR_MARGIN = 0.57;
    const delta =
      planeDistanceInMiles - indicatorDistanceInMiles - ERROR_MARGIN;
    const deltaIsPlus = delta >= 0;

    const formattedDelta = `${deltaIsPlus ? '+' : ''}${delta.toFixed(1)}`;

    this.DELTA = formattedDelta;
  }

  updateIndicatorTexture() {
    switch (this.MAX_CONSTRAINT_TYPE) {
      case IaIndicatorType.WAKE:
        this.setTexture(AssetKeys.IA_INDICATOR_LINE);
        this.setTintFill(ColorKeys.IA_ORANGE);
        break;
      case IaIndicatorType.SPACING:
        this.setTexture(AssetKeys.IA_INDICATOR_DASHED);
        this.setTintFill(ColorKeys.IA_GREEN);
        break;
      case IaIndicatorType.DEPENDENT:
        this.setTexture(AssetKeys.IA_INDICATOR_CHEVRON);
        this.setTintFill(ColorKeys.IA_GREEN);
        break;
    }
  }

  calcPercentOfLineToMatchIndicatorDistanceFromThreshold() {
    if (!this.LEAD_PLANE) return 0;
    if (!this.Plane.Scene.Localizers) return 0;

    const locLengthInPixels = Phaser.Geom.Line.Length(this.LocLineGeom);
    const locLengthInMiles = convertPixelsToMiles(locLengthInPixels);

    const totalIndicatorDistanceFromThresholdInMiles =
      this.calcIndicatorDistanceFromThresholdInMiles();

    const spacingLocRatio =
      totalIndicatorDistanceFromThresholdInMiles / locLengthInMiles;
    return spacingLocRatio;
  }

  calcIndicatorDistanceFromThresholdInMiles() {
    let leadDistanceFromThresholdInMiles =
      this.LEAD_PLANE?.DISTANCE_FROM_RUNWAY_THRESHOLD_MILES;

    if (this.MAX_CONSTRAINT_TYPE === IaIndicatorType.DEPENDENT) {
      leadDistanceFromThresholdInMiles =
        this.DEPENDENT_LEAD_PLANE?.DISTANCE_FROM_RUNWAY_THRESHOLD_MILES;
    }

    if (!leadDistanceFromThresholdInMiles) return 0;

    const totalDistance = leadDistanceFromThresholdInMiles + this.SPACING;
    return totalDistance;
  }

  determineMaxConstraintSpacing() {
    console.log('maxConstaintType', this.MAX_CONSTRAINT_TYPE);

    if (!this.LEAD_PLANE && !this.DEPENDENT_LEAD_PLANE) {
      return {
        type: null,
        spacing: 0,
      };
    }

    const runwaySpacing = this.getRunwaySpacing();
    const wakeSpacing = this.getWakeSpacing(this.LEAD_PLANE);
    const dependentSpacing = 1.5;

    if (
      this.Plane.Scene.SCENE_KEY === RadarSceneKeys.RADAR_33s ||
      this.Plane.Scene.SCENE_KEY === RadarSceneKeys.RADAR_15s
    ) {
      if (
        this.LEAD_PLANE &&
        this.DEPENDENT_LEAD_PLANE &&
        this.DEPENDENT_LEAD_PLANE.DISTANCE_FROM_RUNWAY_THRESHOLD_MILES -
          this.LEAD_PLANE.DISTANCE_FROM_RUNWAY_THRESHOLD_MILES >=
          runwaySpacing
      ) {
        return {
          type: IaIndicatorType.DEPENDENT,
          spacing: dependentSpacing,
        };
      }
      if (!this.LEAD_PLANE && this.DEPENDENT_LEAD_PLANE) {
        return {
          type: IaIndicatorType.DEPENDENT,
          spacing: dependentSpacing,
        };
      }
    }

    const spacingAvailable = [runwaySpacing, wakeSpacing];
    const maxSpacingRequired = Math.max(...spacingAvailable);

    switch (maxSpacingRequired) {
      case wakeSpacing:
        return { type: IaIndicatorType.WAKE, spacing: wakeSpacing };
      default:
        return { type: IaIndicatorType.SPACING, spacing: runwaySpacing };
    }
  }

  getRunwaySpacing() {
    const simOptions = getSimOptions();
    const arrRunway = this.Plane.Properties.arrivalData.arrRunway;

    return simOptions.wakeSpacingConfig[arrRunway];
  }

  getWakeSpacing(leadPlane: Plane | null) {
    if (!leadPlane) return 0;

    const followingRecatGroup = this.Plane.Performance.recat;
    const leadRecatGroup = leadPlane.Performance.recat;

    const recatSpacingRequired =
      RECAT_SPACING_DICT[leadRecatGroup][followingRecatGroup];

    return recatSpacingRequired;
  }
}
