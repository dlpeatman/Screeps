var creepLibrary = require('library.creeps');

const BUILDER_LIMIT = 3;
const HARVESTER_LIMIT = 8;
const UPGRADER_LIMIT = 3;

module.exports = {
    run() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === creepLibrary.HARVESTER);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === creepLibrary.UPGRADER);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role === creepLibrary.BUILDER);

        var spawn = Game.spawns['Spawn1'];

        if (harvesters.length < HARVESTER_LIMIT) {
            creepLibrary.spawnCreep(spawn, creepLibrary.HARVESTER);
        } else if (harvesters.length > upgraders.length && upgraders.length < UPGRADER_LIMIT) {
            creepLibrary.spawnCreep(spawn, creepLibrary.UPGRADER);
        } else if (harvesters.length > builders.length && builders.length < BUILDER_LIMIT) {
            creepLibrary.spawnCreep(spawn, creepLibrary.BUILDER);
        }
    }    
};