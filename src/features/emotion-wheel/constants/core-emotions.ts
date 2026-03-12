import type { CoreEmotion } from '@/features/emotion-wheel/types/core-emotion.ts';

export const CORE_EMOTIONS: CoreEmotion[] = [
  {
    key: 'anger',
    color: '#c084fc',
    startAngle: -30,
    endAngle: 30,
    secondary: [
      {
        key: 'anger.rage',
        tertiary: [
          { key: 'anger.rage.livid' },
          { key: 'anger.rage.furious' },
          { key: 'anger.rage.enraged' },
        ],
      },
      {
        key: 'anger.hostile',
        tertiary: [
          { key: 'anger.hostile.violent' },
          { key: 'anger.hostile.hateful' },
          { key: 'anger.hostile.cruel' },
        ],
      },
      {
        key: 'anger.annoyed',
        tertiary: [
          { key: 'anger.annoyed.irritated' },
          { key: 'anger.annoyed.agitated' },
          { key: 'anger.annoyed.bothered' },
        ],
      },
      {
        key: 'anger.jealous',
        tertiary: [
          { key: 'anger.jealous.envious' },
          { key: 'anger.jealous.resentful' },
          { key: 'anger.jealous.bitter' },
        ],
      },
      {
        key: 'anger.disgusted',
        tertiary: [
          { key: 'anger.disgusted.appalled' },
          { key: 'anger.disgusted.revolted' },
          { key: 'anger.disgusted.contemptuous' },
        ],
      },
    ],
  },
  {
    key: 'sadness',
    color: '#60a5fa',
    startAngle: 30,
    endAngle: 90,
    secondary: [
      {
        key: 'sadness.guilty',
        tertiary: [
          { key: 'sadness.guilty.ashamed' },
          { key: 'sadness.guilty.regretful' },
          { key: 'sadness.guilty.remorseful' },
        ],
      },
      {
        key: 'sadness.lonely',
        tertiary: [
          { key: 'sadness.lonely.isolated' },
          { key: 'sadness.lonely.abandoned' },
          { key: 'sadness.lonely.alienated' },
        ],
      },
      {
        key: 'sadness.hopeless',
        tertiary: [
          { key: 'sadness.hopeless.powerless' },
          { key: 'sadness.hopeless.helpless' },
          { key: 'sadness.hopeless.defeated' },
        ],
      },
      {
        key: 'sadness.grieving',
        tertiary: [
          { key: 'sadness.grieving.sorrowful' },
          { key: 'sadness.grieving.heartbroken' },
          { key: 'sadness.grieving.bereaved' },
        ],
      },
      {
        key: 'sadness.numb',
        tertiary: [
          { key: 'sadness.numb.apathetic' },
          { key: 'sadness.numb.indifferent' },
          { key: 'sadness.numb.detached' },
        ],
      },
    ],
  },
  {
    key: 'surprise',
    color: '#34d399',
    startAngle: 90,
    endAngle: 150,
    secondary: [
      {
        key: 'surprise.startled',
        tertiary: [
          { key: 'surprise.startled.shocked' },
          { key: 'surprise.startled.alarmed' },
          { key: 'surprise.startled.dismayed' },
        ],
      },
      {
        key: 'surprise.confused',
        tertiary: [
          { key: 'surprise.confused.puzzled' },
          { key: 'surprise.confused.perplexed' },
          { key: 'surprise.confused.baffled' },
        ],
      },
      {
        key: 'surprise.amazed',
        tertiary: [
          { key: 'surprise.amazed.awestruck' },
          { key: 'surprise.amazed.astonished' },
          { key: 'surprise.amazed.speechless' },
        ],
      },
      {
        key: 'surprise.overcome',
        tertiary: [
          { key: 'surprise.overcome.touched' },
          { key: 'surprise.overcome.stirred' },
          { key: 'surprise.overcome.moved' },
        ],
      },
      {
        key: 'surprise.eager',
        tertiary: [
          { key: 'surprise.eager.energized' },
          { key: 'surprise.eager.stimulated' },
          { key: 'surprise.eager.thrilled' },
        ],
      },
    ],
  },
  {
    key: 'joy',
    color: '#4ade80',
    startAngle: 150,
    endAngle: 210,
    secondary: [
      {
        key: 'joy.content',
        tertiary: [
          { key: 'joy.content.peaceful' },
          { key: 'joy.content.serene' },
          { key: 'joy.content.calm' },
        ],
      },
      {
        key: 'joy.cheerful',
        tertiary: [
          { key: 'joy.cheerful.joyful' },
          { key: 'joy.cheerful.delighted' },
          { key: 'joy.cheerful.playful' },
        ],
      },
      {
        key: 'joy.proud',
        tertiary: [
          { key: 'joy.proud.confident' },
          { key: 'joy.proud.triumphant' },
          { key: 'joy.proud.fulfilled' },
        ],
      },
      {
        key: 'joy.hopeful',
        tertiary: [
          { key: 'joy.hopeful.optimistic' },
          { key: 'joy.hopeful.inspired' },
          { key: 'joy.hopeful.motivated' },
        ],
      },
      {
        key: 'joy.ecstatic',
        tertiary: [
          { key: 'joy.ecstatic.elated' },
          { key: 'joy.ecstatic.blissful' },
          { key: 'joy.ecstatic.euphoric' },
        ],
      },
    ],
  },
  {
    key: 'love',
    color: '#facc15',
    startAngle: 210,
    endAngle: 270,
    secondary: [
      {
        key: 'love.tender',
        tertiary: [
          { key: 'love.tender.gentle' },
          { key: 'love.tender.caring' },
          { key: 'love.tender.warm' },
        ],
      },
      {
        key: 'love.grateful',
        tertiary: [
          { key: 'love.grateful.thankful' },
          { key: 'love.grateful.blessed' },
          { key: 'love.grateful.valued' },
        ],
      },
      {
        key: 'love.romantic',
        tertiary: [
          { key: 'love.romantic.desired' },
          { key: 'love.romantic.smitten' },
          { key: 'love.romantic.adored' },
        ],
      },
      {
        key: 'love.trusting',
        tertiary: [
          { key: 'love.trusting.secure' },
          { key: 'love.trusting.safe' },
          { key: 'love.trusting.connected' },
        ],
      },
      {
        key: 'love.devoted',
        tertiary: [
          { key: 'love.devoted.loyal' },
          { key: 'love.devoted.faithful' },
          { key: 'love.devoted.committed' },
        ],
      },
    ],
  },
  {
    key: 'fear',
    color: '#f87171',
    startAngle: 270,
    endAngle: 330,
    secondary: [
      {
        key: 'fear.scared',
        tertiary: [
          { key: 'fear.scared.terrified' },
          { key: 'fear.scared.frightened' },
          { key: 'fear.scared.petrified' },
        ],
      },
      {
        key: 'fear.anxious',
        tertiary: [
          { key: 'fear.anxious.worried' },
          { key: 'fear.anxious.nervous' },
          { key: 'fear.anxious.uneasy' },
        ],
      },
      {
        key: 'fear.insecure',
        tertiary: [
          { key: 'fear.insecure.vulnerable' },
          { key: 'fear.insecure.inadequate' },
          { key: 'fear.insecure.worthless' },
        ],
      },
      {
        key: 'fear.overwhelmed',
        tertiary: [
          { key: 'fear.overwhelmed.panicked' },
          { key: 'fear.overwhelmed.frantic' },
          { key: 'fear.overwhelmed.desperate' },
        ],
      },
      {
        key: 'fear.rejected',
        tertiary: [
          { key: 'fear.rejected.humiliated' },
          { key: 'fear.rejected.unwanted' },
          { key: 'fear.rejected.excluded' },
        ],
      },
    ],
  },
];
