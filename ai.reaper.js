const creepsLibrary = require('library.creeps');

module.exports = {
    clean() {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) {
                const creep = Memory.creeps[name];
                const roomName = creep.room;
                if (Memory.creeps[name].role === creepsLibrary.HARVESTER) {
                    const sourceId = Memory.creeps[name].sourceId;
                    if (sourceId) {
                        console.log('Removing ' + name + ' from source ' + sourceId);
                        const enlistedCreeps = Memory.rooms[roomName].sources[sourceId];
                        const index = enlistedCreeps.indexOf(name);
                        if (index > -1) {
                            Memory.rooms[roomName].sources[sourceId].splice(index, 1);
                        }
                    } else {
                        console.log('No sourceId found for ' + name + '. Deleting anyway.');
                    }
                }
                delete Memory.creeps[name];
            }
        }
    }
};
