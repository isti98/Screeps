var roleMiner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.pos.findClosestByPath(FIND_SOURCES);
        //var target =  Game.getObjectById(creep.memory.attachedTo);
        if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleMiner;