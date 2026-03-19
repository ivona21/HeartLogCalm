import type { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';

export const MOCK_EMOTIONS: BackendCoreEmotion[] = [
  {
    id: 'anger',
    label: 'Anger',
    color: '#DC6B82',
    children: [
      {
        id: 'anger.rage',
        label: 'Rage',
        children: [
          { id: 'anger.rage.hate', label: 'Hate' },
          { id: 'anger.rage.hostile', label: 'Hostile' },
        ],
      },
      {
        id: 'anger.exasperated',
        label: 'Exasperated',
        children: [
          { id: 'anger.exasperated.agitated', label: 'Agitated' },
          { id: 'anger.exasperated.frustrated', label: 'Frustrated' },
        ],
      },
      {
        id: 'anger.irritable',
        label: 'Irritable',
        children: [
          { id: 'anger.irritable.annoyed', label: 'Annoyed' },
          { id: 'anger.irritable.aggravated', label: 'Aggravated' },
        ],
      },
      {
        id: 'anger.envy',
        label: 'Envy',
        children: [
          { id: 'anger.envy.resentful', label: 'Resentful' },
          { id: 'anger.envy.jealous', label: 'Jealous' },
        ],
      },
      {
        id: 'anger.disgust',
        label: 'Disgust',
        children: [
          { id: 'anger.disgust.contempt', label: 'Contempt' },
          { id: 'anger.disgust.revolted', label: 'Revolted' },
        ],
      },
    ],
  },
  {
    id: 'sadness',
    label: 'Sadness',
    color: '#9E85C8',
    children: [
      {
        id: 'sadness.suffering',
        label: 'Suffering',
        children: [
          { id: 'sadness.suffering.agony', label: 'Agony' },
          { id: 'sadness.suffering.hurt', label: 'Hurt' },
        ],
      },
      {
        id: 'sadness.disappointed',
        label: 'Disappointed',
        children: [
          { id: 'sadness.disappointed.depressed', label: 'Depressed' },
          { id: 'sadness.disappointed.sorrow', label: 'Sorrow' },
        ],
      },
      {
        id: 'sadness.shameful',
        label: 'Shameful',
        children: [
          { id: 'sadness.shameful.regretful', label: 'Regretful' },
          { id: 'sadness.shameful.guilty', label: 'Guilty' },
        ],
      },
      {
        id: 'sadness.neglected',
        label: 'Neglected',
        children: [
          { id: 'sadness.neglected.isolated', label: 'Isolated' },
          { id: 'sadness.neglected.lonely', label: 'Lonely' },
        ],
      },
      {
        id: 'sadness.despair',
        label: 'Despair',
        children: [
          { id: 'sadness.despair.grief', label: 'Grief' },
          { id: 'sadness.despair.powerless', label: 'Powerless' },
        ],
      },
    ],
  },
  {
    id: 'surprise',
    label: 'Surprise',
    color: '#68B8B2',
    children: [
      {
        id: 'surprise.stunned',
        label: 'Stunned',
        children: [
          { id: 'surprise.stunned.shocked', label: 'Shocked' },
          { id: 'surprise.stunned.dismayed', label: 'Dismayed' },
        ],
      },
      {
        id: 'surprise.confused',
        label: 'Confused',
        children: [
          { id: 'surprise.confused.disillusioned', label: 'Disillusioned' },
          { id: 'surprise.confused.perplexed', label: 'Perplexed' },
        ],
      },
      {
        id: 'surprise.amazed',
        label: 'Amazed',
        children: [
          { id: 'surprise.amazed.astonished', label: 'Astonished' },
          { id: 'surprise.amazed.awestruck', label: 'Awe-struck' },
        ],
      },
      {
        id: 'surprise.overcome',
        label: 'Overcome',
        children: [
          { id: 'surprise.overcome.speechless', label: 'Speechless' },
          { id: 'surprise.overcome.astounded', label: 'Astounded' },
        ],
      },
      {
        id: 'surprise.moved',
        label: 'Moved',
        children: [
          { id: 'surprise.moved.stimulated', label: 'Stimulated' },
          { id: 'surprise.moved.touched', label: 'Touched' },
        ],
      },
    ],
  },
  {
    id: 'joy',
    label: 'Joy',
    color: '#8DC878',
    children: [
      {
        id: 'joy.content',
        label: 'Content',
        children: [
          { id: 'joy.content.pleased', label: 'Pleased' },
          { id: 'joy.content.satisfied', label: 'Satisfied' },
        ],
      },
      {
        id: 'joy.happy',
        label: 'Happy',
        children: [
          { id: 'joy.happy.amused', label: 'Amused' },
          { id: 'joy.happy.delighted', label: 'Delighted' },
        ],
      },
      {
        id: 'joy.cheerful',
        label: 'Cheerful',
        children: [
          { id: 'joy.cheerful.jovial', label: 'Jovial' },
          { id: 'joy.cheerful.blissful', label: 'Blissful' },
        ],
      },
      {
        id: 'joy.proud',
        label: 'Proud',
        children: [
          { id: 'joy.proud.triumphant', label: 'Triumphant' },
          { id: 'joy.proud.illustrious', label: 'Illustrious' },
        ],
      },
      {
        id: 'joy.optimistic',
        label: 'Optimistic',
        children: [
          { id: 'joy.optimistic.hopeful', label: 'Hopeful' },
          { id: 'joy.optimistic.eager', label: 'Eager' },
        ],
      },
    ],
  },
  {
    id: 'love',
    label: 'Love',
    color: '#E8C85A',
    children: [
      {
        id: 'love.affectionate',
        label: 'Affectionate',
        children: [
          { id: 'love.affectionate.fondness', label: 'Fondness' },
          { id: 'love.affectionate.romantic', label: 'Romantic' },
        ],
      },
      {
        id: 'love.enthralled',
        label: 'Enthralled',
        children: [
          { id: 'love.enthralled.rapture', label: 'Rapture' },
          { id: 'love.enthralled.enchanted', label: 'Enchanted' },
        ],
      },
      {
        id: 'love.longing',
        label: 'Longing',
        children: [
          { id: 'love.longing.attracted', label: 'Attracted' },
          { id: 'love.longing.sentimental', label: 'Sentimental' },
        ],
      },
      {
        id: 'love.desire',
        label: 'Desire',
        children: [
          { id: 'love.desire.infatuation', label: 'Infatuation' },
          { id: 'love.desire.passion', label: 'Passion' },
        ],
      },
      {
        id: 'love.tenderness',
        label: 'Tenderness',
        children: [
          { id: 'love.tenderness.caring', label: 'Caring' },
          { id: 'love.tenderness.compassionate', label: 'Compassionate' },
        ],
      },
    ],
  },
  {
    id: 'fear',
    label: 'Fear',
    color: '#E8966E',
    children: [
      {
        id: 'fear.peaceful',
        label: 'Peaceful',
        children: [
          { id: 'fear.peaceful.satisfied', label: 'Satisfied' },
          { id: 'fear.peaceful.relieved', label: 'Relieved' },
        ],
      },
      {
        id: 'fear.scared',
        label: 'Scared',
        children: [
          { id: 'fear.scared.frightened', label: 'Frightened' },
          { id: 'fear.scared.helpless', label: 'Helpless' },
        ],
      },
      {
        id: 'fear.terror',
        label: 'Terror',
        children: [
          { id: 'fear.terror.panic', label: 'Panic' },
          { id: 'fear.terror.hysterical', label: 'Hysterical' },
        ],
      },
      {
        id: 'fear.insecure',
        label: 'Insecure',
        children: [
          { id: 'fear.insecure.inferior', label: 'Inferior' },
          { id: 'fear.insecure.inadequate', label: 'Inadequate' },
        ],
      },
      {
        id: 'fear.nervous',
        label: 'Nervous',
        children: [
          { id: 'fear.nervous.worried', label: 'Worried' },
          { id: 'fear.nervous.anxious', label: 'Anxious' },
        ],
      },
    ],
  },
];
