module.exports = {
    place() {
        var spawn = Game.spawns['Spawn1'];
        var room = spawn.room;

        //const MAX_ATTEMPTS = 20;
        //const MAX_EXTENSIONS = 5;

        //var buildsStarted = _.filter(room.find(FIND_STRUCTURES), (structure) => structure.structureType === STRUCTURE_EXTENSION).length;
        
        var origin = spawn.pos;
        room.createConstructionSite(origin.x + 3, origin.y, STRUCTURE_TOWER);
        room.createConstructionSite(origin.x - 3, origin.y, STRUCTURE_TOWER);
        room.createConstructionSite(origin.x, origin.y + 3, STRUCTURE_TOWER);
        room.createConstructionSite(origin.x, origin.y - 3, STRUCTURE_TOWER);
        
    }
};