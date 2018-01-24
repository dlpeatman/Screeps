/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
const STYLE = {
    stroke: '#77f',
    lineStyle: 'solid'
}
    
module.exports = {
    run(creep) {
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.upgrading) {
            var spawn = Game.spawns['Spawn1'];
            if (creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn, {visualizePathStyle: STYLE});
            }
        } else {
            var controller = creep.room.controller;
            if (creep.carry.energy == 0) {
                creep.memory.upgrading = false;
            } else {
                creep.memory.upgrading = true;
            }
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {visualizePathStyle: STYLE});
            }
        }
    }
};