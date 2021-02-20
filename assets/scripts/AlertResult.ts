import { _decorator, Component, Node, ScrollView, EventHandler, Button, Event, find, Label, loader, SpriteFrame, Sprite, Animation } from 'cc';
const { ccclass, property } = _decorator;
import { Permanent } from './Permanent';
import { httpRequest, getQueryString, pubUrl} from "./Commm"
@ccclass('AlertResult')
export class AlertResult extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type: Permanent})
    public Permanent: Permanent = null;
    onLoad() {
        //滚动条
        const scrollViewEventHandler = new EventHandler();
        scrollViewEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = 'AlertResult';// 这个是代码文件名
        scrollViewEventHandler.handler = 'callback';
        scrollViewEventHandler.customEventData = 'foobar';

        const scrollview = find("Layout/wall/ScrollView", this.node).getComponent(ScrollView);
        scrollview.scrollEvents.push(scrollViewEventHandler);

        //不玩了
        const clickEventHandlerQuit = new EventHandler();
        clickEventHandlerQuit.target = this.node.getChildByName('leftButton'); // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandlerQuit.component = 'AlertResult';// 这个是代码文件名
        clickEventHandlerQuit.handler = 'callbackQuit';
        clickEventHandlerQuit.customEventData = 'customEventData';
        const buttonQuit = find("Layout/down/leftButton", this.node).getComponent(Button);
        buttonQuit.clickEvents.push(clickEventHandlerQuit);
        
        //再玩一次
        const clickEventHandlerAgain = new EventHandler();
        clickEventHandlerAgain.target = this.node.getChildByName('rightButton'); // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandlerAgain.component = 'AlertResult';// 这个是代码文件名
        clickEventHandlerAgain.handler = 'callbackAgain';
        clickEventHandlerAgain.customEventData = 'customEventData';
        const buttonAgain = find("Layout/down/rightButton", this.node).getComponent(Button);
        buttonAgain.clickEvents.push(clickEventHandlerAgain);

        
    }

    
    start () {
        // Your initialization goes here.
    }


    onEnable(){
        find("Godox", this.node).active = false;
        find("AlertBox/Layout/wall/sCow").active = false;
    }


    init(res){
        find("Godox", this.node).active = false;
        const itmesNode = find("Layout/wall/ScrollView/view/content", this.node).children
        for(let i = 0; i < itmesNode.length; i++){
            itmesNode[i].active = false;
        }

        //红包列表
        const redBoxLists = res.data.cowList;
        let doubleBox = [];
        let normalBox = [];
        let newBoxArr = [];
        for(let j = 0; j < redBoxLists.length; j++){
            if(redBoxLists[j].doubled){
                doubleBox.push(redBoxLists[j]);
            }else{
                normalBox.push(redBoxLists[j]);
            }
        }

        newBoxArr = doubleBox.concat(normalBox)

        let str = '';
        for(let i = 0; i < newBoxArr.length; i++){
            itmesNode[i].active = true;
            if(newBoxArr[i].doubled){
                loader.loadRes("images/double-box/spriteFrame", SpriteFrame ,(err: any, spriteFrame: SpriteFrame) => {
                    find("bg", itmesNode[i]).getComponent(Sprite).spriteFrame = spriteFrame;
                });
            }else{
                loader.loadRes("images/normal-box/spriteFrame", SpriteFrame ,(err: any, spriteFrame: SpriteFrame) => {
                    find("bg", itmesNode[i]).getComponent(Sprite).spriteFrame = spriteFrame;
                });
            }
            find("bg/amount", itmesNode[i]).getComponent(Label).string = "￥"+ newBoxArr[i].cowRedAmount/100;
            find("bg/date", itmesNode[i]).getComponent(Label).string = "有效期至:"+ newBoxArr[i].validDate.split(" ", 1)[0];
            
            str += newBoxArr[i].cowId + ","     
        }

        find("Layout/top/title", this.node).getComponent(Label).string = "恭喜您套中"+ str.substring(0, str.lastIndexOf(',')) +"号牛";
        
        //神牛
        if(res.data.superCowAmount > 0){
            setTimeout(()=>{
                find("Godox", this.node).active = true;
                find("Godox/Label001", this.node).getComponent(Label).string = "恭喜您被"+ res.data.superCowAmount/100 +"元入伙红包砸中了";
                find("Godox/Label002", this.node).getComponent(Label).string = (res.data.superCowAmount/100).toString();
                //find("AlertBox/Layout/wall/sCow").active = true;
                find("AlertBox/Layout/wall/sCow/Label001").getComponent(Label).string = "￥"+ res.data.superCowAmount/100;
                find("AlertBox/Layout/wall/sCow/Label002").getComponent(Label).string = "有效期至:" + res.data.superCowValidDate.split(" ", 1)[0];
            },500);
            
        }
    }


    callbackScrollview(scrollview, eventType, customEventData){
        //console.log('scrollview')
        // 这里 scrollview 是一个 Scrollview 组件对象实例
        // 这里的 eventType === ScrollView.EventType enum 里面的值
        // 这里的 customEventData 参数就等于你之前设置的 'foobar'
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
        find("AlertBox").active = false;
        this.Permanent.init();
    }

    

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
