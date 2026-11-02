import * as migration_20261102_152009_initial from './20261102_152009_initial';

export const migrations = [
  {
    up: migration_20261102_152009_initial.up,
    down: migration_20261102_152009_initial.down,
    name: '20261102_152009_initial'
  },
];
