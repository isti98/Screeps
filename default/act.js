//abstrakt osztály 
class Act{
        func() {

    }
}

class Build extends Act{
    func(target, creepId){
        Game.creeps[creepId].build(Game.getObjectById(target));
    }
}
class Harvest extends Act{
    func(target, creepId){
        Game.creeps[creepId].harvest(Game.getObjectById(target));
    }
}
class Move extends Act{
   func(path, creepId){
        Game.creeps[creepId].moveByPath(path);
    }
}
class Upgrade extends Act{
    func(target, creepId){
        Game.creeps[creepId].upgrade(Game.getObjectById(target));
    }
}
class Transfer extends Act{
    func(target, creepId){
        Game.creeps[creepId].transfer(Game.getObjectById(target));
    }
}
class Pull extends Act{
    func(target, creepId){
        Game.creeps[creepId].pull(Game.getObjectById(target));
    }
}
class Follow extends Act{
    func(target, creepId){
        Game.creeps[creepId].moveTo(Game.getObjectById(target));
    }
}
class Drop extends Act{
    func(target, creepId){
        Game.creeps[creepId].drop(Game.getObjectById(target));
    }
}

module.exports = {Act,Build,Harvest,Drop,Follow,Pull,Transfer,Upgrade,Move};