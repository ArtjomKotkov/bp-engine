import {Position} from "../types/common";

export interface TwoDimCoords {
  x: number;
  y: number;
}

export interface ConnectorPositionData {
  coords: TwoDimCoords;
  offsetX: number;
  position: Position;
}
