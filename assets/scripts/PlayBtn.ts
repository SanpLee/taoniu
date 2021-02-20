import { _decorator, Component,Event, Node, Button, EventHandler,find,Label,AudioSource } from 'cc';
import { Rope } from "./Rope";
const { ccclass, property } = _decorator;
import { Permanent } from './Permanent';
import { Gesture } from "./Gesture";

@ccclass('PlayBtn')
export class PlayBtn extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Rope})
    public RopeController: Rope = null;
    @property({type: Permanent})
    public Permanent: Permanent = null;
    @property({type: Gesture})
    public Gesture: Gesture = null;
    public clicks:number = 0;
    
    

    onLoad(){
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'PlayBtn';// 这个是代码文件名
        clickEventHandler.handler = 'callback';
        clickEventHandler.customEventData = 'playBtn';

        const button = this.node.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
    }

    start () {
        
        // Your initialization goes here.
        //this.node.active = true;
        
    }

    resetClicks(){
        //this.clicks = 0;
    }

    onEnable(){
        //this.clicks = 0;
        find("Manager/ClikNum").active = true;
        find("Manager/ClikNum").getComponent(Label).string = '0';
        //改变手指动画
        this.Gesture._runAn('Gesture-s2');
        find("Run").active = false;
        this.node.getComponent(Button).interactable = true;
    }

    onDisable(){
        this.clicks = 0;
        this.node.getComponent(Button).interactable = false;
        find("Manager/ClikNum").active = false;
    }

    

    callback(event: Event, customEventData: string){
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as Node;
        const button = node.getComponent(Button);
        const music = this.node.getComponent(AudioSource);

        if(this.Permanent.musicStatus){
            music.play();
        }
        
        //console.log(customEventData); // foobar
        this.clicks ++ 

        //console.log(this.clicks)
        find("Manager/ClikNum").getComponent(Label).string = this.clicks.toString();

        //扔出绳子
        //this.RopeController._ropeStatus('rope-s2');

        //隐藏开始按钮
        //this.node.active = false;
    }


    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
