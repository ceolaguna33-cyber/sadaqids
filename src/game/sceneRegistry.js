import { Level1ClassroomScene } from './scenes/Level1ClassroomScene';
import { Level2DistributionScene } from './scenes/Level2DistributionScene';
import { Level3MangroveScene } from './scenes/Level3MangroveScene';
import { Level4PriorityScene } from './scenes/Level4PriorityScene';
import { Level5DetectiveScene } from './scenes/Level5DetectiveScene';
import { Level6KingdomScene } from './scenes/Level6KingdomScene';

export const LEVEL_SCENES = {
  1: Level1ClassroomScene,
  2: Level2DistributionScene,
  3: Level3MangroveScene,
  4: Level4PriorityScene,
  5: Level5DetectiveScene,
  6: Level6KingdomScene,
};

export function getSceneForLevel(levelId) {
  return LEVEL_SCENES[levelId] || Level1ClassroomScene;
}
