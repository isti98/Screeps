var roleCarry = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.pos.findClosestByPath(
                FIND_DROPPED_RESOURCES || FIND_TOMBSTONES
            );
            if (energy) {
                console.log(creep.pickup(energy));
                
                if(creep.pickup(energy==ERR_NOT_IN_RANGE)){
                    creep.moveTo(energy,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
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
        else{
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER ) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            console.log('target: '+(targets!=null));
            if(targets != null ) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});    
                }
            }else{
                var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                console.log('containers: '+ (containers!=null));
                if(containers!=null) {
                    if(creep.transfer(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers, {visualizePathStyle: {stroke: '#ffffff'}});    
                    }
                }
            }
	    }
    }
};

module.exports = roleCarry;
