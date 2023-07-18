var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	    else {
	         var containers = creep.pos.findClosestByPath(FIND_STRUCTURES,
                        {filter:(structure)=>{
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ;
                }});
                if(creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers,{visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                var sources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES || FIND_TOMBSTONES );
                if(sources){
                    if(creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
        }
	}
};

module.exports = roleUpgrader;