import * as migration_20261102_152009_initial from './20261102_152009_initial';
import * as migration_20261102_154349_footer_credit from './20261102_154349_footer_credit';
import * as migration_20261102_154958_home_blocks from './20261102_154958_home_blocks';

export const migrations = [
  {
    up: migration_20261102_152009_initial.up,
    down: migration_20261102_152009_initial.down,
    name: '20261102_152009_initial',
  },
  {
    up: migration_20261102_154349_footer_credit.up,
    down: migration_20261102_154349_footer_credit.down,
    name: '20261102_154349_footer_credit',
  },
  {
    up: migration_20261102_154958_home_blocks.up,
    down: migration_20261102_154958_home_blocks.down,
    name: '20261102_154958_home_blocks'
  },
];
