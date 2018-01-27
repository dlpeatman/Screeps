const HARVESTER = 'harvester';
const UPGRADER = 'upgrader';
const BUILDER = 'builder';

const BIG_CREEP_PARTS = {
    [HARVESTER]: [MOVE, MOVE, MOVE, CARRY, WORK, WORK, WORK],
    [UPGRADER]: [MOVE, CARRY, WORK],
    [BUILDER]: [MOVE, CARRY, WORK]
};

const DEFUALT_PARTS = [MOVE, CARRY, WORK];

module.exports = {
    HARVESTER,
    UPGRADER,
    BUILDER,

    spawnCreep(spawn, creepType) {
        const creepParts = BIG_CREEP_PARTS[creepType] || DEFUALT_PARTS;
        const code = spawn.spawnCreep(creepParts, creepType + Game.time, {
                memory: {
                    role: creepType,
                    room: spawn.room.name
                }
            });
        if (code === OK) {
            console.log('Spawning ' + creepType);
        } else if (code === ERR_NOT_ENOUGH_ENERGY && creepParts !== DEFUALT_PARTS) {
            spawn.spawnCreep(DEFUALT_PARTS, creepType + Game.time, {
                memory: {
                    role: creepType,
                    room: spawn.room.name
                }
            });
        }
    }
};
