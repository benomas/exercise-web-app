export default function(globals){
  this.cvEnv         = globals.cvEnv;
  this.cvComunicator = globals.cvComunicator;
  this.resourceName  = "general";

  this.login=function(username,password){
    this.cvComunicator.axios.post("oauth/token",{
        "client_id":this.cvEnv.apiClient(),
        "client_secret":this.cvEnv.apiSecret(),
        "grant_type":"password",
        "username":username,   
        "password":password
    }).then( (response)=>{
        this.cvComunicator.router.VueRouter.push('/');
        console.log(response);
    }).catch( (error)=>{
        console.log(error);
    });
  }
  this.cvComunicator.pushDinamicCrudServices(this);
};