var roleCarry = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity)
        {
            var energy = creep.room.find(
                FIND_DROPPED_ENERGY
            );
        
            if (energy.length>0) {
                if(creep.pickup(energy[0]==ERR_NOT_IN_RANGE){
                    creep.moveTo(energy[0],{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleCarry;
