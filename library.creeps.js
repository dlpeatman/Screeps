const HARVESTER = 'harvester';
const BIG_HARVESTER = HARVESTER;
const UPGRADER = 'upgrader';
const BUILDER = 'builder';

const CREEP_PARTS = {
    HARVESTER: [MOVE, CARRY, WORK],
    BIG_HARVESTER: [MOVE, MOVE, CARRY, WORK]
};

module.exports = {
    HARVESTER,
    UPGRADER,
    BUILDER,
    
    spawnCreep(spawn, creepType) {
        switch (creepType) {
        case HARVESTER:
            if (spawn.spawnCreep([MOVE, CARRY, WORK], HARVESTER + Game.time, {memory: {role: HARVESTER, room: spawn.room.name}}) == OK) {
                console.log('Spawning ' + HARVESTER);
            }
            break;
        case UPGRADER:
            if (spawn.spawnCreep([MOVE, CARRY, WORK], UPGRADER + Game.time, {memory: {role: UPGRADER, room: spawn.room.name}}) == OK) {
                console.log('Spawning ' + UPGRADER);
            }
            break;
        case BUILDER:
            if (spawn.spawnCreep([MOVE, CARRY, WORK], BUILDER + Game.time, {memory: {role: BUILDER, room: spawn.room.name}}) == OK) {
                console.log('Spawning ' + BUILDER);
            }
            break;
        }
    }
};