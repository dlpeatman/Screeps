
module.exports = {
    addRoads() {
        var spawn = Game.spawns['Spawn1'];
        var room = spawn.room;
        var sources = room.find(FIND_SOURCES);
        
        for (var i=0; i<sources.length; i++) {
            var source = sources[i];
            var roadPath = room.findPath(spawn.pos, source.pos, {ignoreCreeps: true, ignoreRoads: true});
            for (var j=0; j<roadPath.length; j++) {
                var point = roadPath[j];
                room.createConstructionSite(point.x, point.y, STRUCTURE_ROAD);
            }
        }
        
        var controllerPath = room.findPath(spawn.pos, room.controller.pos, {ignoreCreeps: true, ignoreRoads: true});
        for (var j=0; j<controllerPath.length; j++) {
            var point = controllerPath[j];
            room.createConstructionSite(point.x, point.y, STRUCTURE_ROAD);
        }
        
    }
};