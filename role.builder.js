const STYLE = {
    stroke: '#f55',
    lineStyle: 'solid'
}
    
module.exports = {
    run(creep) {
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.building) {
            var spawn = Game.spawns['Spawn1'];
            if (creep.withdraw(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn, {visualizePathStyle: STYLE});
            }
        } else {
            if (creep.carry.energy == 0) {
                creep.memory.building = false;
            } else {
                creep.memory.building = true;
            }
            
            var buildSites = creep.room.find(FIND_CONSTRUCTION_SITES);
            var nonRoads = _.filter(buildSites, (site) => site.structureType !== STRUCTURE_ROAD);
            
            if (nonRoads.length > 0) {
                var site = nonRoads[0];
                //console.log('Building a ' + site.structureType);
                if (creep.build(site) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(site, {visualizePathStyle: STYLE});
                }
            } else {
                //console.log('Building a road');
                var site = buildSites[0];
                if (creep.build(site) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(site, {visualizePathStyle: STYLE});
                }
            }
        }
    }
};