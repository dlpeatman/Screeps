module.exports = {
    clean() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                var creep = Memory.creeps[name];
                var room = creep.room;
                if (Memory.creeps[name].role === 'harvester') {
                    var sourceId = Memory.creeps[name].sourceId;
                    console.log('Removing ' + name + ' from source ' + sourceId);
                    var enlistedCreeps = Memory.rooms[room].sources[sourceId];
                    var index = enlistedCreeps.indexOf(name);
                    if (index > -1) {
                        Memory.rooms[room].sources[sourceId].splice(index, 1);
                    }
                }
                delete Memory.creeps[name];
            }
        }
    }
};