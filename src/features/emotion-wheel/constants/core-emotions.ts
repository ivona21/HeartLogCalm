import type { CoreEmotion } from '@/features/emotion-wheel/types/core-emotion.ts';

export const CORE_EMOTIONS: CoreEmotion[] = [
  {
    key: 'anger',
    color: '#DC6B82',
    startAngle: -30,
    endAngle: 30,
    secondary: [
      {
        key: 'anger.rage',
        tertiary: [
          { key: 'anger.rage.hate' },
          { key: 'anger.rage.hostile' },
        ],
      },
      {
        key: 'anger.exasperated',
        tertiary: [
          { key: 'anger.exasperated.agitated' },
          { key: 'anger.exasperated.frustrated' },
        ],
      },
      {
        key: 'anger.irritable',
        tertiary: [
          { key: 'anger.irritable.annoyed' },
          { key: 'anger.irritable.aggravated' },
        ],
      },
      {
        key: 'anger.envy',
        tertiary: [
          { key: 'anger.envy.resentful' },
          { key: 'anger.envy.jealous' },
        ],
      },
      {
        key: 'anger.disgust',
        tertiary: [
          { key: 'anger.disgust.contempt' },
          { key: 'anger.disgust.revolted' },
        ],
      },
    ],
  },
  {
    key: 'sadness',
    color: '#9E85C8',
    startAngle: 30,
    endAngle: 90,
    secondary: [
      {
        key: 'sadness.suffering',
        tertiary: [
          { key: 'sadness.suffering.agony' },
          { key: 'sadness.suffering.hurt' },
        ],
      },
      {
        key: 'sadness.disappointed',
        tertiary: [
          { key: 'sadness.disappointed.depressed' },
          { key: 'sadness.disappointed.sorrow' },
        ],
      },
      {
        key: 'sadness.shameful',
        tertiary: [
          { key: 'sadness.shameful.regretful' },
          { key: 'sadness.shameful.guilty' },
        ],
      },
      {
        key: 'sadness.neglected',
        tertiary: [
          { key: 'sadness.neglected.isolated' },
          { key: 'sadness.neglected.lonely' },
        ],
      },
      {
        key: 'sadness.despair',
        tertiary: [
          { key: 'sadness.despair.grief' },
          { key: 'sadness.despair.powerless' },
        ],
      },
    ],
  },
  {
    key: 'surprise',
    color: '#68B8B2',
    startAngle: 90,
    endAngle: 150,
    secondary: [
      {
        key: 'surprise.stunned',
        tertiary: [
          { key: 'surprise.stunned.shocked' },
          { key: 'surprise.stunned.dismayed' },
        ],
      },
      {
        key: 'surprise.confused',
        tertiary: [
          { key: 'surprise.confused.disillusioned' },
          { key: 'surprise.confused.perplexed' },
        ],
      },
      {
        key: 'surprise.amazed',
        tertiary: [
          { key: 'surprise.amazed.astonished' },
          { key: 'surprise.amazed.awestruck' },
        ],
      },
      {
        key: 'surprise.overcome',
        tertiary: [
          { key: 'surprise.overcome.speechless' },
          { key: 'surprise.overcome.astounded' },
        ],
      },
      {
        key: 'surprise.moved',
        tertiary: [
          { key: 'surprise.moved.stimulated' },
          { key: 'surprise.moved.touched' },
        ],
      },
    ],
  },
  {
    key: 'joy',
    color: '#8DC878',
    startAngle: 150,
    endAngle: 210,
    secondary: [
      {
        key: 'joy.content',
        tertiary: [
          { key: 'joy.content.pleased' },
          { key: 'joy.content.satisfied' },
        ],
      },
      {
        key: 'joy.happy',
        tertiary: [
          { key: 'joy.happy.amused' },
          { key: 'joy.happy.delighted' },
        ],
      },
      {
        key: 'joy.cheerful',
        tertiary: [
          { key: 'joy.cheerful.jovial' },
          { key: 'joy.cheerful.blissful' },
        ],
      },
      {
        key: 'joy.proud',
        tertiary: [
          { key: 'joy.proud.triumphant' },
          { key: 'joy.proud.illustrious' },
        ],
      },
      {
        key: 'joy.optimistic',
        tertiary: [
          { key: 'joy.optimistic.hopeful' },
          { key: 'joy.optimistic.eager' },
        ],
      },
    ],
  },
  {
    key: 'love',
    color: '#E8C85A',
    startAngle: 210,
    endAngle: 270,
    secondary: [
      {
        key: 'love.affectionate',
        tertiary: [
          { key: 'love.affectionate.fondness' },
          { key: 'love.affectionate.romantic' },
        ],
      },
      {
        key: 'love.enthralled',
        tertiary: [
          { key: 'love.enthralled.rapture' },
          { key: 'love.enthralled.enchanted' },
        ],
      },
      {
        key: 'love.longing',
        tertiary: [
          { key: 'love.longing.attracted' },
          { key: 'love.longing.sentimental' },
        ],
      },
      {
        key: 'love.desire',
        tertiary: [
          { key: 'love.desire.infatuation' },
          { key: 'love.desire.passion' },
        ],
      },
      {
        key: 'love.tenderness',
        tertiary: [
          { key: 'love.tenderness.caring' },
          { key: 'love.tenderness.compassionate' },
        ],
      },
    ],
  },
  {
    key: 'fear',
    color: '#E8966E',
    startAngle: 270,
    endAngle: 330,
    secondary: [
      {
        key: 'fear.peaceful',
        tertiary: [
          { key: 'fear.peaceful.satisfied' },
          { key: 'fear.peaceful.relieved' },
        ],
      },
      {
        key: 'fear.scared',
        tertiary: [
          { key: 'fear.scared.frightened' },
          { key: 'fear.scared.helpless' },
        ],
      },
      {
        key: 'fear.terror',
        tertiary: [
          { key: 'fear.terror.panic' },
          { key: 'fear.terror.hysterical' },
        ],
      },
      {
        key: 'fear.insecure',
        tertiary: [
          { key: 'fear.insecure.inferior' },
          { key: 'fear.insecure.inadequate' },
        ],
      },
      {
        key: 'fear.nervous',
        tertiary: [
          { key: 'fear.nervous.worried' },
          { key: 'fear.nervous.anxious' },
        ],
      },
    ],
  },
];
