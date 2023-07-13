var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(targets) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES || FIND_TOMBSTONES );
            if(sources){
                if(creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                var containers = creep.pos.findClosestByPath(FIND_STRUCTURES,
                        {filter:(structure)=>{
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0 ;
                }});
                if(creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	}
};

module.exports = roleBuilder;