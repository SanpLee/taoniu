import { _decorator, Component,Event, Node, Button, EventHandler, Animation,find,Label  } from 'cc';
import { Rope } from "./Rope";
import { Gesture } from "./Gesture";
import { Permanent } from "./Permanent";
import { CaptureS1 } from './CaptureS1';
import { CountDown } from "./CountDown";

const { ccclass, property } = _decorator;
import { httpRequest, getQueryString,appToken} from "./Commm"

@ccclass('StartBtn')
export class StartBtn extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Rope})
    public Rope: Rope = null;
    @property({type: Gesture})
    public Gesture: Gesture = null;
    @property({type: Permanent})
    public Permanent: Permanent = null;
    @property({type: Node})
    public RunCows: Node = null;


    @property({type: CaptureS1})
    public CaptureS1: CaptureS1 = null;

    @property({type: CountDown})
    public CountDown: CountDown = null;

    public captureArr:any = [];
     
    
    
    

    onLoad(){
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'StartBtn';// 这个是代码文件名
        clickEventHandler.handler = 'callback';
        clickEventHandler.customEventData = 'foobar';

        const button = this.node.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
        //button.interactable = true;

        //this.PullCows.active = false;
         
        
    }

    start () {
        // Your initialization goes here.
        //this.node.active = true;  
    }
    // update (deltaTime: number) {
    //     // Your update function goes here.
         

    // }

    onEnable(){
        this.captureArr = [];
        this.Rope.node.active = true;
        this.Rope._ropeStatus('rope-s1');
         
    }

    onDisable(){
        find("Manager/ButtonPlay").active = true;
        
    }

    callback(event: Event, customEventData: string){
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as Node;
        const button = node.getComponent(Button);
        console.log(customEventData); // foobar

        const that = this;
         //扔出绳子
         that.Rope._ropeStatus('rope-s2');
        find("Manager/ButtonStart").getComponent(Button).interactable = false;
        
        const cowsLists = find("Run/CowRun-row-1");
        //console.log(cowsLists.children)
        for(let i = 0; i < cowsLists.children.length; i++ ){
            
            this.captureArr.push(Number(cowsLists.children[i].children[1].children[0].getComponent(Label).string))
         }
         setTimeout(() => {    
             //取数组后绳子数位
            this.captureArr = this.captureArr.slice(-this.Permanent.ropeCount);

            // if(this.captureArr.length < this.Permanent.ropeCount){
            //     const originArr = [1, 6, 2, 7, 10, 3, 8 ,4 ,9 ,5];
                
            //     console.log("captureArr")  
            // let supplement = [];
                
            //     supplement = originArr.filter((item)=>{
            
            //     return !this.captureArr.includes(item);
            
            //     });
            
            //     const supplementNum = this.Permanent.ropeCount - this.captureArr.length;
            //     for(let i = 0; i < supplementNum; i++){
            //         this.captureArr.push(supplement[i])
            //     }  
            // }


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
            this.CountDown._countDown();
            //console.log(this.captureArr.slice(-ropeNum))   




             that.Rope.node.active = false;
             //隐藏开始按钮
             that.node.active = false;
         }, 500);

        
    }

    
}
