var aiReaper = require('ai.reaper');
var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var aiSpawnDecider = require('ai.spawn.decider');
var aiConstructionRoads = require('ai.construction.roads');
var aiConstructionExtensions = require('ai.construction.extensions');
var aiConstructionTowers = require('ai.construction.towers');

module.exports.loop = function() {
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

    aiConstructionRoads.addRoads();
}