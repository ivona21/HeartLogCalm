type PrimaryGroupSummary = {
  primaryId: string;
  primaryLabel: string;
  selectedEmotionLabels: string[];
};

const MAX_SAME_PRIMARY_EMOTIONS = 5;

function toLowerLabel(value: string): string {
  return value.trim().toLowerCase();
}

function formatList(values: string[]): string {
  if (values.length === 0) return '';
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;

  return `${values.slice(0, -1).join(', ')} and ${values.at(-1)}`;
}

export function formatSaveEmotionSummary(primaryGroups: PrimaryGroupSummary[]): string {
  if (primaryGroups.length === 0) return 'Mixed emotions';

  if (primaryGroups.length === 1) {
    const [group] = primaryGroups;
    const visibleLabels = group.selectedEmotionLabels
      .slice(0, MAX_SAME_PRIMARY_EMOTIONS)
      .map(toLowerLabel);
    const hiddenCount = group.selectedEmotionLabels.length - visibleLabels.length;
    const suffix = hiddenCount > 0 ? ` +${hiddenCount} more` : '';

    return `Feeling ${formatList(visibleLabels)}${suffix}`;
  }

  if (primaryGroups.length === 2) {
    return `Feeling ${toLowerLabel(primaryGroups[0].primaryLabel)}, but also ${toLowerLabel(primaryGroups[1].primaryLabel)}`;
  }

  if (primaryGroups.length === 3) {
    return `Feeling ${formatList(primaryGroups.map((group) => toLowerLabel(group.primaryLabel)))}`;
  }

  return 'Mixed emotions';
}

export type { PrimaryGroupSummary };
