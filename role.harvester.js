const MAX_HARVESTERS_PER_SOURCE = 3;
const PATH_STYLE = {stroke:'#ff0', 'lineStyle': 'solid'};

const DROP_OFF_STRUCTURES = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER];
const STRUCTURE_FILTER = (structure) => {
    return DROP_OFF_STRUCTURES.includes(structure.structureType)
            && structure.energy < structure.energyCapacity;
}


const populateSources = function(creep) {
    const roomName = creep.room.name;
    const { rooms = {} } = Memory;
    const room = rooms[roomName] || {};
    let { sources = {} } = room;
    if (Object.keys(sources).length === 0) {
        sources = creep.room.find(FIND_SOURCES).reduce(function(map, source) {
            map[source.id] = [];
            return map;
        }, {});
        console.log(sources);
        Memory.rooms = rooms;
        Memory.rooms[roomName] = room;
        Memory.rooms[roomName].sources = sources;
    }
}

const assignSource = function(creep, sources) {
    console.log("Finding a source for " + creep.name);
    
    for (const id in sources) {
        if (sources[id].length < MAX_HARVESTERS_PER_SOURCE) {
            if (!sources[id].includes(creep.name)) {
                sources[id].push(creep.name);
            }
            creep.memory.sourceId = id;
            return true;
        }
    }
    console.log("Could not find a source for " + creep.name + " among sources: " + Object.keys(sources));
    return false;
}
module.exports = {
    run(creep) {
        populateSources(creep);

        if (creep.carry.energy < creep.carryCapacity) {
            const sources = Memory.rooms[creep.room.name].sources;

            if (!creep.memory.sourceId) {
                const succeeded = assignSource(creep, sources);
                if (!succeeded) {
                    return;
                }
            }
            
            const selectedSourceId = creep.memory.sourceId;
            if (!sources[selectedSourceId].includes(creep.name)) {
                sources[selectedSourceId].push(creep.name);
            }

            const selectedSource = Game.getObjectById(selectedSourceId);
            if (creep.harvest(selectedSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(selectedSource, {visualizePathStyle: PATH_STYLE});
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {filter: STRUCTURE_FILTER});
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: PATH_STYLE});
            }
        }
    }
};