import { _decorator, Component, Node, BoxCollider,ColliderComponent, ITriggerEvent, ICollisionEvent, Label, Animation,find, Vec3} from 'cc';
import { CaptureS1 } from './CaptureS1';
const { ccclass, property } = _decorator;
import { CountDown } from "./CountDown";
import { Permanent } from './Permanent';

@ccclass('ColliderChecker')
export class ColliderChecker extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: CaptureS1})
    public CaptureS1: CaptureS1 = null;

    @property({type: CountDown})
    public CountDownController: CountDown = null;

    @property({type: Permanent})
    public Permanent: Permanent = null;

    public captureArr:any = [];
    

    //private colliderNum:number = 0;
    onLoad(){
        
    }
    start () {
        // Your initialization goes here.
        let Collider = this.getComponent(BoxCollider);
        //console.log(Collider)
        Collider.on('onCollisionEnter', this.onCollisionStart, this);
        Collider.on('onCollisionExit', this.onCollisionEnd, this);
        //console.log(Collider.size)
        //Collider.size = new Vec3(200,10,300);
        //console.log(Collider.size)

        
    }
    onEnable(){
        // let Collider = this.getComponent(ColliderComponent);
        // Collider.on('onTriggerEnter', this.onTrigger, this);
        // Collider.once('onTriggerExit', this.onTriggerEnd, this);
        //this.colliderNum = 0;
        this.captureArr = [];
        //
        //console.log('碰撞器显示')
    }


    private onCollisionStart (event: ICollisionEvent) {
        console.log('开始碰撞')
        console.log(event.type, event);
        //console.log(event.otherCollider.node.children)
        
        for(let i = 0; i < event.otherCollider.node.children.length; i++ ){
           // console.log(event.otherCollider.node.children[i].children[1].children[0].getComponent(Label).string);
            this.captureArr.push(Number(event.otherCollider.node.children[i].children[1].children[0].getComponent(Label).string))
        }

        //正序排列
        // this.captureArr.sort((a, b)=>{
        //     return a - b;    
        // })
        
        //console.log(this.captureArr)

    
    }
 

    private onCollisionEnd (event: ICollisionEvent) {
        console.log('碰撞结束')
        //this.colliderNum +=1;
       //if(this.colliderNum == 1){
        
        console.log(this.captureArr)
         
        //取数组后绳子数位
        this.captureArr = this.captureArr.slice(-this.Permanent.ropeCount);

        if(this.captureArr.length < this.Permanent.ropeCount){
            const originArr = [1, 6, 2, 7, 10, 3, 8 ,4 ,9 ,5];
            
            console.log("captureArr")  
           let supplement = [];
            
            supplement = originArr.filter((item)=>{
           
             return !this.captureArr.includes(item);
           
            });
           
            const supplementNum = this.Permanent.ropeCount - this.captureArr.length;
            for(let i = 0; i < supplementNum; i++){
                this.captureArr.push(supplement[i])
            }
             
        }


        this.captureArr.sort((a, b)=>{
            return a - b;    
        });


        console.log(this.captureArr)
 
 
         //激活拉牛节点
         this.CaptureS1.node.active = true;
         //this.PullCows.getComponent(Animation).play('pull');
         this.CaptureS1.init(this.captureArr);
 
         //开始倒计时10s
         console.log('倒计时开始')
         this.CountDownController._countDown();
         //console.log(this.captureArr.slice(-ropeNum))
       //} 
       
    }

     

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

     
}
