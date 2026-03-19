export type TertiarySegment = {
  id: string;
  label: string;
  coreColor: string;
  startAngle: number;
  endAngle: number;
};

export type SecondarySegment = {
  id: string;
  label: string;
  coreColor: string;
  startAngle: number;
  endAngle: number;
  children: TertiarySegment[];
};

export type CoreSegment = {
  id: string;
  label: string;
  color: string;
  startAngle: number;
  endAngle: number;
  children: SecondarySegment[];
};
