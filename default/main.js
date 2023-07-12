//Includes 
var roleGatherer = require('role.Gatherer');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleCarry = require('role.Carry');
var roleMiner = require('role.Miner');

//Setting up variables in the memory


//Main loop
module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    console.log(Game.time);
    if(Game.time%10==0){
        Game.spawns['Spawn1'].memory.numberOfGatherers=0;
        Game.spawns['Spawn1'].memory.numberOfBuilders=2;
        Game.spawns['Spawn1'].memory.numberOfUpgraders=0;
        Game.spawns['Spawn1'].memory.numberOfMiners=1;
        Game.spawns['Spawn1'].memory.numberOfCarries=3
        Game.spawns['Spawn1'].memory.myRooms=['W56N17'];
        
        var avaiableSource = Game.rooms['W56N17'].energyCapacityAvailable;
        console.log("AvaibleSources: "+ avaiableSource);
        var BodyMiner=[];
        var BodyCarry=[CARRY,MOVE];
        var Body=[WORK,CARRY,MOVE];
        var numberOfBodyParts = (avaiableSource)/100;
        var i;
        for(i=0; i<numberOfBodyParts-1.5; ++i)
        {
            BodyMiner[i]=WORK;
        }
        BodyMiner[i]=MOVE;
        console.log(BodyMiner);
        var gatherers = (_.filter(Game.creeps, (creep) => creep.memory.role == 'gatherer')).length;
        console.log('Gatherer: ' + gatherers+" < "+Game.spawns["Spawn1"].memory.numberOfGatherers);
        var upgraders = (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')).length;
        console.log('Upgrader: ' + upgraders+" < "+Game.spawns["Spawn1"].memory.numberOfUpgraders);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
        console.log('Builder: ' + builders+" < "+Game.spawns["Spawn1"].memory.numberOfBuilders);
        var carries = (_.filter(Game.creeps, (creep) => creep.memory.role == 'carry')).length;
        console.log('Carries: ' + carries+" < "+Game.spawns["Spawn1"].memory.numberOfCarries);
        var miners = (_.filter(Game.creeps, (creep) => creep.memory.role == 'miner')).length;
        console.log('Miners: ' + miners+" < "+Game.spawns["Spawn1"].memory.numberOfMiners);
        if(gatherers<Game.spawns['Spawn1'].memory.numberOfGatherers)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Gatherer'+Game.time,{memory:{role:"gatherer"}});
        }
        else if(builders<Game.spawns['Spawn1'].memory.numberOfBuilders)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Builder'+Game.time,{memory:{role:"builder"}});
        }
        else if(upgraders<Game.spawns['Spawn1'].memory.numberOfUpgraders)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Upgrader'+Game.time,{memory:{role:"upgrader"}});
        }
        else if(carries<Game.spawns['Spawn1'].memory.numberOfCarries)
        {
            Game.spawns["Spawn1"].spawnCreep(BodyCarry,'Carry'+Game.time,{memory:{role:"carry"}});
        }
        else if(miners<Game.spawns['Spawn1'].memory.numberOfMiners)
        {
            Game.spawns["Spawn1"].spawnCreep(BodyMiner,'Miner'+Game.time,{memory:{role:"miner"}});
        }
    }


    var tower = Game.getObjectById('e60316bfcc3a253f9cb92688');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'gatherer') {
            roleGatherer.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'carry') {
            roleCarry.run(creep);
        }
        else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }
}