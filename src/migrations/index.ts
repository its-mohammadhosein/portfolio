import * as migration_20261102_152009_initial from './20261102_152009_initial';
import * as migration_20261102_154349_footer_credit from './20261102_154349_footer_credit';

export const migrations = [
  {
    up: migration_20261102_152009_initial.up,
    down: migration_20261102_152009_initial.down,
    name: '20261102_152009_initial',
  },
  {
    up: migration_20261102_154349_footer_credit.up,
    down: migration_20261102_154349_footer_credit.down,
    name: '20261102_154349_footer_credit'
  },
];
