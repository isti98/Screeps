class Role{
    

    
    let errorMessage = "Role is an abstrakt class";
    contructor(){
        throw new Error(errorMessage +', no construtor can be called');}
    }
};





module.exports = Role;