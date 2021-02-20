import { _decorator, Component, Node, Button, EventHandler, Event,find,director } from 'cc';
const { ccclass, property } = _decorator;
import { httpRequest, getQueryString, pubUrl} from "./Commm"
import { Permanent } from './Permanent';
@ccclass('Fail')
export class Fail extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Permanent})
    public Permanent: Permanent = null;
    onLoad(){

        //不玩了
        const clickEventHandlerQuit = new EventHandler();
        clickEventHandlerQuit.target = this.node.getChildByName('LeftButton'); // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandlerQuit.component = 'Fail';// 这个是代码文件名
        clickEventHandlerQuit.handler = 'callbackQuit';
        clickEventHandlerQuit.customEventData = 'customEventData';
        const buttonQuit = this.node.getChildByName('LeftButton').getComponent(Button);
        buttonQuit.clickEvents.push(clickEventHandlerQuit);
        
        //再玩一次
        const clickEventHandlerAgain = new EventHandler();
        clickEventHandlerAgain.target = this.node.getChildByName('RightButton'); // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandlerAgain.component = 'Fail';// 这个是代码文件名
        clickEventHandlerAgain.handler = 'callbackAgain';
        clickEventHandlerAgain.customEventData = 'customEventData';
        const buttonAgain = this.node.getChildByName('RightButton').getComponent(Button);
        buttonAgain.clickEvents.push(clickEventHandlerAgain);
         
    }

    start () {
        // Your initialization goes here.
    }

    callbackQuit(event: Event, customEventData: string){
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        //const node = event.target as Node;
        //const button = node.getComponent(Button);
        console.log('不玩了，谢谢');
        this.Permanent.exitGame();
    }

    callbackAgain(event: Event, customEventData: string){
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        //const node = event.target as Node;
        //const button = node.getComponent(Button);
        console.log('再玩一次');
        find("AlertFail").active = false;
        this.Permanent.init(); 

        //director.loadScene("Manager");
        
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
