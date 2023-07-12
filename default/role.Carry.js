var roleCarry = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.room.find(
                FIND_DROPPED_RESOURCES || FIND_TOMBSTONES
            );
        console.log(energy.length);
            if (energy.length>0) {
                console.log(creep.pickup(energy[0]));
                
                if(creep.pickup(energy[0]==ERR_NOT_IN_RANGE)){
                    creep.moveTo(energy[0],{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});    
                }
            }
        }
	}
};

module.exports = roleCarry;
