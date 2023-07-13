var roleMiner = {
       /** @param {Creep} creep **/
    run: function(creep) {
        var target =  Game.getObjectById(creep.memory.attachedTo);
        if(creep.harvest(Game.getObjectById(creep.memory.attachedTo)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.attachedTo), {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleMiner;