var aiReaper = require('ai.reaper');
var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var aiSpawnDecider = require('ai.spawn.decider');
var aiConstructionRoads = require('construction.roads');
var aiConstructionExtensions = require('construction.extensions');
var aiConstructionTowers = require('construction.towers');
var towerAi = require('ai.towers');

module.exports.loop = function () {
    aiReaper.clean();
    aiConstructionExtensions.place();
    aiConstructionTowers.place();
    aiSpawnDecider.run();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
        case 'harvester':
            roleHarvester.run(creep);
            break;
        case 'upgrader':
            roleUpgrader.run(creep);
            break;
        case 'builder':
            roleBuilder.run(creep);
            break;
        }
    }

    for (const name in Game.rooms) {
        const room = Game.rooms[name];
        const towers = room.find(FIND_STRUCTURES, {
                filter: {
                    structureType: STRUCTURE_TOWER
                }
            });
        for (const tower in towers) {
            towerAi.run(towers[tower]);
        }
    }

    aiConstructionRoads.addRoads();
}
