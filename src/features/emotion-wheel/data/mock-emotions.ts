import { BackendCoreEmotion } from '@/features/emotion-wheel/types/backend-emotion.ts';

export const MOCK_EMOTIONS: BackendCoreEmotion[] = [
  {
    id: 'fear',
    label: 'Fear',
    color: '#F2994A',
    children: [
      {
        id: 'fear.uneasy',
        label: 'Uneasy',
        children: [
          { id: 'fear.uneasy.uneasy', label: 'Uneasy' },
          { id: 'fear.uneasy.apprehensive', label: 'Apprehensive' },
        ],
      },
      {
        id: 'fear.anxious',
        label: 'Anxious',
        children: [
          { id: 'fear.anxious.worried', label: 'Worried' },
          { id: 'fear.anxious.stressed', label: 'Stressed' },
        ],
      },
      {
        id: 'fear.insecure',
        label: 'Insecure',
        children: [
          { id: 'fear.insecure.inadequate', label: 'Inadequate' },
          { id: 'fear.insecure.inferior', label: 'Inferior' },
        ],
      },
      {
        id: 'fear.frightened',
        label: 'Frightened',
        children: [
          { id: 'fear.frightened.scared', label: 'Scared' },
          { id: 'fear.frightened.alarmed', label: 'Alarmed' },
        ],
      },
      {
        id: 'fear.terrified',
        label: 'Terrified',
        children: [
          { id: 'fear.terrified.panicked', label: 'Panicked' },
          { id: 'fear.terrified.horrified', label: 'Horrified' },
        ],
      },
    ],
  },
  {
    id: 'anger',
    label: 'Anger',
    color: '#EB5757',
    children: [
      {
        id: 'anger.irritated',
        label: 'Irritated',
        children: [
          { id: 'anger.irritated.annoyed', label: 'Annoyed' },
          { id: 'anger.irritated.frustrated', label: 'Frustrated' },
        ],
      },
      {
        id: 'anger.resentful',
        label: 'Resentful',
        children: [
          { id: 'anger.resentful.bitter', label: 'Bitter' },
          { id: 'anger.resentful.offended', label: 'Offended' },
        ],
      },
      {
        id: 'anger.furious',
        label: 'Furious',
        children: [
          { id: 'anger.furious.enraged', label: 'Enraged' },
          { id: 'anger.furious.livid', label: 'Livid' },
        ],
      },
      {
        id: 'anger.defensive',
        label: 'Defensive',
        children: [
          { id: 'anger.defensive.guarded', label: 'Guarded' },
          { id: 'anger.defensive.provoked', label: 'Provoked' },
        ],
      },
      {
        id: 'anger.wronged',
        label: 'Wronged',
        children: [
          { id: 'anger.wronged.insulted', label: 'Insulted' },
          { id: 'anger.wronged.betrayed', label: 'Betrayed' },
        ],
      },
    ],
  },
  {
    id: 'disgust',
    label: 'Disgust',
    color: '#8D6E63',
    children: [
      {
        id: 'disgust.repulsed',
        label: 'Repulsed',
        children: [
          { id: 'disgust.repulsed.disgusted', label: 'Disgusted' },
          { id: 'disgust.repulsed.revolted', label: 'Revolted' },
        ],
      },
      {
        id: 'disgust.contempt',
        label: 'Contempt',
        children: [
          { id: 'disgust.contempt.scornful', label: 'Scornful' },
          { id: 'disgust.contempt.disdainful', label: 'Disdainful' },
        ],
      },
      {
        id: 'disgust.averse',
        label: 'Averse',
        children: [
          { id: 'disgust.averse.uncomfortable', label: 'Uncomfortable' },
          { id: 'disgust.averse.resistant', label: 'Resistant' },
        ],
      },
    ],
  },
  {
    id: 'calm',
    label: 'Calm',
    color: '#6FCF97',
    children: [
      {
        id: 'calm.relaxed',
        label: 'Relaxed',
        children: [
          { id: 'calm.relaxed.at-ease', label: 'At ease' },
          { id: 'calm.relaxed.restful', label: 'Restful' },
        ],
      },
      {
        id: 'calm.safe',
        label: 'Safe',
        children: [
          { id: 'calm.safe.secure', label: 'Secure' },
          { id: 'calm.safe.protected', label: 'Protected' },
        ],
      },
      {
        id: 'calm.relieved',
        label: 'Relieved',
        children: [
          { id: 'calm.relieved.reassured', label: 'Reassured' },
          { id: 'calm.relieved.comforted', label: 'Comforted' },
        ],
      },
      {
        id: 'calm.peaceful',
        label: 'Peaceful',
        children: [
          { id: 'calm.peaceful.tranquil', label: 'Tranquil' },
          { id: 'calm.peaceful.serene', label: 'Serene' },
        ],
      },
    ],
  },
  {
    id: 'joy',
    label: 'Joy',
    color: '#F2C94C',
    children: [
      {
        id: 'joy.cheerful',
        label: 'Cheerful',
        children: [
          { id: 'joy.cheerful.happy', label: 'Happy' },
          { id: 'joy.cheerful.delighted', label: 'Delighted' },
        ],
      },
      {
        id: 'joy.playful',
        label: 'Playful',
        children: [
          { id: 'joy.playful.amused', label: 'Amused' },
          { id: 'joy.playful.lighthearted', label: 'Lighthearted' },
        ],
      },
      {
        id: 'joy.proud',
        label: 'Proud',
        children: [
          { id: 'joy.proud.confident', label: 'Confident' },
          { id: 'joy.proud.accomplished', label: 'Accomplished' },
        ],
      },
      {
        id: 'joy.fulfilled',
        label: 'Fulfilled',
        children: [
          { id: 'joy.fulfilled.satisfied', label: 'Satisfied' },
          { id: 'joy.fulfilled.content', label: 'Content' },
        ],
      },
      {
        id: 'joy.hopeful',
        label: 'Hopeful',
        children: [
          { id: 'joy.hopeful.hopeful', label: 'Hopeful' },
          { id: 'joy.hopeful.optimistic', label: 'Optimistic' },
        ],
      },
    ],
  },
  {
    id: 'love',
    label: 'Love',
    color: '#9B8AC9',
    children: [
      {
        id: 'love.affectionate',
        label: 'Affectionate',
        children: [
          { id: 'love.affectionate.loving', label: 'Loving' },
          { id: 'love.affectionate.warm', label: 'Warm' },
        ],
      },
      {
        id: 'love.caring',
        label: 'Caring',
        children: [
          { id: 'love.caring.compassionate', label: 'Compassionate' },
          { id: 'love.caring.nurturing', label: 'Nurturing' },
        ],
      },
      {
        id: 'love.tender',
        label: 'Tender',
        children: [
          { id: 'love.tender.gentle', label: 'Gentle' },
          { id: 'love.tender.softhearted', label: 'Softhearted' },
        ],
      },
      {
        id: 'love.attracted',
        label: 'Attracted',
        children: [
          { id: 'love.attracted.enchanted', label: 'Enchanted' },
          { id: 'love.attracted.infatuated', label: 'Infatuated' },
        ],
      },
      {
        id: 'love.connected',
        label: 'Connected',
        children: [
          { id: 'love.connected.close', label: 'Close' },
          { id: 'love.connected.trusting', label: 'Trusting' },
        ],
      },
    ],
  },
  {
    id: 'surprise',
    label: 'Surprise',
    color: '#56CCF2',
    children: [
      {
        id: 'surprise.startled',
        label: 'Startled',
        children: [
          { id: 'surprise.startled.jolted', label: 'Jolted' },
          { id: 'surprise.startled.shaken', label: 'Shaken' },
        ],
      },
      {
        id: 'surprise.confused',
        label: 'Confused',
        children: [
          { id: 'surprise.confused.puzzled', label: 'Puzzled' },
          { id: 'surprise.confused.perplexed', label: 'Perplexed' },
        ],
      },
      {
        id: 'surprise.amazed',
        label: 'Amazed',
        children: [
          { id: 'surprise.amazed.astonished', label: 'Astonished' },
          { id: 'surprise.amazed.awestruck', label: 'Awestruck' },
        ],
      },
    ],
  },
  {
    id: 'sadness',
    label: 'Sadness',
    color: '#2D9CDB',
    children: [
      {
        id: 'sadness.hurt',
        label: 'Hurt',
        children: [
          { id: 'sadness.hurt.wounded', label: 'Wounded' },
          { id: 'sadness.hurt.crushed', label: 'Crushed' },
        ],
      },
      {
        id: 'sadness.lonely',
        label: 'Lonely',
        children: [
          { id: 'sadness.lonely.isolated', label: 'Isolated' },
          { id: 'sadness.lonely.abandoned', label: 'Abandoned' },
        ],
      },
      {
        id: 'sadness.disappointed',
        label: 'Disappointed',
        children: [
          { id: 'sadness.disappointed.let-down', label: 'Let down' },
          { id: 'sadness.disappointed.discouraged', label: 'Discouraged' },
        ],
      },
      {
        id: 'sadness.grieving',
        label: 'Grieving',
        children: [
          { id: 'sadness.grieving.sorrowful', label: 'Sorrowful' },
          { id: 'sadness.grieving.heartbroken', label: 'Heartbroken' },
        ],
      },
      {
        id: 'sadness.despairing',
        label: 'Despairing',
        children: [
          { id: 'sadness.despairing.hopeless', label: 'Hopeless' },
          { id: 'sadness.despairing.powerless', label: 'Powerless' },
        ],
      },
      {
        id: 'sadness.regretful',
        label: 'Regretful',
        children: [
          { id: 'sadness.regretful.guilty', label: 'Guilty' },
          { id: 'sadness.regretful.remorseful', label: 'Remorseful' },
        ],
      },
    ],
  },
];
