import { _decorator, Component, Node, Prefab, instantiate, Vec3, CCInteger, v3,find, Label } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('CopyCows')
export class CopyCows extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type: Prefab})
    public cowPrfb: Prefab = null;
    @property({type: Prefab})
    public CowsCon001: Prefab = null;
    @property({type: Prefab})
    public CowsCon002: Prefab = null;
    @property({type: Prefab})
    public CowsCon003: Prefab = null;
    @property({type: Prefab})
    public CowsCon004: Prefab = null;
    @property({type: Prefab})
    public CowsCon005: Prefab = null;
    @property({type: Prefab})
    public CowsCon006: Prefab = null;
    @property({type: Prefab})
    public CowsCon007: Prefab = null;
    @property({type: Prefab})
    public CowsCon008: Prefab = null;
    @property({type: Prefab})
    public CowsCon009: Prefab = null;
    @property({type: Prefab})
    public CowsCon0010: Prefab = null;

    // @property({type: CowsController})
    // public CowsController: CowsController = null;
    
    public cowsArr:number[] = [1, 6, 2, 7, 10, 3, 8 ,4 ,9 ,5];
    public cowsNum:number = 1;
    private startSite = 0;

    onLoad(){
        //this.getCow();
    }

    start () {
        // Your initialization goes here.  
    }
    
    onEnable(){
        //console.log('激活节点');
        //console.log(this.node.children)
        this.node.removeAllChildren();
        //console.log(this.node.children)
        
        this.getCow();
        
        // setTimeout(function () {
        //     this.node.destroy();
        //   }.bind(this), 5000);
    }

    onDisable(){
        console.log('关闭节点')
        this.unscheduleAllCallbacks();
    }

     //牛群数组
     groupCows(){
        

         
    }

    getCow(){
        //console.log('run')
        //let cow = instantiate(this.CowsCon);   
        //cow.setPosition(0, 0, 0);
        //this.node.addChild(cow);
        if(this.startSite > 9){
            this.startSite = 0;
        }
        this.cowsNum = this.cowsArr[this.startSite];
        this.startSite++; 
        
        //this.CowsCon.createdCow(this.cowsNum);
        //this.CowsCon.cowType = this.cowsNum;

        let cow = null;
        if(this.cowsNum == 1){
            cow = instantiate(this.CowsCon001);
        }else if(this.cowsNum == 2){
            cow = instantiate(this.CowsCon002);
        }else if(this.cowsNum == 3){
            cow = instantiate(this.CowsCon003);
        }else if(this.cowsNum == 4){
            cow = instantiate(this.CowsCon004);
        }else if(this.cowsNum == 5){
            cow = instantiate(this.CowsCon005);
        }else if(this.cowsNum == 6){
            cow = instantiate(this.CowsCon006);
        }else if(this.cowsNum == 7){
            cow = instantiate(this.CowsCon007);
        }else if(this.cowsNum == 8){
            cow = instantiate(this.CowsCon008);
        }else if(this.cowsNum == 9){
            cow = instantiate(this.CowsCon009);
        }else if(this.cowsNum == 10){
            cow = instantiate(this.CowsCon0010);
        }
         
        
        cow.setPosition(0, 0, 0);
        this.node.addChild(cow);
        //const self = this;
        this.scheduleOnce(this.getCow.bind(this),0.5);

    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
